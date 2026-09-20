/**
 * ==========================================
 * ملف الوظائف الرئيسي (main.js)
 * ==========================================
 * يتحكم في تفاعلات الموقع وبناء العناصر ديناميكيًا.
 * يعتمد على البيانات الموجودة في config.js
 * تم إزالة كود الإخفاء (Reveal) لضمان ظهور المحتوى على جميع الهواتف.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. إخفاء شاشة التحميل (Preloader)
    // ==========================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
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
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });

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
    // 10. زر البحث (Search Button)
    // ==========================================
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert('ميزة البحث قادمة قريبًا إن شاء الله.');
        });
    }

});
