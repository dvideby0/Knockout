var express = require('express')
    , fb = require('facebook-js')
    , app = express.createServer(
        express.bodyParser()
        , express.cookieParser()
        , express.session({ secret: 'some secret' })
    );
var aToken;
var Mongolian = require("mongolian");
var uuid = require('node-uuid');
var server = new Mongolian;
var db = server.db("supportus");
var users = db.collection("users");
app.use(express.bodyParser());
app.get('/', function (req, res) {
    res.redirect(fb.getAuthorizeUrl({
        client_id: '359603454132277',
        redirect_uri: 'http://yearofthecu.com:3737/auth?ClientID=' + req.query.ClientID,
        scope: 'offline_access,publish_stream,email,user_likes',
        state: req.query.ReturnURL
    }));
});

app.get('/auth', function (req, res) {
    fb.getAccessToken('359603454132277', '43999899ea27f624240f77739579b34c', req.param('code'), 'http://yearofthecu.com:3737/auth?ClientID=' + req.query.ClientID, function (error, access_token, refresh_token) {
        res.send('<script type="text/javascript">window.location = "' + req.query.state + '"</script>');
        aToken = access_token;
        fb.apiCall('GET', '/me',
            {fields: 'id,email,gender,name', access_token: aToken},
            function (error, response, body) {
                console.log(body);
                users.findOne({ID: body.id}, function(err, post){
                    if(!post){
                        users.insert({
                            Name: body.name,
                            Email: body.email,
                            Gender: body.gender,
                            ID: body.id,
                            ClientID: req.query.ClientID,
                            AccessToken: access_token
                        });
                    }
                });
            }
        );
        console.log(access_token + '\n' + req.query.ClientID + '\n' + req.query.state);

    });
});

app.post('/message', function (req, res) {
    fb.apiCall('POST', '/me/feed',
        {access_token: aToken, message: req.param('message')},
        function (error, response, body) {
            res.send({body: body});
        }
    );
});

app.get('/messages', function (req, res) {
    var stream = fb.apiCall('GET', '/me/feed', {access_token: req.param('access_token'), message: req.param('message')});
    stream.pipe(fs.createWriteStream('backup_feed.txt'));
});

app.listen(3737);