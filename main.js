const toggleButton = document.getElementById('navbar-toggle');
const navLinks = document.getElementById('nav-links');

toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('show');
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

// const cardsContainer = document.querySelector(".card-carousel");
// const cardsController = document.querySelector(".card-carousel + .card-controller");

// class DraggingEvent {
//     constructor(target = undefined) {
//         this.target = target;
//     }

//     event(callback) {
//         let handler;

//         this.target.addEventListener("mousedown", (e) => {
//             e.preventDefault();

//             handler = callback(e);

//             window.addEventListener("mousemove", handler);

//             document.addEventListener("mouseleave", clearDraggingEvent);

//             window.addEventListener("mouseup", clearDraggingEvent);

//             function clearDraggingEvent() {
//                 window.removeEventListener("mousemove", handler);
//                 window.removeEventListener("mouseup", clearDraggingEvent);

//                 document.removeEventListener("mouseleave", clearDraggingEvent);

//                 handler(null);
//             }
//         });

//         this.target.addEventListener("touchstart", (e) => {
//             handler = callback(e);

//             window.addEventListener("touchmove", handler);

//             window.addEventListener("touchend", clearDraggingEvent);

//             document.body.addEventListener("mouseleave", clearDraggingEvent);

//             function clearDraggingEvent() {
//                 window.removeEventListener("touchmove", handler);
//                 window.removeEventListener("touchend", clearDraggingEvent);

//                 handler(null);
//             }
//         });
//     }
//     getDistance(callback) {
//         function distanceInit(e1) {
//             let startingX, startingY;

//             if ("touches" in e1) {
//                 startingX = e1.touches[0].clientX;
//                 startingY = e1.touches[0].clientY;
//             } else {
//                 startingX = e1.clientX;
//                 startingY = e1.clientY;
//             }

//             return function (e2) {
//                 if (e2 === null) {
//                     return callback(null);
//                 } else {
//                     if ("touches" in e2) {
//                         return callback({
//                             x: e2.touches[0].clientX - startingX,
//                             y: e2.touches[0].clientY - startingY,
//                         });
//                     } else {
//                         return callback({
//                             x: e2.clientX - startingX,
//                             y: e2.clientY - startingY,
//                         });
//                     }
//                 }
//             };
//         }

//         this.event(distanceInit);
//     }
// }

// class CardCarousel extends DraggingEvent {
//     constructor(container, controller = undefined) {
//         super(container);
//         this.container = container;
//         this.controllerElement = controller;
//         this.cards = container.querySelectorAll(".card");
//         this.centerIndex = (this.cards.length - 1) / 2;
//         this.cardWidth = (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;
//         this.xScale = {};
//         window.addEventListener("resize", this.updateCardWidth.bind(this));

//         if (this.controllerElement) {
//             this.controllerElement.addEventListener("keydown", this.controller.bind(this));
//         }
//         this.build();
//         super.getDistance(this.moveCards.bind(this));
//         this.startAutoSlide();
//     }

//     updateCardWidth() {
//         this.cardWidth = (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;

//         this.build();
//     }

//     build(fix = 0) {
//         for (let i = 0; i < this.cards.length; i++) {
//             const x = i - this.centerIndex;
//             const scale = this.calcScale(x);
//             const scale2 = this.calcScale2(x);
//             const zIndex = -Math.abs(i - this.centerIndex);

//             const leftPos = this.calcPos(x, scale2);

//             this.xScale[x] = this.cards[i];

//             this.updateCards(this.cards[i], {
//                 x: x,
//                 scale: scale,
//                 leftPos: leftPos,
//                 zIndex: zIndex,
//             });
//         }
//     }

//     controller(e) {
//         const temp = { ...this.xScale };

//         if (e.keyCode === 39) {
//             // Left arrow
//             for (let x in this.xScale) {
//                 const newX = parseInt(x) - 1 < -this.centerIndex ? this.centerIndex : parseInt(x) - 1;

//                 temp[newX] = this.xScale[x];
//             }
//         }

//         if (e.keyCode == 37) {
//             for (let x in this.xScale) {
//                 const newX = parseInt(x) + 1 > this.centerIndex ? -this.centerIndex : parseInt(x) + 1;

