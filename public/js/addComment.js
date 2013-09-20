$(document).ready( function () {
    var $commentForm = $( "#commentForm" );
    $commentForm.submit( function (e) {
        e.preventDefault();
        $.post( "/articles/" + $commentForm.find('[name="_id"]').val() + "/postComment", $( "#commentForm" ).serialize()).done(function( data ) {
            console.log( "Data Loaded: " + data );
        });
    });
});