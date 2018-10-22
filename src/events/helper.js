'use strict';

const $ = require('jquery');


function switchCss(theme) {
    const $body = $('body');
    $body.removeClass('light');
    $body.removeClass('dark');
    $body.addClass(theme);
}

module.exports = {
    switchCss
};
