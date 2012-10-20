var express = require('express');
var fb = require('facebook-js');
var dnode = require('dnode');
var Mongolian = require("mongolian");
var server = new Mongolian;
var db = server.db("knockoutDB");
var users = db.collection("users");


var rpc = dnode({
    GetFriends : function (aToken, user, cb) {
        fb.apiCall('GET', '/me/friends',
            {fields: 'id,birthday,gender,education,location', limit: 1000, access_token: aToken},
            function(error, response, body){
                for(var i = 0; i < body.data.length; i++){
                    if(body.data[i].birthday){
                        var bdayArr = body.data[i].birthday.split('/');
                        if(bdayArr[2]){
                            var d = new Date(bdayArr[2], (bdayArr[0] -1), bdayArr[1]);
                            body.data[i].birthday = d.getTime()/1000.0;
                        }
                        else{
                            body.data[i].birthday = null;
                        }
                    }
                    users.update({ID: user}, {"$addToSet": {friends: body.data}});
                    cb('Success');
                }
            }
        )
    }
});
rpc.listen(8781);