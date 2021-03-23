<a id="top"></a>

### TABLE OF CONTENTS

* [Initial Setup](#init)
* [Theme architeture](#arch)

<a id="init"></a>
#### INITIAL SETUP

**NOTE** - Make sure you have `Node + NPM` latest estable version installed in you computer.

1. First you need to install the dependecies with node, running `npm install`

1. Add yours theme ID on `gulpfile.js` - `gulp.task` function (_should be in the root of the project_).

	**Ex.** `gulpfile.js`

	```sh
	gulp.task('shopify', function() {
        return watch('./dist/+(assets|layout|config|snippets|templates|locales|sections)/**')
            .pipe(gulpShopify('api_key', 'api_password', 'store_url', 'theme_id', {
                basePath: 'dist/'
            }));
    });
	```

3. Now, you are able to run the `gulp` task in your terminal. It will compile SCSS (_with autoprefixers_), JS & Upload files to your theme previously added on `gulpfile.js` - `gulp.task` function.

<a id="arch"></a>
#### THEME ARCHITETURE

* **Config**: In this folder you can add, edit the Theme Settings - json files (_Files inside this folder will be compiled to the settings-schema.json default file_)

    **Ex.** `Config folder files`

        01_info.json
        02_colors.json
        03_typography.json
        04_currency.json
        05_search.json
        06_social.json
        07_favicon.json

* **Dist**: This folder contains Default Liquid Template Estructure from Shopify. Please, only work with `.liquid` files, do not touch on Assets and Config folders.

* **JS**: This folder contains all JS Code. Make sure to use routes files as much as you can to split the code. If you need to install an external library, please, be sure to copy & paste it inside `vendor` folder.

* **SCSS**: This folder contains all SCSS Code. Make sure to use scss best pratices as `mixins` and `variables` as much as you. If you need to install an external library, please, be sure to copy & paste it inside `vendor` folder.

