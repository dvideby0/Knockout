
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

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart1',
            type: 'area',
            marginBottom: 70
        },
        title: {
            text: 'Total: '
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
    });

    function GetSupportersByAge(clientId, onSuccess) {
        $.ajax({
            type: "GET",
            url: "http://yearofthecu.com:3838/supportersByAge",
            data: { "clientId": 1 },
            dataType: "json",
            success: function(data) {
                onSuccess(data);
            }
        })
    }

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
            name: 'Supporters by Age',
            data: (function() {
                GetSupportersByAge(1, function(data) {
                    return data;
                });
            })()
        }]
    });

    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart3',
            type: 'column'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart4',
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart5',
            type: 'line'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart6',
            type: 'column'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart7',
            type: 'column',
            marginBottom: 70
        },
        title: {
            text: 'Total: '
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
    });

    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart8',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Browser market Share'
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
            name: 'Browser share',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart9',
            type: 'area'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart10',
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart11',
            type: 'line'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart12',
            type: 'column'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart13',
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
});

function ChangePage(page){
    $('.page').hide();
    $('#' + page + '-Page, #' + page + '-SideNav').fadeIn();
    $('#' + page + '-SideNav ').children('li :first').click();
}
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

    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart1',
            type: 'area',
            marginBottom: 70
        },
        title: {
            text: 'Total: '
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
    });

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
            data: [
                ['Ages 31 - 40',   20.0],
                ['Ages 13 - 19',       12.00],
                {
                    name: 'Ages 20 - 30',
                    y: 65.0,
                    sliced: true,
                    selected: true
                },
                ['Ages 41 - 60',    3]
            ]
        }]
    });
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
            data: [2370]
        }, {
            name: 'Female',
            data: [1240]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart4',
            type: 'area'
        },
        title: {
            text: 'Location'
        },
        xAxis: {
            categories: ['July', 'Aug', 'Sep', 'Oct', 'Nov'],
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
            data: [null, 2, 24, 152, 380]
        }, {
            name: 'Tampa',
            data: [null, 12, 72, 224, 424]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart5',
            type: 'line'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart6',
            type: 'column'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart7',
            type: 'column',
            marginBottom: 70
        },
        title: {
            text: 'Total: '
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
    });

    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart8',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Browser market Share'
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
            name: 'Browser share',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart9',
            type: 'area'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart10',
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart11',
            type: 'line'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart12',
            type: 'column'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart13',
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 3, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
});

function ChangePage(page){
    $('.page').hide();
    $('#' + page + '-Page, #' + page + '-SideNav').fadeIn();
    $('#' + page + '-SideNav ').children('li :first').click();
}