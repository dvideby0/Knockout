//-------------------------------Document Ready -----------------------------------------
$(document).ready(function(){
    prettyPrint();
    CampaignsShow();
    $('#Dashboard-Page, #Dashboard-SideNav, #Supporters-View').show();
    $('#Btn-Background-Color').ColorPicker({
        color: '#0000ff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            $('.colorpicker div input').css({width:'45px', height: '15px', top:'0',paddingRight: '3px', marginTop:'2px', fontSize:'13px', border:'none'});
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('#Btn-Background-Color div').css('backgroundColor', '#' + hex);
            $('#Btn-Background-Color').val('#' + hex);
        }
    });
    $('#Btn-Text-Color').ColorPicker({
        color: '#0000ff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            $('.colorpicker div input').css({width:'45px', height: '15px', top:'0',paddingRight: '3px', marginTop:'2px', fontSize:'13px', border:'none'});
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('#Btn-Text-Color div').css('backgroundColor', '#' + hex);
            $('#Btn-Text-Color').val('#' + hex);
        }
    });
    $('#Btn-Border-Color').ColorPicker({
        color: '#0000ff',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            $('.colorpicker div input').css({width:'45px', height: '15px', top:'0',paddingRight: '3px', marginTop:'2px', fontSize:'13px', border:'none'});
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('#Btn-Border-Color div').css('backgroundColor', '#' + hex);
            $('#Btn-Border-Color').val('#' + hex);
        }
    });
    $('.date').datepicker();
    $('.date').click(function(){
        $(this).datepicker('show');
    });

//------------------------------Navigation Controls--------------------------------------

    $('.nav li').click(function(){
        $(this).parent('ul').children('li').removeClass('active');
        $(this).addClass('active');
    });
    $('.nav-stacked li').click(function(){
        var Name = $(this).children('a').text().replace(' ', '-');
        $('.view').hide()
        $('#' + Name + '-View').show()
    });


