var express = require('express');
var fb = require('facebook-js');
var async = require('async');
var dnode = require('dnode');
var Mongolian = require("mongolian");
var uuid = require('node-uuid');
var server = new Mongolian;
var db = server.db("knockoutDB");
var users = db.collection("users");


var rpc = dnode({
    GetFriends : function (aToken, user, cb) {
        fb.apiCall('GET', '/me/friends',
            {fields: 'id,birthday,gender,education,location', limit: 1000, access_token: aToken},
            function(error, response, body){
                for(var i = 0; i < body.data.length; i++){
                    birthdayCopy(callbackBirth,body.data[i], aToken);
                    function callbackBirth(data2){
                        body.data[i]=data2;

                    }
                }
                users.update({id: user}, {"$addToSet": {friends: body.data}});
                cb('Success');
            }
        )
    }
});

function birthdayCopy(callbackBirth,data, aToken){

    if(data.birthday){
        var bdayArr = data.birthday.split('/');
        if(bdayArr[2]){
            var d = new Date(bdayArr[2], (bdayArr[0] -1), bdayArr[1]);
            data.birthday = d.getTime()/1000.0;
        }
        else{
            data.birthday = null;
        }
    }

    if(data.location){
        fb.apiCall('GET', '/' + data.location.id,
            {fields: 'location, name', access_token: aToken},
            function(error, response, data1){
                try{
                    var locArray = data1.name.split(', ');
                    data.location = {Lat: data1.location.latitude, Lon: data1.location.longitude, City: locArray[0], State: locArray[1]};
                }catch(ex){

                }
            }
        )
    }
    callbackBirth(data);
}
rpc.listen(8781);