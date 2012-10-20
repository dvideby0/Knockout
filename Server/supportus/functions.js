var express = require('express')
var app = express.createServer();
var Mongolian = require("mongolian");
//var uuid = require('node-uuid');
var server = new Mongolian;
var db = server.db("knockoutDB");
var users = db.collection("users");

app.get('/supporters', function (req, res) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Max-Age", "3628800");

    supporters.getAll(function (data) {
        res.send(data);
    });


});

var supporters = {

    getAll: function(getAllCallBack) {

        var formattedData = [];

        users.find().toArray(function(err, data){

            for (var i = 0; i < data.length; i++) {

                var no = new Object();
                data[i]._id = null;

                //no.Id = data[i].id;
                no.Name = data[i].name;
                no.Email = data[i].email.email_address;
                no.DOB = new Date(data[i].dob*1000).format("mm-dd-yyyy");
                if (data[i].name == "JT Hope") {
                    no.Education = 'C';
                } else {
                    no.Education = data[i].education;
                }
                no.LikesAvg = data[i].likes_avg;
                no.CmmtsAvg = data[i].comments_avg;
                no.City = data[i].city;
                no.State = data[i].state;
                //no.CreatedOn = new Date(data[i].created_date*1000).format("mm-dd-yyyy h:MM:ss TT");

                formattedData.push(no);

            }

            getAllCallBack(JSON.stringify(formattedData));

        });

    }

}


/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
    var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var	_ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d:    d,
                dd:   pad(d),
                ddd:  dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m:    m + 1,
                mm:   pad(m + 1),
                mmm:  dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy:   String(y).slice(2),
                yyyy: y,
                h:    H % 12 || 12,
                hh:   pad(H % 12 || 12),
                H:    H,
                HH:   pad(H),
                M:    M,
                MM:   pad(M),
                s:    s,
                ss:   pad(s),
                l:    pad(L, 3),
                L:    pad(L > 99 ? Math.round(L / 10) : L),
                t:    H < 12 ? "a"  : "p",
                tt:   H < 12 ? "am" : "pm",
                T:    H < 12 ? "A"  : "P",
                TT:   H < 12 ? "AM" : "PM",
                Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default":      "ddd mmm dd yyyy HH:MM:ss",
    shortDate:      "m/d/yy",
    mediumDate:     "mmm d, yyyy",
    longDate:       "mmmm d, yyyy",
    fullDate:       "dddd, mmmm d, yyyy",
    shortTime:      "h:MM TT",
    mediumTime:     "h:MM:ss TT",
    longTime:       "h:MM:ss TT Z",
    isoDate:        "yyyy-mm-dd",
    isoTime:        "HH:MM:ss",
    isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};
















var creditUnionsJson = [
    {
        ClientId: "1",
        Name: "ABC Credit Union",
        FBUsers: [
            { Id: 1335106967 },
            { Id: 2244149 },
            { Id: 38508706 }
        ]
    }
];
var usersJson = [
    {
        Name: "JT Hope",
        Email: "jthope@gmail.com",
        Gender: "male",
        DOB: 488174400,
        FBUserId: 2244149,
        ClientId: 1,
        Date: 1350514559,
        AccessToken: "AAAFHDrQkwDUBAG3n7XnCi8XFywW8B9MAEDpmN6ZCUfU3nOZATeF3P31K6VtoJ8p7jdBJDXh0jvZBH88HnHLe2iYwkmwbGAZD"
    },
    {
        Name: "Nate Ogg",
        Email: "naogg@gmail.com",
        Gender: "male",
        DOB: 508174400,
        FBUserId: 38508706,
        ClientId: 1,
        Date: 1350514559,
        AccessToken: "AAAFHDrQkwDUBAG3n7XnCi8XFywW8B9MAEDpmN6ZCUfU3nOZATeF3P31K6VtoJ8p7jdBJDXh0jvZBH88HnHLe2iYwkmwbGAZD"
    },
    {
        AccessToken: "AAAFHDrQkwDUBAJZBH7nUdzza2KJIXk5JzGlcB744in8fxegJJOrsOS5Q8uaopEnQZAAG26Kq18A3CqkqCXU5RyotBMpLp9ZA69txIQihgZDZD",
        ClientId: 1,
        CommentsAvg: [
            0.08
        ],
        DOB: 433396800,
        Date: 1350529246,
        Email: "rbrookfield@yahoo.com",
        Gender: "male",
        FBUserId: 1335106967,
        LikesAvg: [
            0.23
        ],
        Location: [
            {
                Lat: 27.906142924118,
                Lon: -82.785370074997,
                Name: "Largo, Florida"
            }
        ],
        Name: "Rich Brookfield"
    }
];
var campaignsJson = [
    {
        Id: 1,
        Name: "Campaign 1",
        Message: "Test Campaign 1",
        FBUsers: [
            {
                Id: "1335106967"
            },
            {
                Id: "2244149"
            }
        ],
        Active: null
    },
    {
        Id: 2,
        Name: "Campaign 2",
        Message: "Test Campaign 2",
        FBUsers: [
            {
                Id: "1335106967"
            },
            {
                Id: "2244149"
            }
        ],
        Active: null
    },
    {
        Id: 3,
        Name: "Campaign 3",
        Message: "Test Campaign 3",
        FBUsers: [
            {
                Id: "1335106967"
            },
            {
                Id: "2244149"
            }
        ],
        Active: null
    }
];

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

app.listen(3838);