//-------------------------------Generate Charts-----------------------------------------



    GetSupportersByDate(callbackDate);

    function callbackDate(data1){
        var chart = new Highcharts.Chart(
            {
                chart: {
                    renderTo: 'chart1',
                    type: 'area',
                    marginBottom: 70
                },
                title: {
                    text: 'Total: '
                },
                xAxis: {
                    categories: data1.categories
                },
                yAxis: {
                    title: {
                        text: 'Count'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                            this.x +': '+ this.y;
                    }
                },
                series: [{
                    name: 'Supporters',
                    data: data1.data
                }]
            });
    }


    function GetSupportersByDate(callbackDate) {
        $.ajax({
            type: "GET",
            url: "http://yearofthecu.com:3738/usersByDate",
            dataType: "json",
            success: function(data) {
                callbackDate(data);
            }
        })
    }

    GetSupportersByAge(callbackAge);

    function callbackAge(data2){

        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chart2',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Age'
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#DDD',
                        connectorColor: '#FFF',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Age',
                data: data2
            }]
        });
    }

    function GetSupportersByAge(callbackAge) {
        $.ajax({
            type: "GET",
            url: "http://yearofthecu.com:3738/usersByAge",
            dataType: "json",
            success: function(data) {
                callbackAge(data);
            }
        })
    }

    GetSupportersByGender(callbackGender);

    function callbackGender(data3){
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chart3',
                type: 'column'
            },
            title: {
                text: 'Gender'
            },
            xAxis: {
                categories: ['Gender']
            },
            yAxis: {
                title: {
                    text: 'Supporters'
                }
            },
            series: [{
                name: 'Male',
                data: [data3.male]
            }, {
                name: 'Female',
                data: [data3.female]
            }]
        });
    }

    function GetSupportersByGender(callbackGender) {
        $.ajax({
            type: "GET",
            url: "http://yearofthecu.com:3738/usersByGender",
            dataType: "json",
            success: function(data) {
                callbackGender(data);
            }
        })
    }

    GetSupportersByArea(callbackArea);

    function callbackArea(data4){
        var chart = new Highcharts.Chart(
            {
                chart: {
                    renderTo: 'chart4',
                    type: 'area',
                    marginBottom: 70
                },
                title: {
                    text: 'Total: '
                },
                xAxis: {
                    categories: data4.states
                },
                yAxis: {
                    title: {
                        text: 'Count'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                            this.x +': '+ this.y;
                    }
                },
                series: [{
                    name: 'Supporters',
                    data: data4.count
                }]
            });
    }


    function GetSupportersByArea(callbackArea) {
        $.ajax({
            type: "GET",
            url: "http://yearofthecu.com:3738/usersByArea",
            dataType: "json",
            success: function(data) {
                callbackArea(data);
            }
        })
    }

    GetSupportersByEducation(callbackEducation);

    function callbackEducation(data5){
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chart5',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Education'
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#DDD',
                        connectorColor: '#FFF',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Education',
                data: [
                    ['High School', data5.high],
                    ['Bachelors Degree',data5.bach],
                    ['Masters Degree', data5.master],
                    ['N/A', data5.none]
                ]
            }]
        });
    }
    function GetSupportersByEducation(callbackEducation) {
        $.ajax({
            type: "GET",
            url: "http://yearofthecu.com:3738/usersByEducation",
            dataType: "json",
            success: function(data) {
                callbackEducation(data);
            }
        })
    }

    GetSupportersByFriendsGender(callbackFriendsGender);

    function callbackFriendsGender(data6){
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chart6',
                type: 'column'
            },
            title: {
                text: 'Avg. Friends'
            },
            xAxis: {
                categories: ['Gender']
            },
            yAxis: {
                title: {
                    text: 'Average'
                }
            },
            series: [{
                name: 'Male',
                data: [data6.male]
            }, {
                name: 'Female',
                data: [data6.female]
            }]
        });

        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chart7',
                type: 'column',
                marginBottom: 70
            },
            title: {
                text: 'Supporters'
            },
            xAxis: {
                categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov']
            },
            yAxis: {
                title: {
                    text: 'Count'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y;
                }
            },
            series: [{
                name: 'Supporters',
                data: [19, 152, 480, 725, 900]
            }]
        });

    }
    function GetSupportersByFriendsGender(callbackFriendsGender) {
        $.ajax({
            type: "GET",
            url: "http://yearofthecu.com:3738/usersFriendsByGender",
            dataType: "json",
            success: function(data) {
                callbackFriendsGender(data);
            }
        })
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart8',
            type: 'bar'
        },
        title: {
            text: 'Communications Sent'
        },
        xAxis: {
            title: {
                text: 'Active Campaigns'
            },
            categories: ['Points', 'iTunes', 'Home Depot']
        },
        yAxis: {
            title: {
                text: '# Sent'
            }
        },
        series: [{
            name: 'Successful',
            data: [640, 530, 190]
        }, {
            name: 'Failed',
            data: [84, 12, 9]
        }]
    });
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart9',
            type: 'bar'
        },
        title: {
            text: 'Points Awarded'
        },
        xAxis: {
            title: {
                text: 'Active Campaigns'
            },
            categories: ['Points', 'iTunes', 'Home Depot']
        },
        yAxis: {
            title: {
                text: 'Awarded'
            }
        },
        series: [{
            name: 'Points',
            data: [10526, 4521, 6857]
        }]
    });
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart10',
            type: 'bar'
        },
        title: {
            text: 'Reach'
        },
        xAxis: {
            categories: ['Facebook', 'G+', 'Twitter', 'MySpace']
        },
        yAxis: {
            title: {
                text: '...'
            }
        },
        series: [{
            name: 'Supporters',
            data: [500, 350, 440, 100]
        }, {
            name: 'Reach',
            data: [6232, 3500, 5123, 420]
        }]
    });

    GetNetworks(callNetwork);
    function callNetwork(data11){
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chart11',
                type: 'column'
            },
            title: {
                text: 'Supporters'
            },
            xAxis: {
                categories: data11.x
            },
            yAxis: {
                title: {
                    text: 'Supporters'
                }
            },
            series: data11.y
        });
    }

    function GetNetworks(callNetwork) {
        $.ajax({
            type: "GET",
            url: "http://yearofthecu.com:3938/supportersByNetwork",
            dataType: "json",
            success: function(data) {
                callNetwork(data);
            }
        })
    }

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart12',
            type: 'column'
        },
        title: {
            text: 'Clicks'
        },
        xAxis: {
            categories: ['Aug', 'Sept', 'Oct']
        },
        yAxis: {
            title: {
                text: 'Clicks'
            }
        },
        series: [{
            name: 'Facebook',
            data: [11520, 21310, 32240]
        }, {
            name: 'G+',
            data: [3250, 4480, 5720]
        }, {
            name: 'Twitter',
            data: [11200, 14342, 15542]
        }, {
            name: 'MySpace',
            data: [1120, 2750, 3830]
        }]
    });

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart13',
            type: 'column'
        },
        title: {
            text: 'Distribution'
        },
        xAxis: {
            categories: ['Aug', 'Sept', 'Oct']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Supporters'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 100,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    'Total: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{
            name: 'Facebook',
            data: [1520, 2310, 3240]
        }, {
            name: 'G+',
            data: [350, 480, 520]
        }, {
            name: 'Twitter',
            data: [1200, 1342, 1542]
        }, {
            name: 'MySpace',
            data: [120, 250, 330]
        }]
    });

    $('#Campaigns-SideNav li a').bind('click', function() {
        if($(this).text() == 'Manage Campaigns'){
            CampaignsShow();
        }
    });
    $('#Campaign-Status-Selectors button').click(function(){
        $(this).parent().children('button').removeClass('active');
        $(this).addClass('active');
        $('#Manage-Campaign-Table-Active, #Manage-Campaign-Table-Inactive, #Manage-Campaign-Table-Completed').hide();
        $('#Manage-Campaign-Table-' + $(this).text()).show();
    });

});

