function setupTrackHover() {
    $('[data-trackid]').hover(
        function () {
            const id = $(this).data('trackid');
            $(`[data-trackid="${id}"]`).addClass('is-hovered');
        },
        function () {
            const id = $(this).data('trackid');
            $(`[data-trackid="${id}"]`).removeClass('is-hovered');
        }
    );
}

$(document).ready(function () {
    setupTrackHover();
});