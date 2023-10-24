function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth', // Smooth scrolling behavior
      block: 'start', // Scroll to the top of the section
      inline: 'nearest', // Scroll to the nearest edge of the section
    });
  }
}