function ChangePage(page){
    $('.page').hide();
    $('#' + page + '-Page, #' + page + '-SideNav').fadeIn();
    $('#' + page + '-SideNav ').children('li :first').click();
}

function SaveCampaign(){
    $.ajax({
        type: 'POST',
        url: 'http://yearofthecu.com:3737/campaign',
        dataType: 'application/json',
        data: {Name: $('#Campaign-Name-Input').val(), URL: $('#Campaign-URL-Input').val(), Message: $('#Campaign-Message-Input').val(), AgeFrom: $('#Campaign-Age-From-Input').val(), AgeTo: $('#Campaign-Age-To-Input').val(), Gender: $('#Campaign-Gender-Input').val(), Location: $('#Campaign-Location-Input').val(), Education: $('#Education-Div input:checkbox:checked').map(function(){return this.value}).get(), Influence: $('#Campaign-Influence-Input').val(), Friends: $('#Campaign-Friend-Count-Input').val(), Start: $('#Campaign-Start-Input input').val(), End: $('#Campaign-End-Input input').val(), Active: $('#Campaign-Active :checkbox:checked').val()},
        timeout: 20000,
        success: function(data){

        },
        complete: function(){
            alert('Campaign Submitted!');
            $('input:not(:checkbox), select, textarea').val('');
            $('input').removeAttr('checked');
        }
    });
}

function CampaignsShow(){
    $.ajax({
        type: 'GET',
        url: 'http://yearofthecu.com:3737/campaigns',
        timeout: 20000,
        success: function(data){
            $('#Manage-Campaigns-View div table tbody').remove();
            for(var i = 0; i <data.length; i++){
                if(data[i].Active == 'Active'){
                    $('#Manage-Campaign-Table-Active').append('<tr><td>' + i + '</td><td>' + data[i].Name + '</td><td>' + data[i].Start + '</td><td>' + data[i].End + '</td><td>' + data[i].Active + '</td></tr>')
                }
                if(data[i].Active == 'Inactive'){
                    $('#Manage-Campaign-Table-Inactive').append('<tr><td>' + i + '</td><td>' + data[i].Name + '</td><td>' + data[i].Start + '</td><td>' + data[i].End + '</td><td>' + data[i].Active + '</td></tr>')
                }
                if(data[i].Active == 'Completed'){
                    $('#Manage-Campaign-Table-Completed').append('<tr><td>' + i + '</td><td>' + data[i].Name + '</td><td>' + data[i].Start + '</td><td>' + data[i].End + '</td><td>' + data[i].Active + '</td></tr>')
                }
            }
        }
    });
}

function UpdatePreviewBtn(){
    var Values = $('#Btn-Designer-Form div input:not(button)').map(function(){return this.value}).get();
    $('#Btn-Preview').css({'text-shadow': 'none', 'background-image': 'none', 'background-color': Values[1], 'color': Values[2], 'border': '1px solid' + Values[3]});
    $('#Btn-Preview').text(Values[0]);
}