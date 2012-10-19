$(document).ready(function() {

    var supportersDS = new recline.Model.Dataset({
        records: [
            { Id: 1, Date: '10-19-2012', Campaign: 'iTunes', Total: 14 },
            { Id: 2, Date: '10-20-2012', Campaign: 'iTunes', Total: 27 },
            { Id: 3, Date: '10-21-2012', Campaign: 'iTunes', Total: 67 },
            { Id: 4, Date: '10-22-2012', Campaign: 'iTunes', Total: 120 },
            { Id: 5, Date: '10-23-2012', Campaign: 'iTunes', Total: 5 },
            { Id: 6, Date: '10-24-2012', Campaign: 'iTunes', Total: 13 },
            { Id: 7, Date: '10-25-2012', Campaign: 'iTunes', Total: 76 },
            { Id: 8, Date: '10-26-2012', Campaign: 'iTunes', Total: 58 },
            { Id: 9, Date: '10-27-2012', Campaign: 'iTunes', Total: 102 },
            { Id: 10, Date: '10-28-2012', Campaign: 'iTunes', Total: 95 },
            { Id: 11, Date: '10-19-2012', Campaign: 'Home Depot', Total: 48 },
            { Id: 12, Date: '10-20-2012', Campaign: 'Home Depot', Total: 10 },
            { Id: 13, Date: '10-21-2012', Campaign: 'Home Depot', Total: 13 },
            { Id: 14, Date: '10-22-2012', Campaign: 'Home Depot', Total: 75 },
            { Id: 15, Date: '10-23-2012', Campaign: 'Home Depot', Total: 100 },
            { Id: 16, Date: '10-24-2012', Campaign: 'Home Depot', Total: 57 },
            { Id: 17, Date: '10-25-2012', Campaign: 'Home Depot', Total: 32 },
            { Id: 18, Date: '10-26-2012', Campaign: 'Home Depot', Total: 42 },
            { Id: 19, Date: '10-27-2012', Campaign: 'Home Depot', Total: 39 },
            { Id: 20, Date: '10-28-2012', Campaign: 'Home Depot', Total: 28 },
            { Id: 21, Date: '10-19-2012', Campaign: 'Bed Bath & Beyond', Total: 10 },
            { Id: 22, Date: '10-20-2012', Campaign: 'Bed Bath & Beyond', Total: 25 },
            { Id: 23, Date: '10-21-2012', Campaign: 'Bed Bath & Beyond', Total: 12 },
            { Id: 24, Date: '10-22-2012', Campaign: 'Bed Bath & Beyond', Total: 32 },
            { Id: 25, Date: '10-23-2012', Campaign: 'Bed Bath & Beyond', Total: 42 },
            { Id: 26, Date: '10-24-2012', Campaign: 'Bed Bath & Beyond', Total: 75 },
            { Id: 27, Date: '10-25-2012', Campaign: 'Bed Bath & Beyond', Total: 18 },
            { Id: 28, Date: '10-26-2012', Campaign: 'Bed Bath & Beyond', Total: 49 },
            { Id: 29, Date: '10-27-2012', Campaign: 'Bed Bath & Beyond', Total: 35 },
            { Id: 30, Date: '10-28-2012', Campaign: 'Bed Bath & Beyond', Total: 28 },
        ]
    });

    var supportersGridElement = $('#uxSupportersGrid');
    var supportersGrid = new recline.View.SlickGrid({
        model: supportersDS,
        el: supportersGridElement
    });
    supportersGrid.visible = true;
    supportersGrid.render();

    var supportersByAgeDS = new recline.Model.Dataset({
        records: [
            { Id: 1, Supporter: 'JT Hope', Age: '27' },
            { Id: 2, Supporter: 'Brad Prymicz', Age: '13' },
            { Id: 3, Supporter: 'Richard Brookfield', Age: '28' },
            { Id: 4, Supporter: 'Hemanth Reddy', Age: '28' },
            { Id: 5, Supporter: 'Michael Tormeno', Age: '30' },
            { Id: 6, Supporter: 'Marcin Fracz', Age: '29' },
            { Id: 7, Supporter: 'William Butterfield', Age: '32' },
            { Id: 8, Supporter: 'Alan Hope', Age: '27' },
            { Id: 9, Supporter: 'Tatiana Fracz', Age: '29' },
            { Id: 10, Supporter: 'Mat Rompa', Age: '25' },
            { Id: 11, Supporter: 'Marc Glenn', Age: '31' },
            { Id: 12, Supporter: 'Jon Palmer', Age: '30' },
            { Id: 13, Supporter: 'Nate Ogg', Age: '24' },
            { Id: 14, Supporter: 'Caleb Beedle', Age: '39' },
            { Id: 15, Supporter: 'Ryan McKennon', Age: '37' },
            { Id: 16, Supporter: 'Tom Bellinson', Age: '46' },
            { Id: 17, Supporter: 'Daniel Kusk', Age: '34' },
            { Id: 18, Supporter: 'Stephen Hatfield', Age: '38' },
            { Id: 19, Supporter: 'John Planckaert', Age: '32' },
            { Id: 20, Supporter: 'Dietz Smith', Age: '52' },
            { Id: 21, Supporter: 'Kristin Evans', Age: '23' },
            { Id: 22, Supporter: 'Andy Johnston', Age: '40' },
            { Id: 23, Supporter: 'Erin Quinn', Age: '24' },
            { Id: 24, Supporter: 'Shawn Kelley', Age: '43' },
            { Id: 25, Supporter: 'Brett Kukuk', Age: '28' },
            { Id: 26, Supporter: 'Jeffery Hagen', Age: '34' },
            { Id: 27, Supporter: 'Robert Laing', Age: '30' },
            { Id: 28, Supporter: 'Erin Thomas', Age: '27' },
            { Id: 29, Supporter: 'Jacob Evans', Age: '29' },
            { Id: 30, Supporter: 'Keith Bruce', Age: '31' }
        ]
    });

});