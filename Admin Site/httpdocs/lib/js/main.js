//-------------------------------Document Ready -----------------------------------------
$(document).ready(function(){
    prettyPrint();
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
                            this.x +': '+ this.y +'°C';
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

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart4',
            type: 'area'
        },
        title: {
            text: 'Location'
        },
        xAxis: {
            categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Supporters'
            }
        },
        tooltip: {
            formatter: function() {
                return this.series.name +' has<b>'+
                    Highcharts.numberFormat(this.y, 0) +'</b><br/>supporters in '+ this.x;
            }
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: 'St. Petersburg',
            data: [5, 15, 24, 152, 380]
        }, {
            name: 'Tampa',
            data: [6, 12, 72, 224, 424]
        }]
    });
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
                ['High School', 13.5],
                ['Associates Degree', 16.5],
                {
                    name: 'Bachelors Degree',
                    y: 52.2,
                    sliced: true,
                    selected: true
                },
                ['Masters Degree', 12.8],
                ['N/A', 5.0]
            ]
        }]
    });
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
            data: [352]
        }, {
            name: 'Female',
            data: [415]
        }]
    });

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
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart11',
            type: 'column'
        },
        title: {
            text: 'Supporters'
        },
        xAxis: {
            categories: ['August', 'September', 'October']
        },
        yAxis: {
            title: {
                text: 'Supporters'
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

});

function ChangePage(page){
    $('.page').hide();
    $('#' + page + '-Page, #' + page + '-SideNav').fadeIn();
    $('#' + page + '-SideNav ').children('li :first').click();
}