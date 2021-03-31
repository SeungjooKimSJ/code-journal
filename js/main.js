/* global data */
/* exported data */

var $placeholderImage = document.querySelector('#placeholder-image');
var $photoUrl = document.querySelector('.url');

var $formNewEntry = document.querySelector('.form-row');

$photoUrl.addEventListener('input', imgInputHandler);
$formNewEntry.addEventListener('submit', submitNewEntryForm);

function imgInputHandler(event) {
  $placeholderImage.setAttribute('src', event.target.value);
}

function submitNewEntryForm(event) {
  event.preventDefault();

  var newEntryData = {
    title: $formNewEntry.elements.title.value,
    url: $formNewEntry.elements.url.value,
    notes: $formNewEntry.elements.notes.value
  };

  var dataNextId = data.nextEntryId;
  newEntryData.nextEntryId = dataNextId;

  data.nextEntryId++;

  data.entries.unshift(newEntryData);

  $placeholderImage.setAttribute('src', './images/placeholder-image-square.jpg');

  $formNewEntry.reset();
}
