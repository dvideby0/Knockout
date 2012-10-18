window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
        appId      : '359603454132277', // App ID from the App Dashboard
        channelUrl : '//yearofthecu.com/points/channel.php', // Channel File for x-domain communication
        status     : true, // check the login status upon init?
        cookie     : true, // set sessions cookies to allow your server to access the session?
        xfbml      : true  // parse XFBML tags on this page?
    });
};
// Load the SDK's source Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));
function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            $('#Response').html(response.authResponse.userID);
        }else{
            alert('Login Failed!');
        }
    },{scope: 'email'});
}