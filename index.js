function inVisible(element) {
    //Checking if the element is
    //visible in the viewport
    var WindowTop = $(window).scrollTop();
    var WindowBottom = WindowTop + $(window).height();
    var ElementTop = element.offset().top;
    var ElementBottom = ElementTop + element.height();
    //animating the element if it is
    //visible in the viewport
    if ((ElementBottom <= WindowBottom) && ElementTop >= WindowTop)
      animate(element);
  }
  
  function animate(element) {
    //Animating the element if not animated before
    if (!element.hasClass('ms-animated')) {
      var maxval = element.data('max');
      var html = element.html();
      element.addClass("ms-animated");
      $({
        countNum: element.html()
      }).animate({
        countNum: maxval
      }, {
        //duration 5 seconds
        duration: 5000,
        easing: 'linear',
        step: function() {
          element.html(Math.floor(this.countNum) + html);
        },
        complete: function() {
          element.html(this.countNum + html);
        }
      });
    }
  
  }
  
  //When the document is ready
  $(function() {
    //This is triggered when the
    //user scrolls the page
    $(window).scroll(function() {
      //Checking if each items to animate are 
      //visible in the viewport
      $("h2[data-max]").each(function() {
        inVisible($(this));
      });
    })
  });

  
  let modalId = $('#image-gallery');

$(document)
  .ready(function () {

    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-image')
        .show();
      if (counter_max === counter_current) {
        $('#show-next-image')
          .hide();
      } else if (counter_current === 1) {
        $('#show-previous-image')
          .hide();
      }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr) {
      let current_image,
        selector,
        counter = 0;

      $('#show-next-image, #show-previous-image')
        .click(function () {
          if ($(this)
            .attr('id') === 'show-previous-image') {
            current_image--;
          } else {
            current_image++;
          }

          selector = $('[data-image-id="' + current_image + '"]');
          updateGallery(selector);
        });

      function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title')
          .text($sel.data('title'));
        $('#image-gallery-image')
          .attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
      }

      if (setIDs == true) {
        $('[data-image-id]')
          .each(function () {
            counter++;
            $(this)
              .attr('data-image-id', counter);
          });
      }
      $(setClickAttr)
        .on('click', function () {
          updateGallery($(this));
        });
    }
  });

// build key actions
$(document)
  .keydown(function (e) {
    switch (e.which) {
      case 37: // left
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
          $('#show-previous-image')
            .click();
        }
        break;

      case 39: // right
        if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
          $('#show-next-image')
            .click();
        }
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });
  var _window = window,Splitting = _window.Splitting,ScrollOut = _window.ScrollOut;
  Splitting();
  ScrollOut({
    targets: '.word',
    scrollingElement: '.page' });