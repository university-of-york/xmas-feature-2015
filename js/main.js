$(function() {

    // Initial jQuery objectification
    var $window = $(window);
    var $document = $(document);
    var $sections = $('section');

    // Height of each section
    var sectionHeight;

    // Number of pixels from the top a page is when it becomes 'active'
    var activePageOffset;

    // Checks to see where the page is scrolled to and adds a relevant class
    var checkScroll = function(e) {
        var documentScrollTop = $document.scrollTop();
        $sections.each(function(i, section) {
            var $section = $(section);
            var sectionOffsetTop = $section.offset().top - activePageOffset;
            if (sectionOffsetTop <= documentScrollTop) {
                if (sectionOffsetTop + sectionHeight > documentScrollTop) {
                    $section.addClass('active').removeClass('past future');
                } else {
                    $section.addClass('past').removeClass('active future');
                }
            } else {
                $section.addClass('future').removeClass('past active');
            }
        });
    };

    // Update sectionHeight and activePageOffset variables
    var updateSizes = function(e) {
        sectionHeight = $sections.outerHeight();
        activePageOffset = sectionHeight/5;
    };

    // Set default sizes
    updateSizes();

    // Event listeners
    $window.on('scroll', checkScroll);
    $window.on('resize', updateSizes);
    $window.on('resize', checkScroll);

    // Some browsers trigger scroll on pageload, otherwise...
    if (!$sections.hasClass('active')) {
        checkScroll();
    }

});
