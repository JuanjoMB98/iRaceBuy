function setupTrackHover() {
    $("body").on("mouseenter", "[data-trackid].js-trackHover", function () {
        const id = $(this).data("trackid");
        $(`[data-trackid='${id}'].js-trackHover`).addClass("is-hovered");
    });

    $("body").on("mouseleave", "[data-trackid].js-trackHover", function () {
        const id = $(this).data("trackid");
        $(`[data-trackid='${id}'].js-trackHover`).removeClass("is-hovered");
    });
}

function toggleTrackSuggestedBuy() {
    $("body").on("click", "[data-trackid]", function (e) {
        const container = $(e.target).closest("[data-trackid]");
        const id = container.data("trackid");
        const isFreeTrack = container.data("isfreetrack");

        if (!isFreeTrack) {
            $(`[data-trackid='${id}']`).toggleClass("-suggestedBuy");
        }
    });
}

$(document).ready(function () {
    setupTrackHover();
    toggleTrackSuggestedBuy();
});
