router.route('*all', function() {
    $(document).ready(function() { 
        $('.minicart-icon, .minicart__close').click(function() {
            $(this).parents('.mini-cart').toggleClass('minicart--active');
        });
    });
});