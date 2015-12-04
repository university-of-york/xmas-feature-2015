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
          if ($section.hasClass('active')) return;
          $section.addClass('active').removeClass('past future');
          // Update hash in address bar
          var sectionId = '#'+$section.attr('id');
          if (sectionId === '#intro' || sectionId === '#outro') sectionId = ' ';
          window.history.replaceState('Hash updated', sectionId, sectionId);
        } else {
          $section.addClass('past').removeClass('active future');
        }
      } else {
        $section.addClass('future').removeClass('past active');
      }
    });
    return;
  };

  // Update sectionHeight and activePageOffset variables
  var updateSizes = function(e) {
    sectionHeight = $sections.outerHeight();
    activePageOffset = sectionHeight/5;
    return;
  };

  // Check keystroke and scroll to prev/next page
  var scrollPage = function(e) {
    var keyCode = e.keyCode;
    if (keyCode == 40 || keyCode == 39 || keyCode == 32 || keyCode == 13 || keyCode == 34) {
      // Down, right, space, enter, page down
      //console.log('Scroll down');
      e.preventDefault();
      scrollTo('next');
    } else if (keyCode == 38 || keyCode == 37 || keyCode == 33) {
      // Up, left, page up
      //console.log('Scroll up');
      e.preventDefault();
      scrollTo('prev');
    }
    return;
  };

  // Scroll to px value
  var scrollTo = function(dir) {
    var $activeSection = $('section.active');
    var nextDiv = $activeSection.next();
    if (dir === 'prev') {
      nextDiv = $activeSection.prev();
    }
    if (nextDiv.length === 0) return false;
    $('html,body').stop(true).animate({
      scrollTop: $(nextDiv).position().top
    }, 400);
  };

  // Add a &nbsp; before the last word in each of the stats
  var addNBSPs = function() {
    var $stats = $('.section__stat, #intro p, #intro h3, #outro p');
    $stats.each(function(i, stat) {
      var $this = $(this);
      var string = $this.html();
      string = string.replace(/ ([^ ]*)$/,' $1');
      $this.html(string);
    });
  };

  // Set default sizes
  updateSizes();
  addNBSPs();

  // Event listeners
  $window.on('keydown', scrollPage);
  $window.on('scroll', checkScroll);
  $window.on('resize', updateSizes);
  $window.on('resize', checkScroll);

  $('.intro__scroll').on('click', function(e) {
    e.preventDefault();
    scrollTo('next');
  })

  // Some browsers trigger scroll on pageload, otherwise...
  if (!$sections.hasClass('active')) {
    checkScroll();
  }

});
