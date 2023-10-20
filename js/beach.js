const datas = [
  {
    date: '20 - 24 December - 4 Day 3 Night',
    title: 'Bali and Lombok Tour',
    content:
      '  Amazing package for you and your friend to be satisfied on vacation in Bali - Lombok for...',
  },
  {
    date: '20 - 24 December - 4 Day 3 Night',
    title: 'Bali and Lombok Tour',
    content:
      '  Amazing package for you and your friend to be satisfied on vacation in Bali - Lombok for...',
  },
  {
    date: '20 - 24 December - 4 Day 3 Night',
    title: 'Bali and Lombok Tour',
    content:
      '  Amazing package for you and your friend to be satisfied on vacation in Bali - Lombok for...',
  },
  {
    date: '20 - 24 December - 4 Day 3 Night',
    title: 'Bali and Lombok Tour',
    content:
      '  Amazing package for you and your friend to be satisfied on vacation in Bali - Lombok for...',
  },
  {
    date: '20 - 24 December - 4 Day 3 Night',
    title: 'Bali and Lombok Tour',
    content:
      '  Amazing package for you and your friend to be satisfied on vacation in Bali - Lombok for...',
  },
  {
    date: '20 - 24 December - 4 Day 3 Night',
    title: 'Bali and Lombok Tour',
    content:
      '  Amazing package for you and your friend to be satisfied on vacation in Bali - Lombok for...',
  },
];

const left = document.getElementById('beach-list-left');

const lastSection = document.getElementById('last-section');
const beachRouteDiv = document.getElementById('beachRoot');
const toBeFixed = document.getElementsByClassName('to-be-fixed');

datas.forEach((data) => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('d-flex', 'flex-column', 'gap-3');
  newDiv.innerHTML = `
  <div class="date">
    ${data.date}
    </div>
    <div class="title">
    ${data.title}
  </div>
  <div class="content">
    ${data.content}
    </div>
  <hr class="h-full bg-dark"/>
  `;
  beachRouteDiv.appendChild(newDiv);
});

window.onscroll = () => {
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const contentHeight = left.getBoundingClientRect().height;
  const contentTop = left.getBoundingClientRect().top + window.pageYOffset;
  // if (scrollTop >= contentHeight - viewportHeight + contentTop) {
  //   console.log('melebihi');
  // }
  const gone =
    lastSection.getBoundingClientRect().top -
    lastSection.getBoundingClientRect().height;
  if (scrollTop >= viewportHeight * 2 + 20 && gone > 0) {
    for (let i = 0; i < toBeFixed.length; i++) {
      toBeFixed[i].style.position = 'fixed';
    }
  } else {
    for (let i = 0; i < toBeFixed.length; i++) {
      toBeFixed[i].style.position = '';
    }
  }
  // const contentHeight =
};
