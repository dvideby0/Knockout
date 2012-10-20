$(document).ready(function() {

    var pageWrapper = $("#pageWrapper");
    var gridElement = $('#grid');
    var filterEditor = null;
    var grid = null;
    var reportPage = $.getUrlVars()["type"];

    switch (reportPage) {

        case "supporters":

            GetSupporters(function(data) {

                var ds = new recline.Model.Dataset({
                    records: data
                });

                grid = new recline.View.SlickGrid({
                    model: ds,
                    el: gridElement,
                    state: {
                        gridOptions: {
                            forceFitColumns: true
                        }
                    }
                });

                filterEditor = new recline.View.FilterEditor({
                    model: ds
                });

                renderGrid();
                addFilter();

            });

            break;

        case "campaigns":

            grid = new recline.View.SlickGrid({
                model: campaignsDs,
                el: gridElement,
                state: {
                    gridOptions: {
                        forceFitColumns: true
                    }
                }
            });

            filterEditor = new recline.View.FilterEditor({
                model: campaignsDs
            });

            break;

        case "channels":

            grid = new recline.View.SlickGrid({
                model: channelsDs,
                el: gridElement,
                state: {
                    gridOptions: {
                        forceFitColumns: true
                    }
                }
            });

            filterEditor = new recline.View.FilterEditor({
                model: channelsDs
            });

            break;

        default:
            break;

    }

    function renderGrid() {
        if (grid) {
            grid.visible = true;
            grid.autosizeColumns = true;
            grid.render();
        }
    }

    function addFilter() {
        if (filterEditor) {
            $('#filterEditor').append(filterEditor.el);
        }
    }

    function resizeReportUI() {
        if (grid) {
            var gridHeight = pageWrapper.height();
            gridElement.height(gridHeight);
            $(".slick-viewport").height(gridHeight);
            grid.render();
        }
    }

    $(window).load(function () {
        resizeReportUI();
    });

    $(window).resize(function () {
        resizeReportUI();
    });

});

function GetSupporters(onSuccess) {
    $.ajax({
        type: "GET",
        url: "http://yearofthecu.com:3838/supporters",
        dataType: "json",
        success: function(data) {
            onSuccess(data);
        }
    })
}

function GetCampaigns(onSuccess) {
    $.ajax({
        type: "GET",
        url: "http://yearofthecu.com:3838/campaigns",
        dataType: "json",
        success: function(data) {
            newSupporters = data;
            onSuccess(data);
        }
    })
}

