var express = require('express')
    , fb = require('facebook-js')
    , async = require('async')
    , app = express.createServer(
        express.bodyParser()
        , express.cookieParser()
        , express.session({ secret: 'some secret' })
    );
var dnode = require('dnode');
var Mongolian = require("mongolian");
var server = new Mongolian;
var db = server.db("knockoutDB");
var users = db.collection("users");
var campaigns = db.collection("campaigns");
app.use(express.bodyParser());
app.get('/', function (req, res) {
    res.redirect(fb.getAuthorizeUrl({
        client_id: '359603454132277',
        redirect_uri: 'http://yearofthecu.com:3737/auth?ClientID=' + req.query.ClientID,
        scope: 'user_about_me,email,user_location,publish_stream,user_birthday,user_actions.music,user_actions.news,user_actions.video,user_activities,user_education_history,user_events,user_games_activity,user_groups,user_hometown,user_interests,user_notes,user_photos,user_questions,user_relationship_details,user_relationships,user_religion_politics,user_status,user_subscriptions,user_videos,user_website,user_work_history,friends_actions.music,friends_actions.news,friends_actions.video,friends_activities,friends_birthday,friends_education_history,friends_events,friends_games_activity,friends_groups,friends_hometown,friends_interests,friends_likes,friends_location,friends_notes,friends_photos,friends_questions,friends_relationship_details,friends_relationships,friends_religion_politics,friends_status,friends_subscriptions,friends_videos,friends_website,friends_work_history,ads_management,create_event,export_stream,friends_online_presence,manage_friendlists,manage_notifications,manage_pages,offline_access,publish_checkins,read_friendlists,read_insights,read_mailbox,read_page_mailboxes,read_requests,read_stream,rsvp_event,sms,user_online_presence,xmpp_login',
        state: req.query.ReturnURL
    }));
});

app.get('/auth', function (req, res) {
    fb.getAccessToken('359603454132277', '43999899ea27f624240f77739579b34c', req.param('code'), 'http://yearofthecu.com:3737/auth?ClientID=' + req.query.ClientID, function (error, access_token, refresh_token) {
        res.setHeader('content-type', 'text/html');
        res.send('<html><head><script type="text/javascript">window.location = "' + decodeURI(req.query.state) + '"; </script></head></html>');
        var aToken = access_token;
        var Location;
        var ID;
        fb.apiCall('GET', '/me',
            {fields: 'id,email,gender,name,birthday,location,education', access_token: aToken},
            function (error, response, body) {
                users.findOne({id: body.id}, function(err, post){
                    if(!post){
                        var today = new Date();
                        async.parallel({
                            BDay: function(callback){
                                if(body.birthday){
                                    var bdayArr = body.birthday.split('/');
                                    var d = new Date(bdayArr[2], (bdayArr[0] -1), bdayArr[1]);
                                    callback(null,d.getTime()/1000.0);

                                }
                                else{
                                    callback(null,null);
                                }
                            },
                            Influence: function(callback){
                                fb.apiCall('GET', '/me',
                                    {fields: 'posts.limit(100)', access_token: aToken},
                                    function(error, response, body){
                                        var likes = 0;
                                        var comments = 0;
                                        for(var i = 0; i < body.posts.data.length; i++){
                                            if(body.posts.data[i].likes){
                                                likes = likes + body.posts.data[i].likes.count;
                                            }
                                            comments = comments + body.posts.data[i].comments.count;
                                        }
                                        callback(null,{Likes: likes/100, Comments: comments/100});
                                    }
                                )
                            },
                            Location: function(callback){
                                fb.apiCall('GET', '/' + body.location.id,
                                    {fields: 'location, name', access_token: aToken},
                                    function(error, response, body){
                                        var locArray = body.name.split(', ');
                                        callback(null,{Lat: body.location.latitude, Lon: body.location.longitude, City: locArray[0], State: locArray[1]});
                                    }
                                )
                            }

                        }, function(err, results){
                            if(!body.education){
                                body.education = 'N'
                            }
                            else{
                                if(body.education[(body.education.length - 1)].type == 'High School'){
                                    body.education = 'H';
                                }
                                if(body.education[(body.education.length - 1)].type == 'College'){
                                    body.education = 'C';
                                }
                                if(body.education[(body.education.length - 1)].type == 'Graduate School'){
                                    body.education = 'G';
                                }
                            }
                            users.insert({
                                network_id: 11111,
                                name: body.name,
                                email: {email_address: body.email, verified: false},
                                gender: body.gender,
                                dob: results.BDay,
                                id: body.id,
                                lat: results.Location.Lat,
                                lon: results.Location.Lon,
                                city: results.Location.City,
                                state: results.Location.State,
                                education: body.education,
                                likes_avg: results.Influence.Likes,
                                comments_avg: results.Influence.Comments,
                                client: [{id:req.query.ClientID}],
                                created_date: parseInt(today.getTime()/1000.0),
                                access_token: access_token
                            });
                            GetFriendInfo(aToken, body.id);
                        });

                    }
                });
            }
        );
    });
});

app.post('/campaign', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Max-Age", "3628800");
    req.body.client = '12345678910';
    if(!req.body.Active){
        req.body.Active = 'Inactive';
    }
    if(!req.body.Education){
        req.body.Education = 'N';
    }
    var Gender = [];
    var Education = [];
    campaigns.insert(req.body);
    res.send("Campaign Saved!");
    var d = new Date();
    var today = parseInt(d.getTime()) / 1000;
    var AgeFrom = parseInt(today) - (parseInt(req.body.AgeFrom) * 31550600);
    var AgeTo = parseInt(today) - (parseInt(req.body.AgeTo, 10) * 31550600);
    if(req.body.Gender == 'Both'){
        Gender.push({gender: "male"}, {gender: "female"});
    }
    if(req.body.Gender == 'Male'){
        Gender.push({gender: "male"});
    }
    if(req.body.Gender == 'Female'){
        Gender.push({gender: "female"});
    }
    if(req.body.Education !== 'N'){
        req.body.Education.forEach(function(type){
            Education.push({education: type});
        });
    }
    if(req.body.Active == 'Active'){
        //console.log({client: {id:'12345678910'}, dob:{$lte: AgeFrom, $gt: AgeTo}, $and: [{$or: Gender}, {$or: Education}]}, {id:1, access_token:1});
        users.find({client: {id:'12345678910'}, dob:{$lte: AgeFrom, $gt: AgeTo}, $and: [{$or: Gender}, {$or: Education}]}, {id:1, access_token:1}).toArray(function(err, array){
            for(var i = 0; i < array.length; i ++){
                fb.apiCall('POST', '/me/feed',
                    {access_token: array[i].access_token, message: req.body.Message + '\n\n' + req.body.URL},
                    function (error, response, body) {
                    }
                );
            }
        })
    }
});

app.get('/campaigns', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Max-Age", "3628800");
    campaigns.find({},{_id:0}).toArray(function(err, array){res.send(array);});
});


function GetFriendInfo(aToken, id){
    var d = dnode.connect(8781);
    d.on('remote', function (remote) {
        remote.GetFriends(aToken, id, function (s) {
            d.end();
        });
    });
}
app.listen(3737);