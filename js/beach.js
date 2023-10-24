// The code dynamically generates a list of beach-related information based on the data in `datas`.

// An array of data representing different beach-related information.
const datas = [
  {
    date: 'Pantai Tropis Terindah',
    title: 'Pantai Kuta Bali',
    content:
      'Pantai Kuta adalah salah satu destinasi wisata pantai paling populer di Bali. Dengan pasir putih yang lembut, ombak yang cocok untuk selancar, dan matahari terbenam yang mempesona, Pantai Kuta menawarkan pengalaman liburan yang tak terlupakan. Berbagai fasilitas, seperti restoran, kafe, dan toko suvenir, tersedia di sepanjang pantai, menjadikannya destinasi yang sempurna bagi seluruh keluarga.',
    img: '/assets/beach.jpg',
  },
  {
    date: 'Keajaiban Alam Bawah Laut',
    title: 'Taman Nasional Bunaken',
    content:
      'Taman Nasional Bunaken adalah surga bagi penyelam dan pecinta snorkeling. Terletak di Sulawesi Utara, taman nasional ini menawarkan keanekaragaman biota laut yang luar biasa dengan lebih dari 390 jenis koral dan berbagai jenis ikan tropis. Kejernihan airnya yang memukau memungkinkan wisatawan untuk menyaksikan keindahan bawah laut dengan jelas.',
    img: '/assets/taman-nasional-bunaken.jpg',
  },
  {
    date: 'Budaya dan Sejarah Kuno',
    title: 'Candi Borobudur Jawa Tengah',
    content:
      'Candi Borobudur adalah monumen Buddha terbesar di dunia dan salah satu keajaiban dunia dari Indonesia. Terletak di Jawa Tengah, candi ini dibangun pada abad ke-9 dan menampilkan relief yang menggambarkan ajaran Buddha. Keindahan arsitektur dan nilai historisnya menjadikan Borobudur sebagai destinasi wisata yang wajib dikunjungi.',
    img: '/assets/candi-borobudur.jpg',
  },
  {
    date: 'Petualangan Alam Liar',
    title: 'Taman Nasional Komodo',
    content:
      'Taman Nasional Komodo adalah rumah bagi hewan purba, Komodo. Terletak di Nusa Tenggara Timur, taman nasional ini menawarkan pengalaman petualangan yang unik di antara pulau-pulau indah dan pantai berpasir merah. Selain Komodo, wisatawan juga bisa menyaksikan keanekaragaman fauna lainnya dan menikmati snorkeling di perairan yang jernih.',
    img: '/assets/taman-nasional-komodo.jpg',
  },
  {
    date: 'Pesona Budaya Bali',
    title: 'Pura Uluwatu Bali',
    content:
      'Pura Uluwatu adalah salah satu pura laut yang paling terkenal di Bali. Terletak di atas tebing dengan pemandangan Samudra Hindia yang menakjubkan, Pura Uluwatu adalah tempat yang sempurna untuk menyaksikan matahari terbenam. Selain itu, wisatawan juga bisa menyaksikan pertunjukan tari Kecak yang menampilkan cerita epik Ramayana di malam hari.',
    img: '/assets/uluwatu.jpg',
  },
];

// Get references to HTML elements by their IDs.
const left = document.getElementById('beach-list-left');

const lastSection = document.getElementById('last-section');
const beachRouteDiv = document.getElementById('beachRoot');
const toBeFixed = document.getElementsByClassName('to-be-fixed');

// Iterate through the `datas` array to create HTML elements and append them to `beachRouteDiv`.
datas.forEach((data) => {
  // Create a new <div> element with specific classes and inner HTML based on the data.
  const newDiv = document.createElement('div');
  newDiv.classList.add('d-flex', 'flex-column', 'gap-3');
  newDiv.innerHTML = `
  <div class="beach-list-container">
    <div class="date">
    ${data.date}
    </div>
    <div class="title">
    ${data.title}
    </div>
    <img src="${data.img}"/>
    <div class="content">
    ${data.content}
    </div>
  </div>
  `;

  // Append the newly created <div> to the `beachRouteDiv`.
  beachRouteDiv.appendChild(newDiv);
});
