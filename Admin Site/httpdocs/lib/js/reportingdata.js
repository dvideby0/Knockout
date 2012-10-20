$(document).ready(function() {

    var supportersDs = new recline.Model.Dataset({
        records: [
            { Id: 1, Date: '10-19-2012', Supporter: 'JT Hope', Age: '27', Location: 'Detroit, MI', Education: 'BS', Friends: '485' },
            { Id: 2, Date: '10-20-2012', Supporter: 'Brad Prymicz', Age: '13', Location: 'Largo, FL', Education: 'MBA', Friends: '260' },
            { Id: 3, Date: '10-21-2012', Supporter: 'Richard Brookfield', Age: '28', Location: 'St. Petersburg, FL', Education: 'BS', Friends: '750' },
            { Id: 4, Date: '10-22-2012', Supporter: 'Hemanth Reddy', Age: '28', Location: 'Tampa, FL', Education: 'MBA', Friends: '410' },
            { Id: 5, Date: '10-23-2012', Supporter: 'Michael Tormeno', Age: '30', Location: 'St. Petersburg, FL', Education: 'MBA', Friends: '350' },
            { Id: 6, Date: '10-24-2012', Supporter: 'Marcin Fracz', Age: '29', Location: 'Detroit, MI', Education: 'MBA', Friends: '234' },
            { Id: 7, Date: '10-25-2012', Supporter: 'William Butterfield', Age: '32', Location: 'Detroit, MI', Education: 'Some College', Friends: '532' },
            { Id: 8, Date: '10-26-2012', Supporter: 'Alan Hope', Age: '27', Location: 'St. Petersburg, FL', Education: 'AS', Friends: '64' },
            { Id: 9, Date: '10-27-2012', Supporter: 'Tatiana Fracz', Age: '29', Location: 'St. Petersburg, FL', Education: 'BA', Friends: '35' },
            { Id: 10, Date: '10-28-2012', Supporter: 'Mat Rompa', Age: '25', Location: 'St. Petersburg, FL', Education: 'High School', Friends: '665' },
            { Id: 11, Date: '10-19-2012', Supporter: 'Marc Glenn', Age: '31', Location: 'Detroit, MI', Education: 'High School', Friends: '123' },
            { Id: 12, Date: '10-20-2012', Supporter: 'Jon Palmer', Age: '30', Location: 'Detroit, MI', Education: 'AS', Friends: '532' },
            { Id: 13, Date: '10-21-2012', Supporter: 'Nate Ogg', Age: '24', Location: 'St. Petersburg, FL', Education: 'BA', Friends: '65' },
            { Id: 14, Date: '10-22-2012', Supporter: 'Caleb Beedle', Age: '39', Location: 'St. Petersburg, FL', Education: 'BS', Friends: '10' },
            { Id: 15, Date: '10-23-2012', Supporter: 'Ryan McKennon', Age: '37', Location: 'St. Petersburg, FL', Education: 'BA', Friends: '48' },
            { Id: 16, Date: '10-24-2012', Supporter: 'Tom Bellinson', Age: '46', Location: 'St. Petersburg, FL', Education: 'MBA', Friends: '120' },
            { Id: 17, Date: '10-25-2012', Supporter: 'Daniel Kusk', Age: '34', Location: 'St. Petersburg, FL', Education: 'AS', Friends: '280' },
            { Id: 18, Date: '10-26-2012', Supporter: 'Stephen Hatfield', Age: '38', Location: 'St. Petersburg, FL', Education: 'BS', Friends: '320' },
            { Id: 19, Date: '10-27-2012', Supporter: 'John Planckaert', Age: '32', Location: 'Detroit, MI', Education: 'AS', Friends: '187' },
            { Id: 20, Date: '10-28-2012', Supporter: 'Dietz Smith', Age: '52', Location: 'St. Petersburg, FL', Education: 'BA', Friends: '865' },
            { Id: 21, Date: '10-19-2012', Supporter: 'Kristin Evans', Age: '23', Location: 'St. Petersburg, FL', Education: 'BA', Friends: '100' },
            { Id: 22, Date: '10-20-2012', Supporter: 'Andy Johnston', Age: '40', Location: 'Detroit, MI', Education: 'High School', Friends: '45' },
            { Id: 23, Date: '10-21-2012', Supporter: 'Erin Quinn', Age: '24', Location: 'Detroit, MI', Education: 'High School', Friends: '63' },
            { Id: 24, Date: '10-22-2012', Supporter: 'Shawn Kelley', Age: '43', Location: 'Detroit, MI', Education: 'AS', Friends: '48' },
            { Id: 25, Date: '10-23-2012', Supporter: 'Brett Kukuk', Age: '28', Location: 'Detroit, MI', Education: 'High School', Friends: '74' },
            { Id: 26, Date: '10-24-2012', Supporter: 'Jeffery Hgen', Age: '34', Location: 'Detroit, MI', Education: 'MBA', Friends: '23' },
            { Id: 27, Date: '10-25-2012', Supporter: 'Robert Laing', Age: '30', Location: 'Detroit, MI', Education: 'MBA', Friends: '750' },
            { Id: 28, Date: '10-26-2012', Supporter: 'Erin Thomas', Age: '27', Location: 'Detroit, MI', Education: 'High School', Friends: '64' },
            { Id: 29, Date: '10-27-2012', Supporter: 'Jacob Evans', Age: '29', Location: 'Detroit, MI', Education: 'High School', Friends: '485' },
            { Id: 30, Date: '10-28-2012', Supporter: 'Keith Bruce', Age: '31', Location: 'Detroit, MI', Education: 'BS', Friends: '634' }
        ]
    });

    var pageWrapper = $("#pageWrapper");
    var gridElement = $('#grid');
    var filterEditor = new recline.View.FilterEditor({
        model: supportersDs
    });

    $('#filterEditor').append(filterEditor.el);

    var supportersGrid = new recline.View.SlickGrid({
        model: supportersDs,
        el: gridElement,
        state: {
            gridOptions: {
                forceFitColumns: true,
                autosizeColumns: true
            }
        }
    });
    supportersGrid.visible = true;
    supportersGrid.autosizeColumns = true;
    supportersGrid.render();

    function resizeReportUI() {
        var gridHeight = pageWrapper.height();
        gridElement.height(gridHeight);
        $(".slick-viewport").height(gridHeight);
        supportersGrid.render();
    }

    $(window).load(function () {
        resizeReportUI();
    });

    $(window).resize(function () {
        resizeReportUI();
    });

});