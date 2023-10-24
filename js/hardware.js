// This code to make an top hardware accerlaration notification animaton

// Get div from both hardware and okay btn
const hardwareDiv = document.getElementById('hardware');
const okayBtn = document.getElementById('okayBtn');

const closeHardware = () => {
  hardwareDiv.style.top = '-100px';
};

const openHardware = () => {
  hardwareDiv.style.top = 0;
  // If already 3 seconds when opening close the hardware notification
  setTimeout(closeHardware, 3000);
};

// When user first time open the website open the hardware
setTimeout(openHardware, 300);
okayBtn.addEventListener('click', closeHardware);
