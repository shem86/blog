$(document).ready( function () {
    setInterval( function() {
        moment($(".created_at")[0].innerText, "ddd, MMM DD YYYY, HH:mm:ss");
    }, 5000);
});
