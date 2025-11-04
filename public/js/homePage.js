// Smooth scroll for navbar links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate sections on scroll
const revealElements = document.querySelectorAll('section, .card, .tech-card, .doctor');
window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 0.8s ease-out';
        }
    });
});

// Button animation hover effect
const buttons = document.querySelectorAll('.btn, .login-btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseover', () => {
        btn.style.boxShadow = '0 0 15px rgba(0,150,136,0.5)';
    });
    btn.addEventListener('mouseout', () => {
        btn.style.boxShadow = 'none';
    });
});
