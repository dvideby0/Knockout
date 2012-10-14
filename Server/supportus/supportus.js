var express = require('express')
    , fb = require('facebook-js')
    , app = express.createServer(
        express.bodyParser()
        , express.cookieParser()
        , express.session({ secret: 'some secret' })
    );
var aToken;
app.use(express.bodyParser());
app.get('/', function (req, res) {
    res.redirect(fb.getAuthorizeUrl({
        client_id: '359603454132277',
        redirect_uri: 'http://yearofthecu.com:3737/auth?ClientID=' + req.query.ClientID,
        scope: 'offline_access,publish_stream'
    }));
});

app.get('/auth', function (req, res) {
    fb.getAccessToken('359603454132277', '43999899ea27f624240f77739579b34c', req.param('code'), 'http://yearofthecu.com:3737/auth?ClientID=' + req.query.ClientID, function (error, access_token, refresh_token) {
        res.send('<script type="text/javascript">window.location = "http://facebook.com/home.php"</script>');
        console.log(access_token + '\n' + req.query.ClientID);
        aToken = access_token;
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