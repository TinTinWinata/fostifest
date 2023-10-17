const barDiv = document.getElementById('bar');
const second = 8;

const triggerLoading = () => {
  onLoading();
  setTimeout(() => {
    finishLoading();
  }, second * 1000);
};

const onLoading = () => {
  console.log('on loading ...');
  barDiv.style.width = '100%';
  barDiv.style.transition = `all ${second}s ease`;
};

const finishLoading = () => {
  barDiv.style.width = '0%';
  barDiv.style.transition = 'all 2s ease';
};

triggerLoading();
setInterval(() => {
  triggerLoading();
}, 7000);

// window.addEventListener('mousedown', () => {
//   barDiv.style.width = '100%';
//   barDiv.style.transition = 'all 5s ease';
// });

// window.addEventListener('mouseup', () => {
//   barDiv.style.width = '0%';
//   barDiv.style.transition = 'all 2s ease';
// });
