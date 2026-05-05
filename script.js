// Wrap Name Letters for Animation
const nameLines = document.querySelectorAll('.name-line');
nameLines.forEach(line => {
    const text = line.innerText;
    line.innerHTML = text.split('').map(char => 
        char === ' ' ? ' ' : `<span>${char}</span>`
    ).join('');
});

// Three.js Background Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#ff5733',
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 3;

// Mouse Movement Effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate);

    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;

    if (mouseX > 0) {
        particlesMesh.rotation.x += (mouseY - window.innerHeight / 2) * 0.00001;
        particlesMesh.rotation.y += (mouseX - window.innerWidth / 2) * 0.00001;
    }

    renderer.render(scene, camera);
};

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
const heroTimeline = gsap.timeline();

heroTimeline.from(".hero h1", {
    y: 100,
    opacity: 0,
    filter: "blur(10px)",
    duration: 1.2,
    ease: "power4.out"
})
.from(".hero h2", {
    y: 50,
    opacity: 0,
    filter: "blur(5px)",
    duration: 1,
    ease: "power4.out"
}, "-=0.8")
.from(".hero p", {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
}, "-=0.6")
.from(".hero .hero-btns", {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
}, "-=0.4");

// Floating Effect for Hero Content
gsap.to(".hero-content", {
    y: -20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Mouse Parallax for Hero
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    gsap.to(".hero-content", {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: "power2.out"
    });
});

// Reveal Sections on Scroll
const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
    });
});

// Hover Effect for Cards
const cards = document.querySelectorAll('.glass-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
});

// Navigation Click Animation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.classList.add('section-highlight');
            setTimeout(() => {
                targetSection.classList.remove('section-highlight');
            }, 1000);
        }
    });
});

// General Modal Logic Helper
function setupModal(modalId, btnId, closeClass) {
    const modal = document.getElementById(modalId);
    const btn = document.getElementById(btnId);
    const span = document.getElementsByClassName(closeClass)[0];

    if (btn && modal) {
        btn.onclick = function() {
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    }

    if (span && modal) {
        span.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
}

setupModal("cert-modal", "open-cert-modal", "close-modal");
setupModal("ach-modal", "open-ach-modal", "close-modal-ach");
