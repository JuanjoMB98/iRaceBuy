function setupTrackHover() {
    $("body").on("mouseenter", "[data-trackid]", function () {
        const id = $(this).data("trackid");
        $(`[data-trackid='${id}']`).addClass("is-hovered");
    });

    $("body").on("mouseleave", "[data-trackid]", function () {
        const id = $(this).data("trackid");
        $(`[data-trackid='${id}']`).removeClass("is-hovered");
    });
}



$(document).ready(function () {
    setupTrackHover();
    console.log("Document ready! Setting up track hover functionality.");
    
});
