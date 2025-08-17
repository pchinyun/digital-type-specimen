
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

  