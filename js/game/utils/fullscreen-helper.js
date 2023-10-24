// Function to request fullscreen mode for a specified element.
export const fullscreenElement = (elem) => {
  if (elem.requestFullscreen) {
    // Standard method for modern browsers.
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    // Safari-specific method.
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    // Internet Explorer 11-specific method.
    elem.msRequestFullscreen();
  }
};

// Function to exit fullscreen mode.
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    // Standard method for modern browsers.
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    // Safari-specific method.
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    // Internet Explorer 11-specific method.
    document.msExitFullscreen();
  }
};
