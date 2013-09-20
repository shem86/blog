$(document).ready( function () {
    $.get( "/articles", function( data ) {
        $( "#articles" ).html( data );
        alert( "Load was performed." );
    });
});
