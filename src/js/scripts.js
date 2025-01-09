document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    const totalItems = 8;  // Total number of images
    let currentIndex = 0;
    const intervalTime = 5000; // 5 seconds
  
    // Function to update the carousel
    const updateCarousel = () => {
      const itemsPerSlide = window.innerWidth <= 768 ? 1 : 2;  // 1 for mobile, 2 for desktop
  
      // Calculate the offset to move the carousel by the appropriate number of images
      const offset = currentIndex * -100 / itemsPerSlide; 
      track.style.transform = `translateX(${offset}%)`;
  
      // Update active dot
      dots.forEach(dot => dot.classList.remove('active'));
      dots[Math.floor(currentIndex / itemsPerSlide)].classList.add('active');
    };
  
    // Move to the next slide
    const nextSlide = () => {
      const itemsPerSlide = window.innerWidth <= 768 ? 1 : 2;
      currentIndex = (currentIndex + itemsPerSlide) % totalItems;  // Ensure we wrap around
      updateCarousel();
    };
  
    let slideInterval = setInterval(nextSlide, intervalTime);
  
    // Dot click listener to navigate to a specific index
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        currentIndex = parseInt(dot.getAttribute('data-index')) * (window.innerWidth <= 768 ? 1 : 2); 
        updateCarousel();
        slideInterval = setInterval(nextSlide, intervalTime);
      });
    });
  
    // Update the number of visible dots based on screen size
    const updateDotsVisibility = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        // For mobile, show 8 dots for 8 images
        dots.forEach((dot, index) => {
          dot.style.display = index < 8 ? 'inline-block' : 'none';
        });
      } else {
        // For desktop, show 4 dots for 8 images (each dot represents 2 images)
        dots.forEach((dot, index) => {
          dot.style.display = index < 4 ? 'inline-block' : 'none';
        });
      }
    };
  
    // Initial setup
    updateCarousel();
    updateDotsVisibility();
  
    // Recalculate on window resize
    window.addEventListener('resize', () => {
      updateCarousel();
      updateDotsVisibility();
    });
  });
  