// edit-profile

var $userInput = document.querySelector('#avatar');

var $avatar = document.querySelector('.avatar-container');

$userInput.addEventListener('input', function (event) {
  var url = event.target.value;
  $avatar.setAttribute('src', url);
});

var $profile = document.querySelector('#profile-form');

$profile.addEventListener('submit', function (event) {
  event.preventDefault();
  data.profile.avatarUrl = $profile.elements.avatarUrl.value;
  data.profile.username = $profile.elements.username.value;
  data.profile.fullName = $profile.elements.fullName.value;
  data.profile.location = $profile.elements.location.value;
  data.profile.bio = $profile.elements.bio.value;
  data.view = 'profile';
  viewSwapping(data.view);

  $profile.reset();
  $avatar.setAttribute('src', 'images/placeholder-image-square.jpg');

});

// profile-view DOM creation

function renderProfile(data) {

  var newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'profile-container');

  var newh1 = document.createElement('h1');
  newh1.setAttribute('id', 'user-fullName');
  newh1.textContent = data.profile.fullName;
  newDiv.appendChild(newh1);

  var newRow = document.createElement('div');
  newRow.setAttribute('class', 'row');
  newDiv.appendChild(newRow);

  var newCol = document.createElement('div');
  newCol.setAttribute('class', 'col-half');
  newRow.appendChild(newCol);

  var newImg = document.createElement('img');
  newImg.setAttribute('class', 'avatar-container');
  newImg.setAttribute('src', data.profile.avatarUrl);
  newCol.appendChild(newImg);

  var newCol2 = document.createElement('div');
  newCol2.setAttribute('class', 'col-half');
  newRow.appendChild(newCol2);

  var newInfo = document.createElement('div');
  newInfo.setAttribute('class', 'user-info');
  newCol2.appendChild(newInfo);

  var newIcon1 = document.createElement('i');
  newIcon1.setAttribute('class', 'fas fa-user icon');
  newInfo.appendChild(newIcon1);

  var newPusername = document.createElement('p');
  newPusername.setAttribute('id', 'user-username');
  newPusername.textContent = data.profile.username;
  newInfo.appendChild(newPusername);

  var newInfo2 = document.createElement('div');
  newInfo2.setAttribute('class', 'user-info');
  newCol2.appendChild(newInfo2);

  var newIcon2 = document.createElement('i');
  newIcon2.setAttribute('class', 'fas fa-location-arrow icon');
  newInfo2.appendChild(newIcon2);

  var newPLocation = document.createElement('p');
  newPLocation.setAttribute('id', 'user-location');
  newPLocation.textContent = data.profile.location;
  newInfo2.appendChild(newPLocation);

  var newRow2 = document.createElement('div');
  newRow2.setAttribute('class', 'row');
  newDiv.appendChild(newRow2);

  var newBio = document.createElement('div');
  newBio.setAttribute('class', 'bio-container');
  newRow2.appendChild(newBio);

  var newPBio = document.createElement('p');
  newPBio.setAttribute('id', 'user-bio');
  newPBio.textContent = data.profile.bio;
  newBio.appendChild(newPBio);

  var link = document.createElement('a');
  link.setAttribute('href', '#');
  link.setAttribute('data-view', 'edit-profile');
  link.textContent = 'Edit Profile';
  newDiv.appendChild(link);

  return newDiv;
}

// viewSwapping function

var $editView = document.querySelector('.edit-profile');

var $profileView = document.querySelector('.profile');

var $entriesView = document.querySelector('.entries-container');

var $entryView = document.querySelector('.create-entry');

