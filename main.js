
  const slider = document.getElementById('styleSlider');
  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');

  slider.addEventListener('input', () => {
    let value = slider.value;

    if (value <= 50) {
      // Blend between img1 and img2
      let t = value / 50; // 0 → 1
      img1.style.opacity = 1 - t;
      img2.style.opacity = t;
      img3.style.opacity = 0;
    } else {
      // Blend between img2 and img3
      let t = (value - 50) / 50; // 0 → 1
      img1.style.opacity = 0;
      img2.style.opacity = 1 - t;
      img3.style.opacity = t;
    }
  });

  // initialize
  slider.dispatchEvent(new Event('input'));

  
  const images = document.querySelectorAll('.imageContainer img');
const videos = document.querySelectorAll('.videoContainer video');

images.forEach(img => {
  img.addEventListener('mouseenter', () => {
    const index = img.getAttribute('data-index');

    // Hide + pause all videos
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
      video.style.display = 'none';
    });

    // Show + play the corresponding one
    const video = videos[index];
    video.style.display = 'block';
    video.play();
  });

  img.addEventListener('mouseleave', () => {
    const index = img.getAttribute('data-index');
    const video = videos[index];
    video.pause();
    video.currentTime = 0;
    video.style.display = 'none';
  });
});

// Scroll-to-Top Pixel Button
const scrollTopBtn = document.getElementById('scrollTopBtn');
const footerLink = document.querySelector('.footer-link');

window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
});

// Smooth scroll on button click
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scroll for footer "Back to Top" link
footerLink.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
