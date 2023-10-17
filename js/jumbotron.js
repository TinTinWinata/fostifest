const barDiv = document.getElementById('bar');

window.addEventListener('mousedown', () => {
  barDiv.style.width = '100%';
  barDiv.style.transition = 'all 5s ease';
});

window.addEventListener('mouseup', () => {
  barDiv.style.width = '0%';
  barDiv.style.transition = 'all 2s ease';
});