var supportersDs = new recline.Model.Dataset({
    records: [
        { Id: 1, Date: '10-19-2012', Supporter: 'JT Hope', Age: '27', City: 'Detroit', State:'MI', Education: 'BS', Friends: '485' },
        { Id: 2, Date: '10-20-2012', Supporter: 'Brad Prymicz', Age: '13', City: 'Largo', State:'FL', Education: 'MBA', Friends: '260' },
        { Id: 3, Date: '10-21-2012', Supporter: 'Richard Brookfield', Age: '28', City: 'St. Petersburg', State:'FL', Education: 'BS', Friends: '750' },
        { Id: 4, Date: '10-22-2012', Supporter: 'Hemanth Reddy', Age: '28', City: 'Tampa', State:'FL', Education: 'MBA', Friends: '410' },
        { Id: 5, Date: '10-23-2012', Supporter: 'Michael Tormeno', Age: '30', City: 'St. Petersburg', State:'FL', Education: 'MBA', Friends: '350' },
        { Id: 6, Date: '10-24-2012', Supporter: 'Marcin Fracz', Age: '29', City: 'Detroit', State:'MI', Education: 'MBA', Friends: '234' },
        { Id: 7, Date: '10-25-2012', Supporter: 'William Butterfield', Age: '32', City: 'Detroit', State:'MI', Education: 'Some College', Friends: '532' },
        { Id: 8, Date: '10-26-2012', Supporter: 'Alan Hope', Age: '27', City: 'St. Petersburg', State:'FL', Education: 'AS', Friends: '64' },
        { Id: 9, Date: '10-27-2012', Supporter: 'Tatiana Fracz', Age: '29', City: 'St. Petersburg', State:'FL', Education: 'BA', Friends: '35' },
        { Id: 10, Date: '10-28-2012', Supporter: 'Mat Rompa', Age: '25', City: 'St. Petersburg', State:'FL', Education: 'High School', Friends: '665' },
        { Id: 11, Date: '10-19-2012', Supporter: 'Marc Glenn', Age: '31', City: 'Detroit', State:'MI', Education: 'High School', Friends: '123' },
        { Id: 12, Date: '10-20-2012', Supporter: 'Jon Palmer', Age: '30', City: 'Detroit', State:'MI', Education: 'AS', Friends: '532' },
        { Id: 13, Date: '10-21-2012', Supporter: 'Nate Ogg', Age: '24', City: 'St. Petersburg', State:'FL', Education: 'BA', Friends: '65' },
        { Id: 14, Date: '10-22-2012', Supporter: 'Caleb Beedle', Age: '39', City: 'St. Petersburg', State:'FL', Education: 'BS', Friends: '10' },
        { Id: 15, Date: '10-23-2012', Supporter: 'Ryan McKennon', Age: '37', City: 'St. Petersburg', State:'FL', Education: 'BA', Friends: '48' },
        { Id: 16, Date: '10-24-2012', Supporter: 'Tom Bellinson', Age: '46', City: 'St. Petersburg', State:'FL', Education: 'MBA', Friends: '120' },
        { Id: 17, Date: '10-25-2012', Supporter: 'Daniel Kusk', Age: '34', City: 'St. Petersburg', State:'FL', Education: 'AS', Friends: '280' },
        { Id: 18, Date: '10-26-2012', Supporter: 'Stephen Hatfield', Age: '38', City: 'St. Petersburg', State:'FL', Education: 'BS', Friends: '320' },
        { Id: 19, Date: '10-27-2012', Supporter: 'John Planckaert', Age: '32', City: 'Detroit', State:'MI', Education: 'AS', Friends: '187' },
        { Id: 20, Date: '10-28-2012', Supporter: 'Dietz Smith', Age: '52', City: 'St. Petersburg', State:'FL', Education: 'BA', Friends: '865' },
        { Id: 21, Date: '10-19-2012', Supporter: 'Kristin Evans', Age: '23', City: 'St. Petersburg', State:'FL', Education: 'BA', Friends: '100' },
        { Id: 22, Date: '10-20-2012', Supporter: 'Andy Johnston', Age: '40', City: 'Detroit', State:'MI', Education: 'High School', Friends: '45' },
        { Id: 23, Date: '10-21-2012', Supporter: 'Erin Quinn', Age: '24', City: 'Detroit', State:'MI', Education: 'High School', Friends: '63' },
        { Id: 24, Date: '10-22-2012', Supporter: 'Shawn Kelley', Age: '43', City: 'Detroit', State:'MI', Education: 'AS', Friends: '48' },
        { Id: 25, Date: '10-23-2012', Supporter: 'Brett Kukuk', Age: '28', City: 'Detroit', State:'MI', Education: 'High School', Friends: '74' },
        { Id: 26, Date: '10-24-2012', Supporter: 'Jeffery Hgen', Age: '34', City: 'Detroit', State:'MI', Education: 'MBA', Friends: '23' },
        { Id: 27, Date: '10-25-2012', Supporter: 'Robert Laing', Age: '30', City: 'Detroit', State:'MI', Education: 'MBA', Friends: '750' },
        { Id: 28, Date: '10-26-2012', Supporter: 'Erin Thomas', Age: '27', City: 'Detroit', State:'MI', Education: 'High School', Friends: '64' },
        { Id: 29, Date: '10-27-2012', Supporter: 'Jacob Evans', Age: '29', City: 'Detroit', State:'MI', Education: 'High School', Friends: '485' },
        { Id: 30, Date: '10-28-2012', Supporter: 'Keith Bruce', Age: '31', City: 'Detroit', State:'MI', Education: 'BS', Friends: '634' }
    ]
});

var campaignsDs = new recline.Model.Dataset({
    records: [
        { Id: 1, Campaign: 'iTunes', Clicks: 2450, Gender: 'Any', Education: 'Any', Start: '10/19/2012', End: '10/31/2012', Active: true },
        { Id: 2, Campaign: 'Bed Bath & Beyond', Clicks: 1354, Gender: 'Any', Education: 'Any', Start: '10/19/2012', End: '10/31/2012', Active: true },
        { Id: 3, Campaign: 'Home Depot', Clicks: 1423, Gender: 'Any', Education: 'Any', Start: '10/19/2012', End: '10/31/2012', Active: true }
    ]
});

var channelsDs = new recline.Model.Dataset({
    records: [
        { Id: 1, Channel: 'Facebook', Supporters:30, Reach:3000, AverageAge:35 },
        { Id: 2, Channel: 'G+', Supporters:42, Reach:4325, AverageAge:30 },
        { Id: 3, Channel: 'Twitter', Supporters:28, Reach:4345, AverageAge:28 },
        { Id: 4, Channel: 'foursquare', Supporters:34, Reach:8252, AverageAge:35 },
        { Id: 5, Channel: 'LinkedIn', Supporters:52, Reach:5333, AverageAge:45 }
    ]
});

$.extend({
    getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name){
        return $.getUrlVars()[name];
    }
});
