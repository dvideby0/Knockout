var express = require('express')
    , fb = require('facebook-js')
    , app = express.createServer(
        express.bodyParser()
        , express.cookieParser()
        , express.session({ secret: 'some secret' })
    );
var Mongolian = require("mongolian");
var uuid = require('node-uuid');
var server = new Mongolian;
var db = server.db("supportus");
var users = db.collection("users");
var usersfriends = db.collection("usersfriends");
app.use(express.bodyParser());
app.get('/', function (req, res) {
    res.redirect(fb.getAuthorizeUrl({
        client_id: '359603454132277',
        redirect_uri: 'http://yearofthecu.com:3737/auth?ClientID=' + req.query.ClientID,
        scope: 'user_about_me,user_actions.music,user_actions.news,user_actions.video,user_activities,user_education_history,user_events,user_games_activity,user_groups,user_hometown,user_interests,user_notes,user_photos,user_questions,user_relationship_details,user_relationships,user_religion_politics,user_status,user_subscriptions,user_videos,user_website,user_work_history,friends_actions.music,friends_actions.news,friends_actions.video,friends_activities,friends_birthday,friends_education_history,friends_events,friends_games_activity,friends_groups,friends_hometown,friends_interests,friends_likes,friends_location,friends_notes,friends_photos,friends_questions,friends_relationship_details,friends_relationships,friends_religion_politics,friends_status,friends_subscriptions,friends_videos,friends_website,friends_work_history,ads_management,create_event,export_stream,friends_online_presence,manage_friendlists,manage_notifications,manage_pages,offline_access,publish_checkins,read_friendlists,read_insights,read_mailbox,read_page_mailboxes,read_requests,read_stream,rsvp_event,sms,user_online_presence,xmpp_login',
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
            {fields: 'id,email,gender,name,birthday,location', access_token: aToken},
            function (error, response, body) {
                users.findOne({ID: body.id}, function(err, post){
                    if(!post){
                        if(body.birthday){
                            var bdayArr = body.birthday.split('/');
                            var d = new Date(bdayArr[2], bdayArr[0], bdayArr[1]);
                        }
                        else{
                            var d = new Date(0000,00,00);
                        }
                        Location = body.location;
                        ID = body.id;
                        var today = new Date();
                        users.insert({
                            Name: body.name,
                            Email: body.email,
                            Gender: body.gender,
                            DOB: d.getTime()/1000.0,
                            ID: body.id,
                            ClientID: req.query.ClientID,
                            Date: parseInt(today.getTime()/1000.0),
                            AccessToken: access_token
                        });
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
                                    if((i+1) == body.posts.data.length){
                                        likes = likes/100;
                                        comments = comments/100;
                                        users.update({ID: body.id}, {"$addToSet": {LikesAvg:likes, CommentsAvg: comments}});
                                    }
                                }
                            });
                        fb.apiCall('GET', '/' + Location.id,
                            {fields: 'location', access_token: aToken},
                            function(error, response, body){
                                users.update({ID: ID}, {"$addToSet": {Location: {Lat: body.location.latitude, Lon: body.location.longitude, Name: Location.name}}});
                            });
                    }
                });
            }
        );
    });
});
app.listen(3737);