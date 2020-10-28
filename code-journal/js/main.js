// edit-profile

var $userInput = document.querySelector('#avatar')

var $avatar = document.querySelector('img');

$userInput.addEventListener('input', function (event) {
 var url =  event.target.value;
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

  $profile.reset();
  $avatar.setAttribute('src', "images/placeholder-image-square.jpg");
});

var savedProfile = localStorage.getItem('javascript-local-storage')
if (savedProfile !== null) {
  data = JSON.parse(savedProfile);
}

window.addEventListener('beforeunload', function (event) {
  var profileData = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', profileData);
})

// profile-view

document.addEventListener('DOMContentLoaded', function(event) {
  var dataFromLocal = localStorage.getItem('javascript-local-storage')
  data = JSON.parse(dataFromLocal);
})

var $profileContainer = document.querySelector('.profile-container');

function renderProfile(data) {
  var newh1 = document.createElement('h1')
  newh1.setAttribute('id', 'user-fullName');
  newh1.textContent = data.profile.fullName;

  var newRow = document.createElement('div')
  newRow.setAttribute('class', 'row');
  newh1.appendChild(newRow);

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
  newRow.appendChild(newInfo);

  var newIcon1 = document.createElement('img');
  newIcon1.setAttribute('class', 'icon');
  newIcon1.setAttribute('src', 'images/user icon.png');
  newInfo.appendChild(newIcon1);

  var newPusername = document.createElement('p');
  newPusername.setAttribute('id', 'user-username');
  newPusername.textContent = data.profile.username
  newInfo.appendChild(newPusername);

  newCol.appendChild(newInfo);

  var newIcon2 = document.createElement('img');
  newIcon2.setAttribute('class', 'icon');
  newIcon2.setAttribute('src', 'images/location icon.png');
  newInfo.appendChild(newIcon2);

  var newPLocation = document.createElement('p');
  newPLocation.setAttribute('id', 'user-location');
  newPLocation.textContent = data.profile.location;
  newInfo.appendChild(newPLocation);

  newh1.appendChild(newRow);

  var newBio = document.createElement('div');
  newBio.setAttribute('class', 'bio-container');
  newRow.appendChild(newBio);

  var newPBio = document.createElement('p');
  newPBio.setAttribute('id', 'user-bio');
  newPBio.textContent = data.profile.bio;
  newBio.appendChild(newPBio);

  return newh1;
}
