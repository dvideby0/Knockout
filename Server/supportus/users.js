var express = require('express')
var app = express.createServer();

var Mongolian = require("mongolian");
//var uuid = require('node-uuid');
var server = new Mongolian;
var db = server.db("knockoutDB");
var users = db.collection("users");


app.get('/usersByAge', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Max-Age", "3628800");
    getUsersByAge(CallbackAge);
    function CallbackAge(data2){
        res.send(JSON.stringify(data2));
    }
});

app.get('/usersByDate', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Max-Age", "3628800");
    getUsersCreateDate(Callback);
    function Callback(data2){
        res.send(JSON.stringify(data2));
    }
});

app.get('/usersByEducation', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Max-Age", "3628800");
    getUsersByEducation(CallbackEducation);
    function CallbackEducation(data2){
        res.send(JSON.stringify(data2));
    }
});


app.get('/usersByGender', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Max-Age", "3628800");
    getUsersByGender(CallbackGender);
    function CallbackGender(data2){
        res.send(JSON.stringify(data2));
    }
});


app.get('/usersFriendsByGender', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Max-Age", "3628800");
    getUsersFriendsByGender(CallbackFriendsByGender);
    function CallbackFriendsByGender(data2){
        res.send(JSON.stringify(data2));
    }
});


app.get('/usersByArea', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Max-Age", "3628800");
    getUsersByArea(CallbackUsersByArea);
    function CallbackUsersByArea(data2){
        res.send(JSON.stringify(data2));
    }
});


function getUsersByArea(CallbackUsersByArea){

    var data1 = [];
    users.find().toArray(function(err, data){
        for(var i=0 ; i < data.length ; i++){
            var area = new Object();
            area.name =data[i].state;
            area.count = 1;
            var flag = true;
             for(var t = 0 ; t < data1.length ; t++){
                 //console.log(data1[t].nam + "db" + area.name);
                 if(data1[t].name == area.name){
                     data1[t].count = data1[t].count+area.count;
                     flag = false;
                 }
             }
            if(flag){
                data1.push(area);
            }
        }

        var states = [];
        var count = [];
        var areas = new Object();
        for(var t = 0 ; t < data1.length ; t++){
            states.push(data1[t].name);
            count.push(data1[t].count);
        }
        areas.states = states;
        areas.count = count;


        CallbackUsersByArea(areas);
    });
}

function getUsersFriendsByGender(CallbackFriendsByGender){

    var data1 = [];
    users.find().toArray(function(err, data){
        for(var i=0 ; i < data.length ; i++){
            if(data[i].friends){
            var data2 = data[i].friends[0];
            for(var d = 0; d < data2.length ; d ++){
                //console.log(data2[d].gender);
                if(data2[d].gender){
                data1.push(data2[d].gender);
                }
             }
            }
        }
        var mCounter = 0 ;
        var fCounter = 0 ;
        for(var z =0 ; z< data1.length; z++ ){
            if(data1[z]=="male"){
                mCounter++;
            }
            if(data1[z]=="female"){
                fCounter++;
            }
        }

        var genderCount = new Object();
        genderCount.male = mCounter;
        genderCount.female = fCounter;

        CallbackFriendsByGender(genderCount);
    });
}





function getUsersByEducation(CallbackEducation){

    var data1 = [];
    users.find().toArray(function(err, data){
        for(var i=0 ; i < data.length ; i++){
            data1.push(data[i].education);
        }
        var hCounter = 0 ;
        var bCounter = 0 ;
        var mCounter = 0 ;
        var nCounter = 0 ;

        for(var z =0 ; z< data1.length; z++ ){
            if(data1[z]=="H"){
                hCounter++;
            }
            if(data1[z]=="N"){
                nCounter++;
            }
            if(data1[z]=="G"){
                mCounter++;
            }
            if(data1[z]=="C"){
                bCounter++;
            }
        }

        var educationCount = new Object();
        educationCount.high = hCounter;
        educationCount.bach = bCounter;
        educationCount.master = mCounter;
        educationCount.none = nCounter;

        CallbackEducation(educationCount);
    });
}


