const emailDiv = document.getElementById('email');
const hardwareDivContent = document.getElementById('hardwareContent');

emailDiv.addEventListener('click', () => {
  navigator.clipboard.writeText('tintin6892@gmail.com');
  hardwareDivContent.innerHTML = 'Email Copied to Clipboard!';
  openHardware();
});
