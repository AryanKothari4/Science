// ==============================================
// PARTICLE BACKGROUND CONFIGURATION
// ==============================================
particlesJS("particles-js", {
    particles: {
        number: {
            value: 104,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// ==============================================
// PAGE ANIMATIONS
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Staggered fade-in animation for page elements
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

    // ==============================================
    // MAGNETIC CARD EFFECT
    // ==============================================
    const infoCard = document.querySelector('.info-box');

    if (infoCard) {
        // Mouse move handler - creates magnetic pull effect
        infoCard.addEventListener('mousemove', (e) => {
            const rect = infoCard.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate pull intensity based on mouse position
            const pullX = ((mouseX - centerX) / centerX) * 12;
            const pullY = ((mouseY - centerY) / centerY) * 12;
            
            // Apply magnetic transformation
            anime({
                targets: infoCard,
                translateX: pullX,
                translateY: pullY,
                scale: 1.03,
                rotate: '0.01deg',
                duration: 200,
                easing: 'easeOutQuad'
            });
            
            // Update CSS custom properties for gradient effect
            infoCard.style.setProperty('--mouse-x', `${mouseX}px`);
            infoCard.style.setProperty('--mouse-y', `${mouseY}px`);
        });

        // Mouse leave handler - snap back to original position
        infoCard.addEventListener('mouseleave', () => {
            anime({
                targets: infoCard,
                translateX: 0,
                translateY: 0,
                scale: 1,
                duration: 1200,
                elasticity: 600
            });
        });
    }

    // ==============================================
    // BACKGROUND PARALLAX EFFECT
    // ==============================================
    const particlesContainer = document.getElementById('particles-js');
    
    if (particlesContainer) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            // Subtle parallax - moves at 50% of scroll speed
            particlesContainer.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
});