function getUsersByGender(CallbackGender){

    var data1 = [];
    users.find().toArray(function(err, data){
        for(var i=0 ; i < data.length ; i++){
            //console.log(data.length);
            data1.push(data[i].gender);
        }
        var mCounter = 0 ;
        var fCounter = 0 ;
        for(var z =0 ; z< data1.length; z++ ){
            //console.log(data1[z]);
            if(data1[z]=="male"){
                mCounter++;
            }
            if(data1[z]=="female"){
                fCounter++;
            }
        }

        var genderCount = new Object();
        genderCount.male = mCounter;
        genderCount.female = fCounter;

        CallbackGender(genderCount);
    });
}



function getUsersByAge(CallbackAge){

    var data1 = [];
    var dates = [];
    users.find().toArray(function(err, data){
        for(var i=0 ; i < data.length ; i++){
            var userByDate = new Object();
            userByDate.id = data[i].id;
            userByDate.createDate = data[i].dob;
            //console.log(userByDate.id + "dob" +new Date(userByDate.createDate*1000).getFullYear());
            //console.log(userByDate.id + "dob" +new Date().getFullYear());
            //console.log("dob1" +(new Date().getFullYear()-new Date(userByDate.createDate*1000).getFullYear()));
            dates.push((new Date().getFullYear()-new Date(userByDate.createDate*1000).getFullYear()));
            data1.push(userByDate);
        }
        dates.sort(date_sort_asc);

        var min = dates[0];
        var max = min+5;

        var date_loop = true;
        var k = 0;
        var dates_length = dates.length;
        var cat = [];
        var val = [];

        //console.log(min);
        //console.log(dates_length);
        //console.log(max);

        while(date_loop){
            var count = 0;
            while(dates[k] < max){
                //console.log(dates[k]);
                //console.log(max);
                count++;
                if(k > dates_length-1){
                    break;
                }else{
                    k++;
                }
            }
            cat.push('Ages '+min+' - '+max);
            //console.log(count);
            var per = Math.round((count/dates_length)*100);
            val.push(per);
            min = max;
            if(dates[dates_length-1] < max){
                break;
            }else{
                max = max+5;
            }
        }

        var ages = [];
        for(var a =0; a<cat.length ; a++){
            var age = [cat[a],val[a]];
            ages.push(age);
        }


        for (var m = 0 ; m < ages.length ; m++){
            //console.log(ages[m]);
        }

        CallbackAge(ages);
    });
}




function getUsersCreateDate(Callback){
    var data1 = [];
    var dates = [];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    users.find().toArray(function(err, data){
        for(var i=0 ; i < data.length ; i++){
            var userByDate = new Object();
            userByDate.id = data[i].id;
            userByDate.createDate = data[i].created_date;
            dates.push(new Date(userByDate.createDate*1000));
            data1.push(userByDate);
        }
        dates.sort(date_sort_asc);

        var min = dates[0];
        var max = new Date(min.getTime( ));
        max.setDate(max.getDate()+5);

        var date_loop = true;
        var k =0;
        var dates_length = dates.length;
        var cat = [];
        var val = [];

        while(date_loop){
            var count = 0;
            while(dates[k] < max){
                count++;
                if(k > dates_length-1){
                    break;
                }else{
                    k++;
                }
            }
            if(parseInt(max.getDate(),10) -5 < 1){
                cat.push(months[(parseInt(max.getMonth(),10) -1)]+ (parseInt(max.getDate(),10) -5));
            }
            else{
                cat.push(months[parseInt(max.getMonth(),10)]+ (parseInt(max.getDate(),10) -5));
            }
            val.push(count);
            if(dates[dates_length-1] < max){
                break;
            }else{
                max.setDate(max.getDate()+5);
            }
        }
        var chart1 = new Object();
        chart1.categories = cat;
        chart1.data = val;

        for (var m = 0 ; m < cat.length ; m++){
            //console.log(cat[m] + " count " + val[m]);
        }
        console.log(chart1);
        Callback(chart1);
    });
}

var date_sort_asc = function (date1, date2) {
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
};
app.listen(3738);