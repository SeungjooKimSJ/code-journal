/* global data */
/* exported data */

var $placeholderImage = document.querySelector('#placeholder-image');
// var $photoUrl = document.querySelector('.url');
var $formNewEntry = document.querySelector('.form-row');

var $entryTitle = document.querySelector('#entry-title');
var $entryUrl = document.querySelector('#entry-url');
var $entryNotes = document.querySelector('#entry-notes');

var $navEntries = document.querySelector('.nav-entries');
var $mainContainer = document.querySelector('.main-container');
var $entriesContainer = document.querySelector('.entries-container');
var $entriesP = document.querySelector('.entries-p');
var $entriesUl = document.querySelector('.entries-ul');
// var $entriesLi = document.querySelector('.entries-li');
var $entriesNewBtn = document.querySelector('.entries-new-btn');

$entryUrl.addEventListener('input', imgInputHandler);
$formNewEntry.addEventListener('submit', submitFormHandler);
// $formNewEntry.addEventListener('submit', submitNewEntryForm);

// $navEntries.addEventListener('click', clickNavAndBtnHandler);
// $entriesNewBtn.addEventListener('click', clickNavAndBtnHandler);
$navEntries.addEventListener('click', viewEntries);
$entriesNewBtn.addEventListener('click', viewEntryForm);
$entriesUl.addEventListener('click', editEntry);

var view = data.view;

if (view === 'entries') {
  // $mainContainer.className = 'main-container hidden';
  // $entriesP.className = 'entries-p hidden';

  // $entriesContainer.className = 'entries-container';
  // $entriesUl.className = 'entries-ul';
  viewEntries();
} else if (view === 'entry-form') {
  // $mainContainer.className = 'main-container';

  // $entriesContainer.className = 'entries-container hidden';
  viewEntryForm();
}

// function imgInputHandler(event) {
//   var photoUrl = event.target.value;
//   $placeholderImage.setAttribute('src', photoUrl);
// }

function imgInputHandler(event) {
  $placeholderImage.setAttribute('src', $entryUrl.value);
}

// function submitNewEntryForm(event) {
//   event.preventDefault();

//   var newEntryData = {
//     title: $formNewEntry.elements.title.value,
//     url: $formNewEntry.elements.url.value,
//     notes: $formNewEntry.elements.notes.value
//   };

//   var dataNextId = data.nextEntryId;
//   newEntryData.nextEntryId = dataNextId;

//   data.nextEntryId++;

//   data.entries.unshift(newEntryData);

//   $placeholderImage.setAttribute('src', './images/placeholder-image-square.jpg');

//   $mainContainer.className = 'main-container hidden';
//   $entriesP.className = 'entries-p hidden';

//   $entriesContainer.className = 'entries-container';
//   $entriesUl.className = 'entries-ul';

//   $entriesLi.prepend(renderEntry(newEntryData));

//   data.view = 'entries';

//   $formNewEntry.reset();
// }

function submitFormHandler(event) {
  event.preventDefault();

  if (data.editing === null) {
    var entryObj = {};
    entryObj.entryId = data.nextEntryId;
  } else {
    var entryLiElement = data.editing;
    entryObj = getEntryObj(entryLiElement);
  }
  entryObj.title = $formNewEntry.elements.title.value;
  entryObj.url = $formNewEntry.elements.url.value;
  entryObj.notes = $formNewEntry.elements.notes.value;
  $placeholderImage.setAttribute('src', './images/placeholder-image-square.jpg');

  var renderIt = renderEntry(entryObj);

  if (data.editing === null) {
    // $entriesLi.prepend(renderIt);
    $entriesUl.prepend(renderIt);
    data.entries.unshift(entryObj);
    data.nextEntryId++;
  } else {
    entryLiElement.replaceWith(renderIt);
  }
  viewEntries();
  $formNewEntry.reset();
}

