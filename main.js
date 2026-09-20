/* =========================================================
   SAIF OMRAN — DAR AL-KHILAFAH
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       عناصر الموقع
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const mainNav =
        document.getElementById("mainNav");

    const themeButton =
        document.getElementById("themeButton");

    const yearElement =
        document.getElementById("year");


    /* =====================================================
       السنة الحالية
    ===================================================== */

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       القائمة في الهاتف
    ===================================================== */

    if (menuButton && mainNav) {

        menuButton.addEventListener("click", function () {

            mainNav.classList.toggle("open");

            const isOpen =
                mainNav.classList.contains("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuButton.textContent =
                isOpen ? "×" : "☰";

        });


        /* إغلاق القائمة عند الضغط على أحد الروابط */

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.textContent = "☰";

            });

        });


        /* إغلاق القائمة عند الضغط خارجها */

        document.addEventListener("click", function (event) {

            const clickedInsideNav =
                mainNav.contains(event.target);

            const clickedMenuButton =
                menuButton.contains(event.target);

            if (
                !clickedInsideNav &&
                !clickedMenuButton &&
                mainNav.classList.contains("open")
            ) {

                mainNav.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.textContent = "☰";

            }

        });

    }


    /* =====================================================
       الوضع الليلي / الفاتح
    ===================================================== */

    if (themeButton) {

        let savedTheme = null;

        try {

            savedTheme =
                localStorage.getItem("saif-theme");

        } catch (error) {

            savedTheme = null;

        }


        if (savedTheme === "light") {

            document.body.classList.add("light");

            themeButton.textContent = "☀";

        } else {

            themeButton.textContent = "◐";

        }


        themeButton.addEventListener("click", function () {

            document.body.classList.toggle("light");

            const lightMode =
                document.body.classList.contains("light");


            themeButton.textContent =
                lightMode ? "☀" : "◐";


            try {

                localStorage.setItem(
                    "saif-theme",
                    lightMode ? "light" : "dark"
                );

            } catch (error) {

                /*

                   إذا لم يسمح المتصفح بالتخزين،
                   يبقى تغيير المظهر يعمل بشكل طبيعي.

                */

            }

        });

    }


    /* =====================================================
       تأثير الضغط على البطاقات
    ===================================================== */

    const interactiveCards =
        document.querySelectorAll(
            ".main-card, .book-card, .hero-card"
        );


    interactiveCards.forEach(function (card) {

        card.addEventListener(
            "pointerdown",
            function () {

                card.style.transform =
                    "translateY(-3px) scale(0.99)";

            }
        );


        card.addEventListener(
            "pointerup",
            function () {

                card.style.transform = "";

            }
        );


        card.addEventListener(
            "pointerleave",
            function () {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       حركة ظهور العناصر أثناء النزول
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .main-card, .book-card, .final-banner"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries, observerInstance) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach(function (element) {

            element.classList.add(
                "scroll-reveal"
            );

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       منع فتح روابط فارغة
    ===================================================== */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    emptyLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

        });

    });


    /* =====================================================
       تأثير بسيط عند تحميل الصفحة
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    /* =====================================================
       اختصار لوحة المفاتيح
       Alt + M = القائمة
       Alt + T = تغيير المظهر
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.altKey &&
                event.key.toLowerCase() === "m"
            ) {

                if (menuButton) {

                    menuButton.click();

                }

            }


            if (
                event.altKey &&
                event.key.toLowerCase() === "t"
            ) {

                if (themeButton) {

                    themeButton.click();

                }

            }

        }
    );

});
