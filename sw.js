/*
 * ==========================================
 * Service Worker — دار الخلافة
 * ==========================================
 * يتيح استخدام الموقع بدون إنترنت + يدعم التحديث التلقائي
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = 'dar-alkhilafah-' + CACHE_VERSION;

// الملفات الأساسية
const CORE_ASSETS = [
    '/',
    '/index.html',
    '/books.html',
    '/about.html',
    '/brothers.html',
    '/sources.html',
    '/news.html',
    '/hadith.html',
    '/scholars.html',
    '/contact.html',
    '/style.css',
    '/config.js',
    '/main.js',
    '/icon.jpg',
    '/manifest.json'
];

// ── عند التثبيت: تخزين الملفات ──
self.addEventListener('install', (event) => {
    console.log('🔧 [SW] جارٍ التثبيت...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(CORE_ASSETS))
            .then(() => {
                console.log('✅ [SW] تم تخزين الملفات بنجاح');
                return self.skipWaiting();
            })
            .catch((err) => console.log('⚠️ [SW] خطأ في التخزين:', err))
    );
});

// ── عند التنشيط: حذف الذاكرات القديمة ──
self.addEventListener('activate', (event) => {
    console.log('🚀 [SW] جارٍ التنشيط...');
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('🗑️ [SW] حذف ذاكرة قديمة:', key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// ── عند الطلب: من الذاكرة أو الإنترنت ──
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // تجاهل Google Fonts (لا يمكن تخزينها دائمًا)
    if (url.hostname.includes('fonts.google') || url.hostname.includes('fonts.gstatic')) {
        event.respondWith(
            fetch(event.request).catch(() => caches.match(event.request))
        );
        return;
    }

    // للموارد الخاصة بالموقع
    if (url.origin === location.origin) {
        event.respondWith(
            caches.match(event.request).then((cached) => {
                // جلب نسخة جديدة في الخلفية
                const fetchPromise = fetch(event.request)
                    .then((response) => {
                        if (response && response.status === 200) {
                            const copy = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, copy);
                            });
                        }
                        return response;
                    })
                    .catch(() => cached);

                // أعطِ الأولوية للنسخة المخزنة (أسرع)
                return cached || fetchPromise;
            })
        );
    }
});

// ── استقبال رسائل من الصفحة (لتحديث) ──
self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