function renderEntry(entry) {
  var $entryList = document.createElement('li');
  $entryList.className = 'entries-li';

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'div-row');

  var $columnImgDom = document.createElement('div');
  $columnImgDom.setAttribute('class', 'column-image-dom');

  var $imgDom = document.createElement('img');
  $imgDom.setAttribute('src', entry.url);
  $imgDom.setAttribute('class', 'image-dom');

  var $columnDom = document.createElement('div');
  $columnDom.setAttribute('class', 'column-dom');

  var $h2AndIconDom = document.createElement('div');
  $h2AndIconDom.setAttribute('class', 'h2-and-icon-dom');

  var $h2Dom = document.createElement('h2');
  $h2Dom.setAttribute('class', 'h2-dom');
  $h2Dom.textContent = entry.title;

  var $editIconDom = document.createElement('i');
  $editIconDom.setAttribute('class', 'fas fa-pen');

  var $pDom = document.createElement('p');
  $pDom.setAttribute('class', 'p-dom');
  $pDom.textContent = entry.notes;

  $columnImgDom.appendChild($imgDom);
  $columnDom.append($h2AndIconDom, $pDom);
  $h2AndIconDom.append($h2Dom, $editIconDom);
  $divRow.append($columnImgDom, $columnDom);
  $entryList.appendChild($divRow);

  $entryList.setAttribute('data-entry-id', entry.entryId);
  return $entryList;
}

// function clickNavAndBtnHandler(event) {
//   var dataView = event.target.getAttribute('data-view');

//   if (dataView === 'entries') {
//     $mainContainer.className = 'main-container hidden';
//     $entriesP.className = 'entries-p hidden';

//     $entriesContainer.className = 'entries-container';
//     $entriesUl.className = 'entries-ul';

//     data.view = 'entries';
//   } else if (dataView === 'entry-form') {
//     $mainContainer.className = 'main-container';

//     $entriesContainer.className = 'entries-container hidden';

//     data.view = 'entry-form';
//   }
// }

function viewEntries(event) {
  $mainContainer.className = 'main-container hidden';
  $entriesP.className = 'entries-p hidden';

  $entriesContainer.className = 'entries-container';
  $entriesUl.className = 'entries-ul';

  data.view = 'entries';
}

function viewEntryForm(event) {
  $mainContainer.className = 'main-container';

  $entriesContainer.className = 'entries-container hidden';

  data.view = 'entry-form';
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entryDom = renderEntry(data.entries[i]);

    // $entriesLi.appendChild(entryDom);
    $entriesUl.appendChild(entryDom);
  }
});

// function editEntry(event) {
//   if (event.target.matches('i')) {
//     var entryLiElement = event.target.closest('li');
//     data.editing = entryLiElement;

//     var entryId = parseInt(entryLiElement.getAttribute('data-entry-id'));

//     for (var i = 0; i < data.entries.length; i++) {
//       if (data.entries[i].nextEntryId === entryId) {
//         var currentEntry = data.entries[i];

//         return currentEntry;
//       }
//     }
//     viewEntryForm();

//     $formNewEntry.elements.title.value = data.editing.title;
//     $formNewEntry.elements.url.value = data.editing.url;
//     // $placeholderImage.setAttribute('src', data.editing.event.target.value);
//     $formNewEntry.elements.notes.value = data.editing.notes;
//     imgInputHandler();
//   }
// }

function editEntry(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  // if (event.target.matches('i')) {
  viewEntryForm();

  var entryLiElement = event.target.closest('li');
  data.editing = entryLiElement;
  var entryObj = getEntryObj(entryLiElement);

  $entryTitle.value = entryObj.title;
  $entryUrl.value = entryObj.url;
  $placeholderImage.setAttribute('src', entryObj.$entryUrl);
  $entryNotes.value = entryObj.notes;
  // }
}

function getEntryObj(entryLiElement) {
  var entryId = parseInt(entryLiElement.getAttribute('data-entry-id'));

  for (var i = 0; i < data.entries.length; i++) {
    if (entryId === data.entries[i].entryId) {
      var entryObj = data.entries[i];

      return entryObj;
    }
  }
}
