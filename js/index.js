var $megamenuParentListItem = $('.megamenu-nav > li.is-parent');

var $megamenuBackground = $('#megamenu-background');

var isTouch = 'ontouchstart' in window || !!navigator.msMaxTouchPoints;

var handleMenuItemOpenState = function handleMenuItemOpenState(elem) {
    elem.addClass('is-open');
    elem.find('a').first().attr('aria-expanded', true);
};

var handleMenuItemCloseState = function handleMenuItemCloseState(elem) {
    elem.removeClass('is-open');
    elem.find('a').first().attr('aria-expanded', false);
};

var openMegamenu = function openMegamenu(bgElem, heightVal) {
    $('body').addClass('megamenu-visible');
    bgElem.height(heightVal);
};

var closeMegamenu = function closeMegamenu(bgElem, heightVal) {
    $('body').removeClass('megamenu-visible');
    bgElem.height(heightVal);
};

var $megamenuContentElem = $('.megamenu-nav .megamenu-content');

var getTallestMenuHeight = function getTallestMenuHeight() {
    var maxHeight = 0;
    $megamenuContentElem.each(function (index, item) {
        if ($(item).outerHeight() > maxHeight) {
            maxHeight = $(item).outerHeight();
        }
    });
    return maxHeight;
};

var debouncedClose = _.debounce(closeMegamenu, 400);
var throttledContentHeightCount = _.throttle(getTallestMenuHeight, 100);

var megamenuContentMaxHeight = 0;

window.onresize = function () {
    megamenuContentMaxHeight = throttledContentHeightCount();
};

$(function () {
    megamenuContentMaxHeight = getTallestMenuHeight();

    $megamenuParentListItem.each(function (index, item) {
        if (!isTouch) {
            $(item).hoverIntent({
                sensitivity: 10,
                interval: 50,
                over: function over() {
                    debouncedClose.cancel();
                    $megamenuParentListItem.removeClass('is-open');
                    handleMenuItemOpenState($(item));
                    openMegamenu($megamenuBackground, megamenuContentMaxHeight);
                },
                out: function out() {
                    handleMenuItemCloseState($(item));
                    debouncedClose($megamenuBackground, 0);
                } });

        }

        $(item).find('a').first().on('click touch', function () {
            if (!$(item).hasClass('is-open')) {
                $megamenuParentListItem.removeClass('is-open');
                handleMenuItemOpenState($(item));
                openMegamenu($megamenuBackground, megamenuContentMaxHeight);
            } else {
                handleMenuItemCloseState($(item));
                closeMegamenu($megamenuBackground, 0);
            }
        });
    });

    $('#megamenu-dim').on('click touch', function (e) {
        if ($('body').hasClass('megamenu-visible')) {
            e.preventDefault();
            $megamenuParentListItem.removeClass('is-open');
            closeMegamenu($megamenuBackground, 0);
        }
    });
});