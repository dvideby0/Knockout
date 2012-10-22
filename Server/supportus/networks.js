var express = require('express')
var app = express.createServer();

var Mongolian = require("mongolian");
//var uuid = require('node-uuid');
var server = new Mongolian;
var db = server.db("knockoutDB");
var networks = db.collection("networks");
var users = db.collection("users");

app.get('/supportersByNetwork', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Max-Age", "3628800");
    getSupportersByNetwork(CallbackSupportersByNetwork);
    function CallbackSupportersByNetwork(data2){
        res.send(JSON.stringify(data2));
    }
});


function getSupportersByNetwork(CallbackSupportersByNetwork){

    var dataN = [];
    var dataNN = [];
    var data3 =[];
    var net =[];
    var finalNet = new Object();
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        networks.find().toArray(function(err, data){
        for(var i=0 ; i < data.length ; i++){
            dataN.push(data[i].network_id);
            dataNN.push(data[i].name);
        }


    users.find().toArray(function(err, data){

        for(var i=0 ; i < data.length ; i++){
            var final = new Object();
            final.name = data[i].network_id;
            final.date = new Date(data[i].created_date*1000);
            data3.push(final);
        }
        data3.sort(date_sort_asc);

        for(var j= 0; j < dataN.length;j++){
           for(var z =0 ; z < data3.length ;z++){
               if(dataN[j] == data3[z].name){
                 data3[z].name = dataNN[j];
               }
           }
        }

        for(var k = 0 ; k<data3.length ; k++){
            console.log(data3[k].name + " -- "+ data3[k].date);
        }

        for(var j= 0; j < dataN.length;j++){

            var min = data3[0].date;
            var max = new Date(min.getTime( ));
            max.setDate(max.getDate()+5);

            var date_loop = true;
            var k = 0;
            var dates_length = data3.length;
            var cat = [];
            var val = [];

            console.log(min);
            console.log(dates_length);
            console.log(max);

            while(date_loop){
                var count = 0;
                while(data3[k].date < max){
                    if(dataNN[j] == data3[k].name){
                    count++;
                    }
                    if(k > dates_length-2){
                        break;
                    }else{
                        k++;
                    }
                    console.log(data3[k].date + k);
                }
                if(parseInt(max.getDate(),10) -5 < 1){
                    cat.push(months[(parseInt(max.getMonth(),10) -1)]+ (parseInt(max.getDate(),10) -5));
                }
                else{
                    cat.push(months[parseInt(max.getMonth(),10)]+ (parseInt(max.getDate(),10) -5));
                }
                cat.push(months[parseInt(max.getMonth(),10)]+parseInt(max.getDate(),10));
                val.push(count);
                if(data3[dates_length-1].date < max){
                    var networks = new Object();
                    console.log(dataNN[j]);
                    console.log(val);
                    networks.name = dataNN[j];
                    networks.data = val;
                    net.push(networks);
                    break;
                }else{
                    max.setDate(max.getDate()+5);
                }

            }

        }
        finalNet.y = net;
        finalNet.x =cat;
        console.log(finalNet);
        CallbackSupportersByNetwork(finalNet);
            });
        });
}

var date_sort_asc = function (date1, date2) {
    if (date1.date > date2.date) return 1;
    if (date1.date < date2.date) return -1;
    return 0;
};

app.listen(3938);