//                 temp[newX] = this.xScale[x];
//             }
//         }

//         this.xScale = temp;

//         for (let x in temp) {
//             const scale = this.calcScale(x),
//                 scale2 = this.calcScale2(x),
//                 leftPos = this.calcPos(x, scale2),
//                 zIndex = -Math.abs(x);

//             this.updateCards(this.xScale[x], {
//                 x: x,
//                 scale: scale,
//                 leftPos: leftPos,
//                 zIndex: zIndex,
//             });
//         }
//     }

//     calcPos(x, scale) {
//         let formula;

//         if (x < 0) {
//             formula = (scale * 100 - this.cardWidth) / 2;

//             return formula;
//         } else if (x > 0) {
//             formula = 100 - (scale * 100 + this.cardWidth) / 2;

//             return formula;
//         } else {
//             formula = 100 - (scale * 100 + this.cardWidth) / 2;

//             return formula;
//         }
//     }

//     updateCards(card, data) {
//         if (data.x || data.x == 0) {
//             card.setAttribute("data-x", data.x);
//         }

//         if (data.scale || data.scale == 0) {
//             card.style.transform = `scale(${data.scale})`;

//             if (data.scale == 0) {
//                 card.style.opacity = data.scale;
//             } else {
//                 card.style.opacity = 1;
//             }
//         }

//         if (data.leftPos) {
//             card.style.left = `${data.leftPos}%`;
//         }

//         if (data.zIndex || data.zIndex == 0) {
//             if (data.zIndex == 0) {
//                 card.classList.add("highlight");
//             } else {
//                 card.classList.remove("highlight");
//             }

//             card.style.zIndex = data.zIndex;
//         }
//     }

//     calcScale2(x) {
//         let formula;

//         if (x <= 0) {
//             formula = 1 - (-1 / 5) * x;

//             return formula;
//         } else if (x > 0) {
//             formula = 1 - (1 / 5) * x;

//             return formula;
//         }
//     }

//     calcScale(x) {
//         const formula = 1 - (1 / 5) * Math.pow(x, 2);

//         if (formula <= 0) {
//             return 0;
//         } else {
//             return formula;
//         }
//     }

//     checkOrdering(card, x, xDist) {
//         const original = parseInt(card.dataset.x);
//         const rounded = Math.round(xDist);
//         let newX = x;

//         if (x !== x + rounded) {
//             if (x + rounded > original) {
//                 if (x + rounded > this.centerIndex) {
//                     newX = x + rounded - 1 - this.centerIndex - rounded - this.centerIndex;
//                 }
//             } else if (x + rounded < original) {
//                 if (x + rounded < -this.centerIndex) {
//                     newX = x + rounded + 1 + this.centerIndex - rounded + this.centerIndex;
//                 }
//             }

//             this.xScale[newX] = card;
//         }

//         const temp = -xDist;

//         this.updateCards(card, {
//             x: newX,
//             scale: this.calcScale(temp),
//             leftPos: this.calcPos(temp, this.calcScale2(temp)),
//             zIndex: -Math.abs(temp),
//         });
//     }

//     moveCards(data) {
//         let xDist;

//         if (data != null) {
//             this.build();

//             for (let x in this.xScale) {
//                 xDist = parseInt(x) + data.x / this.container.clientWidth;

//                 this.checkOrdering(this.xScale[x], x, xDist);
//             }
//         }
//     }

//     startAutoSlide() {
//         setInterval(() => {
//             this.controller({ keyCode: 39 }); 
//         }, 3000); 
//     }
// }

// const carousel = new CardCarousel(cardsContainer, cardsController);
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
      startX = e.pageX || e.touches[0].pageX; // Support touch devices
      startScrollLeft = carousel.scrollLeft;
    };
  
    const dragging = (e) => {
      if (!isDragging) return;
  
      const x = e.pageX || e.touches[0].pageX; // Support touch devices
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
        carousel.scrollLeft = 0; // Reset to the beginning when it reaches the end
      }
  
      // Increase autoplay speed by setting a shorter timeout (e.g., 1500ms)
      timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 500);
    };
  
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
  
    // Touch events for mobile
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
  
    autoPlay(); // Start autoplay when the document is loaded
  });
  