// --- 1. Initialize Interactive Particle Background ---
// This function comes from the particles.js library loaded in the HTML
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
        events: {
            onhover: { enable: true, mode: "repulse" }, // Pushes particles away from cursor
            onclick: { enable: true, mode: "push" },    // Pushes particles on click
            resize: true,
        },
        modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
        },
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

    // --- 3. FIXED: Interactive Card Tilt & NEW: Glow Effect ---
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            
            // Calculate mouse position relative to the card center
            const x = e.clientX - left;
            const y = e.clientY - top;
            const centerX = width / 2;
            const centerY = height / 2;

            // Calculate rotation values. Max rotation is 15 degrees.
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            // Apply the 3D tilt transform
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            
            // Update the CSS variables for the mouse-tracking glow
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            // Reset the card's transform smoothly when the mouse leaves
            card.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Note: The link hover "jiggle" effect from the previous version has been removed
    // in favor of the cleaner CSS lift effect, which works better with a grid.
});