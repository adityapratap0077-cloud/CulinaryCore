document.addEventListener('DOMContentLoaded', () => {
    // Three.js Aurora Background
    const auroraContainer = document.getElementById('aurora-container');
    if (auroraContainer) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        auroraContainer.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0.0 },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            vertexShader: `
                void main() {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec2 resolution;

                void main() {
                    vec2 uv = gl_FragCoord.xy / resolution.xy;
                    vec3 color = vec3(0.0);

                    // Simple aurora effect
                    float strength = sin(uv.x * 10.0 + time * 0.5) * 0.5 + 0.5;
                    strength *= sin(uv.y * 5.0 + time * 0.3) * 0.5 + 0.5;
                    color = mix(vec3(0.8, 0.2, 0.0), vec3(0.0, 0.5, 0.8), strength);

                    gl_FragColor = vec4(color, 0.5);
                }
            `,
            blending: THREE.AdditiveBlending,
            transparent: true
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            material.uniforms.time.value += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
        });
    }

    // Parallax Effect
    const parallaxContainer = document.querySelector('.parallax-container');
    if (parallaxContainer) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxContainer.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Premium Modal Logic
    const premiumBtn = document.getElementById('premiumBtn');
    const premiumModal = document.getElementById('premiumModal');
    const closeModal = document.querySelector('#premiumModal .close');
    const unlockBtns = document.querySelectorAll('.unlock-btn');

    const showPremiumModal = () => {
        if (premiumModal) {
            premiumModal.style.display = 'block';
            premiumModal.classList.add('modal-enter');
        }
    };

    if (premiumBtn) {
        premiumBtn.addEventListener('click', showPremiumModal);
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (premiumModal) premiumModal.style.display = 'none';
        });
    }

    unlockBtns.forEach(btn => {
        btn.addEventListener('click', showPremiumModal);
    });

    window.addEventListener('click', (event) => {
        if (event.target === premiumModal) {
            premiumModal.style.display = 'none';
        }
    });

    // Review Submission Logic
    const starsInput = document.getElementById('starsInput');
    const reviewText = document.getElementById('reviewText');
    const submitReviewBtn = document.getElementById('submitReview');
    let currentRating = 0;

    if (starsInput) {
        starsInput.addEventListener('click', (event) => {
            if (event.target.classList.contains('star')) {
                currentRating = parseInt(event.target.dataset.value);
                Array.from(starsInput.children).forEach(star => {
                    if (parseInt(star.dataset.value) <= currentRating) {
                        star.classList.add('selected');
                    } else {
                        star.classList.remove('selected');
                    }
                });
            }
        });
    }

    if (submitReviewBtn) {
        submitReviewBtn.addEventListener('click', () => {
            const reviewContent = reviewText ? reviewText.value.trim() : '';
            if (currentRating > 0 && reviewContent) {
                alert(`Review Submitted!\nRating: ${currentRating} stars\nComment: ${reviewContent}`);
                // In a real application, you would send this data to a server
                reviewText.value = '';
                currentRating = 0;
                Array.from(starsInput.children).forEach(star => star.classList.remove('selected'));
            } else {
                alert('Please provide a rating and write a review.');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Expose showPremiumModal to global scope for onclick in HTML
window.showPremiumModal = () => {
    const premiumModal = document.getElementById('premiumModal');
    if (premiumModal) {
        premiumModal.style.display = 'block';
        premiumModal.classList.add('modal-enter');
    }
};