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
                console.log(body);
                var Index = [];
                var LocationData = [];
                for(var i = 0; i < body.data.length; i++){
                    var record = body.data[i];
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
                    if(record.location){
                        if(record.location.id){
                            Index.push(i);
                        }
                    }
                }
                for(var y = 0; y<Index.length; y++){
                    GetLocation(aToken, body.data[Index[y]].location.id, function(data){
                        LocationData.push(data);
                        if(LocationData.length == Index.length){
                            for(var x = 0; x < Index.length; x++){
                                body.data[Index[x]].location = LocationData[x];
                            }
                            console.log('Success');
                            users.update({id: user}, {"$addToSet": {friends: body.data}});
                            cb('Success');
                        }
                    })
                }
            }
        )
    }
});
function GetLocation(aToken, locationId, callback){
    fb.apiCall('GET', '/' + locationId,
        {fields: 'name,location', access_token: aToken},
        function(error, response, body){
            if(body.location){
                callback({lat: body.location.latitude, lon: body.location.longitude, name: body.name});
            }
            else{
                callback({lat: null, lon: null, name: null});
            }
        }
    )
}
rpc.listen(8781);