/**
 * パーティクル背景効果
 * 動的なパーティクルと接続ラインを生成
 */

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 200 + 50}, ${Math.random() * 255}, ${Math.random() * 0.5 + 0.2})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;

            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                this.speedX += dx * 0.001;
                this.speedY += dy * 0.001;
            }

            const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
            if (speed > 2) {
                this.speedX = (this.speedX / speed) * 2;
                this.speedY = (this.speedY / speed) * 2;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(100, 200, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        requestAnimationFrame(animate);
    }

    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    resizeCanvas();
    createParticles();
    animate();
}

function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;
    
    const shapes = ['circle', 'square', 'triangle', 'hexagon'];
    const colors = [
        'rgba(0, 180, 216, 0.3)',
        'rgba(114, 9, 183, 0.3)',
        'rgba(0, 102, 204, 0.3)',
        'rgba(76, 201, 240, 0.3)',
        'rgba(247, 37, 133, 0.3)'
    ];

    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        element.className = 'float-element';
        
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const size = Math.random() * 40 + 10;
        
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.animationDelay = `${Math.random() * 20}s`;
        element.style.opacity = Math.random() * 0.5 + 0.1;
        element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        if (shape === 'circle') {
            element.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
            element.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            element.style.backgroundColor = 'transparent';
            element.style.borderLeft = `${size/2}px solid transparent`;
            element.style.borderRight = `${size/2}px solid transparent`;
            element.style.borderBottom = `${size}px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
            element.style.width = '0';
            element.style.height = '0';
        } else if (shape === 'hexagon') {
            element.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
        }
        
        container.appendChild(element);
    }
}