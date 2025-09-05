// --- 1. Initialize Interactive Particle Background ---
particlesJS("particles-js", {
    particles: { /* ... (particle config is unchanged) ... */
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

    // --- The Corrected Animation Sequence ---

    // Select all the elements that need to fade in
    const elementsToFade = document.querySelectorAll('.fade-in');
    
    // Select the SVG components
    const nucleus = document.querySelector('.atom-nucleus');
    const orbits = document.querySelectorAll('.atom-orbit');

    // FIX: Hide all fade-in elements initially with JS to prevent flashes of content
    anime.set(elementsToFade, { opacity: 0, translateY: 30 });
    // FIX: Set the initial state for the SVG drawing animation
    anime.set(nucleus, { scale: 0 });
    orbits.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
    });

    // Create a single, clean timeline
    const pageLoadTimeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 800
    });

    // Step 1: Animate the header and the (currently invisible) atom container into view
    pageLoadTimeline.add({
        targets: '.fade-in', // Targets header, atom-container, and cards
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(150) // Stagger all elements for a cascade effect
    })
    // Step 2: Animate the SVG drawing, overlapping it with the container fading in
    .add({
        targets: nucleus,
        scale: [0, 1],
        duration: 500
    }, '-=1000') // The offset starts this animation 1000ms before the previous one ends
    .add({
        targets: orbits,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1200,
        delay: anime.stagger(200)
    }, '-=800'); // Overlap this as well for a fluid sequence


    // --- Magnetic Pull & Snap-Back Effect (for top card) ---
    const infoCard = document.querySelector('.info-box');
    if (infoCard) {
        // ... (This logic remains unchanged as it was working correctly) ...
        infoCard.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = infoCard.getBoundingClientRect();
            const mouseX = e.clientX - left;
            const mouseY = e.clientY - top;
            const centerX = width / 2;
            const centerY = height / 2;
            const pullX = ((mouseX - centerX) / centerX) * 12;
            const pullY = ((mouseY - centerY) / centerY) * 12;
            anime({ targets: infoCard, translateX: pullX, translateY: pullY, scale: 1.03, rotate: '0.01deg', duration: 200, easing: 'easeOutQuad' });
            infoCard.style.setProperty('--mouse-x', `${mouseX}px`);
            infoCard.style.setProperty('--mouse-y', `${mouseY}px`);
        });
        infoCard.addEventListener('mouseleave', () => {
            anime({ targets: infoCard, translateX: 0, translateY: 0, scale: 1, duration: 1200, elasticity: 600 });
        });
    }
});