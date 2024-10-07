// const toggleButton = document.getElementById('navbar-toggle');
// const navLinks = document.getElementById('nav-links');

// toggleButton.addEventListener('click', () => {
//   navLinks.classList.toggle('show');
// });
const navbarToggle = document.getElementById('navbar-toggle');
const navLinks = document.getElementById('nav-links');
const barsIcon = navbarToggle.querySelector('.fa-bars');
const crossIcon = navbarToggle.querySelector('.fa-xmark');

navbarToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active'); // Toggles the visibility of nav links
  barsIcon.style.display = barsIcon.style.display === 'none' ? 'inline' : 'none';
  crossIcon.style.display = crossIcon.style.display === 'none' ? 'inline' : 'none';
});



// Typing effect function
function autoTypeAndDelete(elementId, text, typingDelay, deletingDelay, pauseDelay) {
    const element = document.getElementById(elementId); 
    let currentIndex = 0; 
    let isDeleting = false; 
  
    function type() {
        if (!isDeleting) {
            element.textContent += text[currentIndex];
            currentIndex++;
    
            if (currentIndex === text.length) {
                isDeleting = true;
                setTimeout(type, pauseDelay);
            } else {
                setTimeout(type, typingDelay);
            }
        } else {
            element.textContent = element.textContent.slice(0, -1);
            currentIndex--;
    
            if (currentIndex === 0) {
                isDeleting = false;
                setTimeout(type, pauseDelay);
            } else {
                setTimeout(type, deletingDelay);
            }
        }
    }
    type();
}
document.addEventListener("DOMContentLoaded", function() {
    autoTypeAndDelete("developer-text", "Software Developer", 150, 100, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const wrapper = document.querySelector(".wrapper");
  
    const firstCard = carousel.querySelector(".card");
    const firstCardWidth = firstCard.offsetWidth;
  
    let isDragging = false,
      startX,
      startScrollLeft,
      timeoutId;
  
    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX || e.touches[0].pageX; 
      startScrollLeft = carousel.scrollLeft;
    };
  
    const dragging = (e) => {
      if (!isDragging) return;
  
      const x = e.pageX || e.touches[0].pageX; 
      const newScrollLeft = startScrollLeft - (x - startX);
  
      if (newScrollLeft <= 0 || newScrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {
        isDragging = false;
        return;
      }
  
      carousel.scrollLeft = newScrollLeft;
    };
  
    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };
  
    const autoPlay = () => {
      if (window.innerWidth < 800) return;
  
      const totalCardWidth = carousel.scrollWidth;
      const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
  
      if (carousel.scrollLeft >= maxScrollLeft) {
        carousel.scrollLeft = 0; 
      }
  
    
      timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 500);
    };
  
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
  
  
    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("touchmove", dragging);
    carousel.addEventListener("touchend", dragStop);
  
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
  
    arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
      });
    });
  
    autoPlay();
  });
  