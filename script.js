document.addEventListener("DOMContentLoaded", function () {
    // تفعيل زر الصعود للأعلى بذكاء وسلاسة تامة بدون أي تشنج
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    }, { passive: true }); // استخدام passive للأداء العالي على الجوال

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // منع أي سلوك مزعج أو أخطاء روابط خارجية
    const externalLinks = document.querySelectorAll("a[target='_blank']");
    externalLinks.forEach(link => {
        link.setAttribute("rel", "noopener noreferrer");
    });
});
