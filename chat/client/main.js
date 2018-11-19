document.onload = () => alert('inserted!');

alert('inserted any way!');

fetch('https://ad68d9ca.ngrok.io/').then(data => console.log(data))
  .catch(error => console.error(error)); 