/**
 * ----------------------------------------------------------------------------------------------------
 * PRODUCT ROUTE
 * ----------------------------------------------------------------------------------------------------
 */

var productRoute = function() {
};

router.route('products/*type', productRoute);
router.route('collections/*collection/products/*type', productRoute);