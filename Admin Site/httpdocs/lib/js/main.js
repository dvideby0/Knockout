$('#SupportUsLink').attr('href', 'http://yearofthecu.com:3737?ClientID=12345678910&ReturnURL=' + location.href);

function ShowModal(){
    $('#myModal').modal({
        backdrop: true
    });
}
function HideModal(){
    $('#myModal').modal('hide');
}