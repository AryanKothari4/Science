// --- 1. Initialize Interactive Particle Background ---
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false },
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } },
    },
    retina_detect: true,
});


// Wait for the page content to load before running our animations
document.addEventListener('DOMContentLoaded', () => {

    // --- 2. Page Load Stagger Animation (from anime.js) ---
    const timeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    });

    timeline.add({
        targets: '.fade-in',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(200)
    });

    // --- 3. NEW: Magnetic Pull & Snap-Back Effect (for top card) ---
    const infoCard = document.querySelector('.info-box');

    if (infoCard) {
        infoCard.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = infoCard.getBoundingClientRect();
            
            // Mouse position relative to the card's center
            const mouseX = e.clientX - left;
            const mouseY = e.clientY - top;
            const centerX = width / 2;
            const centerY = height / 2;

            // Calculate pull distance (max 12px)
            const pullX = ((mouseX - centerX) / centerX) * 12;
            const pullY = ((mouseY - centerY) / centerY) * 12;

            // Animate the card towards the cursor with anime.js
            anime({
                targets: infoCard,
                translateX: pullX,
                translateY: pullY,
                scale: 1.03, // Slightly scale up for effect
                rotate: '0.01deg', // A trick to keep hardware acceleration on
                duration: 200, // Make the follow animation quick
                easing: 'easeOutQuad'
            });

            // Update the CSS variables for the mouse-tracking glow
            infoCard.style.setProperty('--mouse-x', `${mouseX}px`);
            infoCard.style.setProperty('--mouse-y', `${mouseY}px`);
        });

        infoCard.addEventListener('mouseleave', () => {
            // Animate the card back to its original position with a springy snap
            anime({
                targets: infoCard,
                translateX: 0,
                translateY: 0,
                scale: 1,
                // Using spring physics for a satisfying snap-back
                // Format: using: 'spring(mass, stiffness, damping, velocity)'
                duration: 1200,
                elasticity: 600
            });
        });
    }
});