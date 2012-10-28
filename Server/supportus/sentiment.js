var twitter = require('ntwitter');
var request = require('request');
var twit = new twitter({
    consumer_key: 'l7nW7Ohp3CCuFTx9cCdcA',
    consumer_secret: 'D0XjXcg43GHU5quIMGMXDPU8nCUZhWF3SSfwAodSE',
    access_token_key: '170033769-R9W08nd5froP9mtZu09GTOJ2gaU9ZJX1gI3eq7lv',
    access_token_secret: 'gXU4EzjJ6DjFTiW161FQauN7jMSJ4qyiKyCcG2J88'
});

twit.stream('statuses/filter',{'track': 'google'}, function(stream) {
    stream.on('data', function (data) {
        GetSentiment(data.text);
    });
});

function GetSentiment(phrase){
    request({method: 'GET', url: 'http://beta.conveyapi.com/analysis-engine/process?api_key=edd5a7ff12ef0e2ae782e969fb79d3eb&annotation.polarity=true&annotation.emotion=true&annotation.intensity=true&annotation.spam=true&text=' + encodeURI(phrase)}, function(error, response, body){
        //console.log('TEXT: '  + phrase + '\n' + JSON.parse(body).documents[0].annotations.polarity + '\n' + JSON.parse(body).documents[0].annotations.emotion + '\n' + JSON.parse(body).documents[0].annotations.intensity + '\n' + JSON.parse(body).documents[0].annotations.spam);
        console.log(JSON.parse(body).documents[0].annotations);
    });
}



