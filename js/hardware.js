const hardwareDiv = document.getElementById('hardware');
const okayBtn = document.getElementById('okayBtn');

const closeHardware = () => {
  hardwareDiv.style.top = '-100px';
};
const openHardware = () => {
  hardwareDiv.style.top = 0;
  setTimeout(closeHardware, 3000);
};

setTimeout(openHardware, 300);

okayBtn.addEventListener('click', closeHardware);
