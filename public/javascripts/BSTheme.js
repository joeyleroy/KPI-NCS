/* This is Client side javascript. This script is complied into the HTML response
    and sent to the client as part of the HTML page. This is not NODEJS/Server code.

Change Theme - 1 variable, 1 script, 3 functions 
    When a BSnav_theme_dropdown (theme change dropdown list) 
    theme item (BSnav_theme_item) 
    styled with change-style-menu-item is clicked, change to the selected theme.
    This is used in the root/views/BSmixin.pug file for BSnav_theme mixin */
/*  Variable for function that checks if local storage is allowed on client */
var supports_storage = supports_html5_storage();

/* On load, set theme from local storage 
    Note to self: window.localStorage persists
    window.sessionStorage is cleared on tab/browser close*/
if (supports_storage) {
    var theme = localStorage.theme;
    if (theme) {
      set_theme(theme);
    }
} else {
    /* Don't annoy user with options that don't persist */
    $('#BSnav_theme').hide();
}

/* functions */
/* Click listener */
jQuery(function($) {
    $('body').on('click', '.change-style-menu-item', function() {
      var theme_name = $(this).attr('rel');
      var theme = "//maxcdn.bootstrapcdn.com/bootswatch/3.3.0/" + theme_name + "/bootstrap.min.css";
      set_theme(theme);
    });
});

/*  Function to check if client allows for local storage.
    returns true if the window object contains a property with the name localStorage and a non-null value
    or false */
function supports_html5_storage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
}

/*  Changes the Link to the CSS in the HTML 
    Additionally, saves the theme to local storage 
    if localstorage is allowable on client */
    function set_theme(theme) {
        $('link[title="main"]').attr('href', theme);
        if (supports_storage) {
          localStorage.theme = theme;
        }
    }