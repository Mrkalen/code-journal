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

// var $userAvatar = document.querySelector('.avatar-container');
// var $userFullName = document.querySelector('#user-fullName');
// var $userLocation = document.querySelector('#user-location');
// var $userBio = document.querySelector('#user-bio');

// $userAvatar.setAttribute('src', data.profile.avatarUrl.value);
// $userFullName.textContent = data.profile.fullName.value;
