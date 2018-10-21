'use strict';

const $ = require('jquery');


function switchCss(id) {
    $('.js-main-css').prop('disabled', true);
    $(`#${id}`).prop('disabled', false);
}

module.exports = {
    switchCss
};
