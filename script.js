// Wait for the entire page to load before running animations
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Page Load Stagger Animation ---
    // This creates a timeline of animations that run in sequence.
    const timeline = anime.timeline({
        easing: 'easeOutExpo', // A smooth easing function
        duration: 1000 // Default duration for animations in this timeline
    });

    // Animate the elements with the 'fade-in' class
    timeline.add({
        targets: '.fade-in',
        opacity: [0, 1], // Animate from opacity 0 to 1
        translateY: [30, 0], // Animate from 30px below to its original position
        delay: anime.stagger(200) // Add a 200ms delay between each element
    });

    // --- 2. Interactive Card Tilt Effect ---
    const infoCard = document.getElementById('info-card');

    if (infoCard) {
        infoCard.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = infoCard.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;

            const rotateX = (y / height - 0.5) * -30; // Max rotation of 15 degrees
            const rotateY = (x / width - 0.5) * 30;  // Max rotation of 15 degrees

            infoCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        infoCard.addEventListener('mouseleave', () => {
            // Reset the card's position when the mouse leaves
            infoCard.style.transform = 'rotateX(0) rotateY(0)';
        });
    }


    // --- 3. Enhanced Link Hover "Jiggle" Effect ---
    const linkItems = document.querySelectorAll('.link-item a');

    linkItems.forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link,
                scale: [1, 1.05, 0.95, 1], // Scale up, then down, then back to normal
                rotate: [-2, 2, -1, 1, 0], // A slight wiggle
                duration: 400,
                easing: 'easeInOutSine'
            });
        });
    });

});