function viewSwapping(dataView) {
  if (dataView === 'profile') {
    $profileView.setAttribute('class', 'profile');
    $editView.setAttribute('class', 'edit-profile hidden');
    $entriesView.setAttribute('class', 'entries-container hidden');
    $entryView.setAttribute('class', 'create-entry hidden');

    if (dataView === 'profile') {
      while ($profileView.firstChild) {
        $profileView.removeChild($profileView.firstChild);
      }
      $profileView.appendChild(renderProfile(data));
    }

  } else if (dataView === 'edit-profile') {
    $editView.setAttribute('class', 'edit-profile');
    $profileView.setAttribute('class', 'profile hidden');
    $entriesView.setAttribute('class', 'entries-container hidden');
    $entryView.setAttribute('class', 'create-entry hidden');

    $profile.elements.avatarUrl.value = data.profile.avatarUrl;
    $profile.elements.username.value = data.profile.username;
    $profile.elements.fullName.value = data.profile.fullName;
    $profile.elements.location.value = data.profile.location;
    $profile.elements.bio.value = data.profile.bio;
    $avatar.setAttribute('src', data.profile.avatarUrl);
  } else if (dataView === 'entries') {
    $entriesView.setAttribute('class', 'entries-container');
    $profileView.setAttribute('class', 'profile hidden');
    $editView.setAttribute('class', 'edit-profile hidden');
    $entryView.setAttribute('class', 'create-entry hidden');
  } else if (dataView === 'create-entry') {
    $entryView.setAttribute('class', 'create-entry');
    $profileView.setAttribute('class', 'profile hidden');
    $editView.setAttribute('class', 'edit-profile hidden');
    $entriesView.setAttribute('class', 'entries-container hidden');
  }

}

// listen for DOMContentLoaded

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.profile.username === '') {
    viewSwapping('edit-profile');
  } else {
    viewSwapping(data.view);
  }

});

// listen for link

document.addEventListener('click', function (event) {

  if (event.target.tagName !== 'A') {
    return;
  }
  if (data.profile.username === '') {
    viewSwapping('edit-profile');
    data.view = 'edit-profile';
  } else {
    data.view = event.target.getAttribute('data-view');
    viewSwapping(data.view);
  }
});

// entries

var $newEntryPhoto = document.querySelector('#photoUrl');

var $photoPreview = document.querySelector('.entry-photo');

$newEntryPhoto.addEventListener('input', function (event) {
  var url = event.target.value;
  $photoPreview.setAttribute('src', url);
});

var $entryForm = document.querySelector('#entry-form');

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var entry = {};
  entry.photoUrl = $entryForm.elements.photoUrl.value;
  entry.title = $entryForm.elements.title.value;
  entry.notes = $entryForm.elements.notes.value;
  data.entries.unshift(entry);

  data.view = 'entries';
  viewSwapping(data.view);

  $entryList.prepend(renderEntries(entry));

  $entryForm.reset();
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');

});

window.addEventListener('beforeunload', function (event) {
  var profileData = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', profileData);
});

var savedProfile = localStorage.getItem('javascript-local-storage');
if (savedProfile !== null) {
  data = JSON.parse(savedProfile);
}

// render entries
var $entryList = document.querySelector('.entries');

function renderEntries(dataEntry) {

  var entryDiv = document.createElement('div');
  entryDiv.setAttribute('class', 'entry-body');

  var entryOl = document.createElement('ol');
  entryOl.setAttribute('class', 'entry-list');
  entryDiv.appendChild(entryOl);

  var entryLi = document.createElement('li');
  entryLi.setAttribute('class', 'entry');
  entryOl.appendChild(entryLi);

  var entryImg = document.createElement('img');
  entryImg.setAttribute('src', dataEntry.photoUrl);
  entryLi.appendChild(entryImg);

  var entryNoteDiv = document.createElement('div');
  entryLi.appendChild(entryNoteDiv);

  var entryTitleH2 = document.createElement('h2');
  entryTitleH2.textContent = dataEntry.title;
  entryNoteDiv.appendChild(entryTitleH2);

  var entryNotesP = document.createElement('p');
  entryNotesP.setAttribute('class', 'notes');
  entryNotesP.textContent = dataEntry.notes;
  entryNoteDiv.appendChild(entryNotesP);

  return entryDiv;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntries(data.entries[i]));
  }
});
