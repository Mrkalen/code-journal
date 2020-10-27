var $userInput = document.querySelector('#avatar')
console.log('text content', $userInput);

var $avatar = document.querySelector('img');
console.log('img queried', $avatar);

var url = $userInput.textContent;
console.log('text input', url);

$userInput.addEventListener('input', function (event) {
 var url =  event.target.value;
 console.log(url);
  $avatar.setAttribute('src', url);
});


$userInput.addEventListener('input', function handleInput(event) {
  console.log('value of ' + event.target.name + ': ' + event.target.value);
});
