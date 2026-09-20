/**
 * ==========================================
 * ملف الوظائف الرئيسي (main.js)
 * ==========================================
 * يتحكم في تفاعلات الموقع وبناء العناصر ديناميكيًا.
 * يعتمد على البيانات الموجودة في config.js
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. إخفاء شاشة التحميل (Preloader)
    // ==========================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
            // إزالة العنصر من الصفحة بعد انتهاء الحركة لتخفيف الحمل
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 800);
        });
    }

    // ==========================================
    // 2. شريط تقدم التمرير (Scroll Progress)
    // ==========================================
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollProgress.style.width = progress + '%';
        });
    }

    // ==========================================
    // 3. القائمة الجانبية للهاتف (Mobile Nav)
    // ==========================================
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    function openMenu() {
        if (navMenu) navMenu.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        if (menuBtn) {
            menuBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>`;
        }
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (navMenu) navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        if (menuBtn) {
            menuBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>`;
        }
        document.body.style.overflow = '';
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // إغلاق القائمة عند النقر على أي رابط داخلها
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // ==========================================
    // 4. زر تغيير المظهر (Theme Toggle)
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            // حفظ التفضيل في الذاكرة المحلية
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });

        // استعادة التفضيل عند التحميل
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
    }

    // ==========================================
    // 5. تعبئة الكتب ديناميكيًا من config.js
    // ==========================================
    const booksContainer = document.getElementById('booksContainer');
    if (booksContainer && typeof siteConfig !== 'undefined' && siteConfig.books) {
        siteConfig.books.forEach(book => {
            const bookHTML = `
                <a href="${book.link}" target="_blank" rel="noopener noreferrer" class="book-card">
                    <div class="book-icon">${book.icon}</div>
                    <div class="book-info">
                        <h4 class="book-title">${book.title}</h4>
                        <span class="book-cta">اقرأ الآن</span>
                    </div>
                    <div class="book-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </div>
                </a>
            `;
            booksContainer.insertAdjacentHTML('beforeend', bookHTML);
        });
    }

    // ==========================================
    // 6. تعبئة أسماء الإخوة ديناميكيًا من config.js
    // ==========================================
    const brothersContainer = document.getElementById('brothersContainer');
    if (brothersContainer && typeof siteConfig !== 'undefined' && siteConfig.brothers) {
        siteConfig.brothers.forEach((brother, index) => {
            const brotherHTML = `
                <div class="brother-card" style="animation-delay: ${index * 0.1}s">
                    <div class="brother-avatar">${brother.charAt(0)}</div>
                    <span class="brother-name">${brother}</span>
                </div>
            `;
            brothersContainer.insertAdjacentHTML('beforeend', brotherHTML);
        });
    }

    // ==========================================
    // 7. تعبئة رقم الهاتف ديناميكيًا من config.js
    // ==========================================
    const phoneContainer = document.getElementById('phoneContainer');
    if (phoneContainer && typeof siteConfig !== 'undefined' && siteConfig.contactPhone) {
        phoneContainer.href = `tel:${siteConfig.contactPhone}`;
        phoneContainer.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>${siteConfig.contactPhone}</span>
        `;
    }

    // ==========================================
    // 8. تحديث سنة حقوق النشر في التذييل
    // ==========================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 9. زر العودة إلى الأعلى (Back to Top)
    // ==========================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================
    // 10. حركات الظهور عند التمرير (Scroll Reveal)
    // ==========================================
    const revealElements = document.querySelectorAll('.section, .hero, .quote-section, .card');
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            el.classList.add('reveal-init');
            revealObserver.observe(el);
        });
    }

    // ==========================================
    // 11. تأثير العد التصاعدي للأرقام (Count Up)
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
        const countObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'), 10);
                    if (isNaN(target)) return;
                    let current = 0;
                    const step = Math.max(1, Math.floor(target / 30));
                    const updateCount = () => {
                        current += step;
                        if (current >= target) {
                            el.textContent = target;
                            return;
                        }
                        el.textContent = current;
                        requestAnimationFrame(updateCount);
                    };
                    updateCount();
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => countObserver.observe(el));
    }

    // ==========================================
    // 12. زر البحث (Search Button) - يمكن تطويره لاحقًا
    // ==========================================
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            // يمكنك هنا فتح نافذة بحث منبثقة. حاليًا سنكتفي بإظهار تنبيه بسيط.
            alert('ميزة البحث قادمة قريبًا إن شاء الله.');
        });
    }

});
