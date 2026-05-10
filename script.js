/* ================================================
   TU NOMBRE FILMS — JavaScript
   ================================================ */

// --- NAVBAR: scroll effect + hamburger ---
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Cierra el menú al hacer click en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// --- PORTFOLIO TABS ---
const tabBtns = document.querySelectorAll('.tab-btn');
const videoCards = document.querySelectorAll('.video-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        videoCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// --- VIDEO MODAL ---
const modal = document.getElementById('videoModal');
const modalIframe = document.getElementById('modalIframe');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

document.querySelectorAll('.video-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const videoId = thumb.dataset.videoid;
        modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('open');
    modalIframe.src = '';
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

// --- FORMULARIO: mailto fallback ---
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const servicio = document.getElementById('servicio').value;
    const fecha = document.getElementById('fecha').value;
    const mensaje = document.getElementById('mensaje').value;

    const subject = encodeURIComponent(`Consulta desde web: ${servicio || 'Información'}`);
    const body = encodeURIComponent(
        `Hola,\n\nMe llamo ${nombre} y me interesa: ${servicio}.\n\nFecha del evento: ${fecha || 'Por determinar'}\n\nMensaje:\n${mensaje}\n\nEmail de contacto: ${email}`
    );
    window.location.href = `mailto:hola@tunombre.com?subject=${subject}&body=${body}`;
});

// --- ANIMACIONES AL HACER SCROLL (Intersection Observer) ---
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animación inicial a tarjetas y secciones
const animatedEls = document.querySelectorAll(
    '.video-card, .service-card, .testimonial-card, .about-text, .stat, .contact-text'
);
animatedEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
    observer.observe(el);
});
