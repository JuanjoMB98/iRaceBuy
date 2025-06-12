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

function toggleTrackSuggestedBuy() {
    $("body").on("click", "[data-trackid]", function (e) {
        const container = $(e.target).closest("[data-trackid]");
        const id = container.data("trackid");
        const isFreeTrack = container.data("isfreetrack");

        console.log("Track clicked:", id);

        if (!isFreeTrack) {
            $(`[data-trackid='${id}']`).toggleClass("-suggestedBuy");
        }
    });
}

$(document).ready(function () {
    setupTrackHover();
    toggleTrackSuggestedBuy();
});
