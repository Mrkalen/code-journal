var $userInput = document.querySelector('#avatar')
console.log('text content', $userInput);

var $avatar = document.querySelector('img');
console.log('img queried', $avatar);

var url = $userInput.textContent;
console.log('text input', url);

$userInput.addEventListener('blur', function (event) {
 var url =  $userInput.textContent;
  $avatar.setAttribute('src', url);
});
