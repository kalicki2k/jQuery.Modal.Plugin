(function ($, undefined) {
    'use strict';

    $.fn.modal = function (event) {

        return this.each(function () {

            var $body = $('body'),
                $modal = $(this),
                $overlay = $('[data-modal-overlay]');

            // init elements
            if (0 === $overlay.length) {
                $overlay = createOverlay();
            }

            if (0 === $overlay.has($modal).length) {
                $modal.appendTo($overlay);
            }

            // bind events
            $modal.one('modal.open', open);
            $modal.one('modal.close', close);
            $body.on('keyup', closeByESC);

            // switch modal event
            switch (event) {
                case 'open':
                    $modal.trigger('modal.open');
                    break;
                case 'close':
                    $modal.trigger('modal.close');
                    break;
            }

            function createOverlay() {
                return $('<div>',{
                    'class': 'modal-overlay',
                    'data-modal-overlay': ''
                })
                    .appendTo('body');
            }

            function open() {
                $modal.add($overlay).show();
            }

            function close() {
                $modal.add($overlay).hide();
                $body.off('keyup');
            }

            function closeByESC(event) {
                if (event.which === 27) { // 27 is the keycode for the Escape key
                    $modal.trigger('modal.close');
                    $body.off('keyup');
                }
            }

            return this;
        });
    };

    $(document).on('click', '[data-modal-open]', function (event) {
        var $modal = $('#' + $(this).data('modal-open'));
        $modal.modal('open');
        event.preventDefault();
    });

    $(document).on('click', '[data-modal-close]', function (event) {
        var $modal = $(this).closest('[data-modal]');
        $modal.modal('close');
        event.preventDefault();
    });

})(jQuery);

/*
(function ($, undefined) {
    'use strict';

    $.fn.modal = function (event) {


        return this.each(function () {

            console.log($(this));

            var $body = $('body'),
                $modal = $(this),
                $overlay = $('[data-modal-overlay]');

            this.init = function () {

                // init elements
                if (0 === $overlay.length) {
                    $overlay = createOverlay();
                }

                if (0 === $overlay.has($modal).length) {
                    $modal.appendTo($overlay);
                }

                // bind events
                $modal.one('modal.open', open);
                $modal.one('modal.close', close);
                $body.on('keyup', closeByKeyUp);

                // switch modal event
                switch (event) {
                    case 'open':
                        $modal.trigger('modal.open');
                        break;
                    case 'close':
                        $modal.trigger('modal.close');
                        break;
                }

                return this;
            };

            function createOverlay() {
                return $('<div>', {
                    class: 'modal-overlay',
                    'data-modal-overlay': ''
                }).appendTo('body');
            }

            function open() {
                // var getOpenedModal = $overlay.data('modal-is-open');
                // console.log(getOpenedModal);
                // if(undefined !== getOpenedModal){
                //     var $openedModal = $('#' + getOpenedModal);
                //     $openedModal.trigger('modal.close');
                // }
                console.log($modal.attr('id'));
                $modal.add($overlay).show();
                //$overlay.data('modal-is-open', $modal.attr('id'));

            }

            function close() {
                $modal.add($overlay).hide();
                $body.off('keyup');
                //$overlay.removeData('modal-is-open');
            }

            function closeByKeyUp(event) {
                if (event.which === 27) { // 27 is the keycode for the Escape key
                    $modal.trigger('modal.close');
                    $body.off('keyup');
                }
            }

            return this.init($modal);
        });
    };

    $(document).on('click', '[data-modal-open]', function (event) {
        var $modal = $('#' + $(this).data('modal-open'));
        $modal.modal('open');
        event.preventDefault();
    });

    $(document).on('click', '[data-modal-close]', function (event) {
        var $modal = $(this).closest('[data-modal]');
        $modal.modal('close');
        event.preventDefault();
    });

})(jQuery);

 */