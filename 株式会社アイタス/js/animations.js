// ページロード時の初期化
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    createFloatingElements();
    loadTechCards();
    initAnimations();
    initThemeToggle();
    initScrollAnimation();
    initStatsCounter();
    initNavigation();
    
    // 初期コンテンツ表示
    setTimeout(() => {
        document.querySelectorAll('.title-part').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        document.querySelector('.hero-description').style.opacity = '1';
        document.querySelector('.hero-description').style.transform = 'translateY(0)';
        document.querySelector('.hero-stats').style.opacity = '1';
    }, 100);
});

// 技術カード読み込み
function loadTechCards() {
    const grid = document.getElementById('techGrid');
    if (!grid) return;
    
    techCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.id = card.id;
        
        cardElement.innerHTML = `
            <div class="card-icon">
                <i class="${card.icon}"></i>
            </div>
            <h3>${card.title}</h3>
            <p>${card.description}</p>
            <ul class="features">
                ${card.features.map(feature => `
                    <li>
                        <i class="fas fa-chevron-right"></i>
                        ${feature}
                    </li>
                `).join('')}
            </ul>
        `;
        
        grid.appendChild(cardElement);
        
        // ホバーエフェクト
        cardElement.addEventListener('mouseenter', () => {
            const icon = cardElement.querySelector('.card-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(15deg)';
                icon.style.color = card.color;
            }
        });
        
        cardElement.addEventListener('mouseleave', () => {
            const icon = cardElement.querySelector('.card-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '';
            }
        });
    });
}

// アニメーション初期化
function initAnimations() {
    if (typeof gsap === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // カードアニメーション
    gsap.utils.toArray('.card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // タイムラインアニメーション
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.fromTo(item, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// テーマ切替
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// スクロールアニメーション
function initScrollAnimation() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.padding = '1rem 0';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // スムーズスクロール
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 統計カウンター
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const duration = 1500;
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current);
                }, stepTime);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// ナビゲーション
function initNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section, .card');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id') || '';
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}
// 採用情報カードのアニメーション
function initRecruitmentAnimation() {
    const recruitmentCards = document.querySelectorAll('.recruitment-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,  
        rootMargin: '0px 0px -50px 0px' 
    });

    recruitmentCards.forEach(card => {
        observer.observe(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initRecruitmentAnimation();
});

window.addEventListener('load', initRecruitmentAnimation);
// テーマ切替機能
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// ローカルストレージから現在のテーマを取得（デフォルトはダークモード）
const currentTheme = localStorage.getItem('theme') || 'dark';

// 初期テーマ設定
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.classList.add('light-mode');
}

// ライトモード用のスタイル定義
const lightThemeStyles = `
    /* 背景色と文字色 */
    body.light-mode {
        background: var(--light-bg);
        color: var(--text-dark);
    }
    
    /* カード類の背景色 */
    body.light-mode .card,
    body.light-mode .recruitment-card,
    body.light-mode .timeline-content {
        background: white;
        border-color: rgba(0, 0, 0, 0.1);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }
    
    /* 採用情報カード */
    body.light-mode .recruitment-card {
        background: white;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    /* テキストカラー調整 */
    body.light-mode .recruitment-list li,
    body.light-mode .timeline-content p,
    body.light-mode .card p,
    body.light-mode .hero-description,
    body.light-mode .section-subtitle,
    body.light-mode .recruitment-card .position,
    body.light-mode .application-info p {
        color: #666;
    }
    
    /* タイトルカラー */
    body.light-mode .recruitment-card h3,
    body.light-mode .card h3,
    body.light-mode .timeline-content h3 {
        color: #333;
    }
    
    /* ナビゲーション */
    body.light-mode .main-nav a {
        color: var(--text-dark);
    }
    
    body.light-mode .main-nav a:hover {
        color: var(--primary-color);
        background: rgba(0, 102, 204, 0.1);
    }
    
    /* フッター */
    body.light-mode footer {
        border-top-color: rgba(0, 0, 0, 0.1);
        background: rgba(255, 255, 255, 0.9);
    }
    
    /* ソーシャルリンク */
    body.light-mode .social-link {
        background: rgba(0, 0, 0, 0.05);
        color: var(--text-dark);
        border-color: rgba(0, 0, 0, 0.1);
    }
    
    body.light-mode .social-link:hover {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
    }
          body.light-mode header {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    body.light-mode .logo-text {
        color: var(--text-dark);
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        -webkit-background-clip: text;
        background-clip: text;
    }
    
    body.light-mode .main-nav a {
        color: var(--text-dark);
    }
    
    body.light-mode .main-nav a:hover {
        color: var(--primary-color);
        background: rgba(0, 102, 204, 0.1);
    }
    
    body.light-mode .theme-toggle {
        border-color: var(--primary-color);
        color: var(--text-dark);
        background: var(--light-bg);
    }
    
    body.light-mode .theme-toggle:hover {
        background: var(--primary-color);
        color: white;
    }
`;

// ライトモードスタイルをheadに追加
const styleElement = document.createElement('style');
styleElement.textContent = lightThemeStyles;
document.head.appendChild(styleElement);

// テーマ切替ボタンのクリックイベント
themeToggle.addEventListener('click', function() {
    // ボタンクリックアニメーション（回転＆スケール）
    this.style.transform = 'scale(0.9) rotate(180deg)';
    
    setTimeout(() => {
        // テーマ切り替え
        body.classList.toggle('light-mode');
        this.classList.toggle('light-mode');
        
        // 現在のテーマをローカルストレージに保存
        const isLightMode = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        
        // アクセシビリティ対応（スクリーンリーダー用）
        this.setAttribute('aria-label', isLightMode 
            ? 'ダークモードに切り替え' 
            : 'ライトモードに切り替え');
        
        // ボタンアニメーションリセット
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
        
    }, 200); // アニメーション遅延
});

// リップル効果（波紋エフェクト）の追加
themeToggle.addEventListener('click', function(e) {
    // クリック位置の計算
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // リップル要素の作成
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.top = y + 'px';
    ripple.style.left = x + 'px';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1';
    
    // リップル要素を追加
    this.appendChild(ripple);
    
    // アニメーション終了後にリップル要素を削除
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// リップルアニメーションのキーフレーム定義
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ページロード時にアニメーションを初期化
document.addEventListener('DOMContentLoaded', function() {
    // 初回ロード時にテーマ切り替え効果を適用
    if (body.classList.contains('light-mode')) {
        themeToggle.classList.add('light-mode');
        themeToggle.setAttribute('aria-label', 'ダークモードに切り替え');
    } else {
        themeToggle.setAttribute('aria-label', 'ライトモードに切り替え');
    }
});
