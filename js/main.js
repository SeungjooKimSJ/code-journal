/* global data */
/* exported data */

var $placeholderImage = document.querySelector('#placeholder-image');
var $photoUrl = document.querySelector('.url');
var $formNewEntry = document.querySelector('.form-row');

var $navEntries = document.querySelector('.nav-entries');
var $mainContainer = document.querySelector('.main-container');
var $entriesContainer = document.querySelector('.entries-container');
var $entriesP = document.querySelector('.entries-p');
var $entriesUl = document.querySelector('.entries-ul');
var $entriesLi = document.querySelector('.entries-li');

$photoUrl.addEventListener('input', imgInputHandler);
$formNewEntry.addEventListener('submit', submitNewEntryForm);

$navEntries.addEventListener('click', clickNavEntries);

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

function clickNavEntries(event) {
  $mainContainer.className = 'main-container hidden';
  $entriesP.className = 'entries-p hidden';

  $entriesContainer.className = 'entries-container';
  $entriesUl.className = 'entries-ul';

  for (var i = 0; i < data.entries.length; i++) {
    var entryDom = renderEntry(data.entries[i]);

    $entriesLi.appendChild(entryDom);
  }
}

function renderEntry(entry) {
  var $divDom = document.createElement('div');

  var $imgDom = document.createElement('img');
  $imgDom.setAttribute('src', entry.url);
  $imgDom.setAttribute('class', 'image-dom');

  var $h2Dom = document.createElement('h2');
  $h2Dom.setAttribute('class', 'h2-dom');
  $h2Dom.textContent = entry.title;

  var $pDom = document.createElement('p');
  $pDom.setAttribute('class', 'p-dom');
  $pDom.textContent = entry.notes;

  $divDom.append($imgDom, $h2Dom, $pDom);

  return $divDom;
}
