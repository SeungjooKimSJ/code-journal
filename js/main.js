/* global data */
/* exported data */
var $placeholderImage = document.querySelector('#placeholder-image');
var $photoUrl = document.querySelector('.photo-url');

$photoUrl.addEventListener('input', imgInputHandler);

function imgInputHandler(event) {
  $placeholderImage.setAttribute('src', event.target.value);
}
