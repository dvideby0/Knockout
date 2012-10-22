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
           // $('#Response').html(response.authResponse.userID);
            GetPoints();
        }else{
            alert('Login Failed!');
        }
    },{scope: 'email'});
}


    function GetPoints(){

        $('#points_totals').empty();
        var aRow = "<div class='row'>";
        aRow += "<div class='span1 company-image'><img alt='Your credit union' src='lib/img/green-savings.jpg' /></div>";
        aRow += "<div class='span2 company-name'>Awesome CU</div>";
        aRow += "<div class='span2 points-current'>Current: 121,218</div>";
        aRow += "<div class='span2 points-pending'>Pending: 1214</div>";
        aRow += "<div class='span2 view-rewards'><a href='http://yearofthecu.com/rewards.html'>View Rewards!</a></div>";
        aRow += "</div><br/>"
        $('#points_totals').append(aRow);

        aRow = "<div class='row'>";
        aRow += "<div class='span1 company-image'><img alt='Your credit union' src='lib/img/childrens-mircle-network1.jpg' /></div>";
        aRow += "<div class='span2 company-name'>Children's Miracle Network</div>";
        aRow += "<div class='span2 points-current'>Current: 12218</div>";
        aRow += "<div class='span2 points-pending'>Pending: 3214</div>";
        aRow += "<div class='span2 view-rewards'><a href='http://yearofthecu.com/ranking.html'>View Rank!</a></div>";
        aRow += "</div>"
        $('#points_totals').append(aRow);

}
