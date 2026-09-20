/* =========================================================
   script.js
   موقع سيف بن عمران - التفاعلات والحركات
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------------------------------------
       ظهور العناصر أثناء النزول في الصفحة
       --------------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".book-card, .info-box, .glass-card, .section-title, .feature-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("show");
        });

    }


    /* ---------------------------------------------------------
       تأثير الضغط على الأزرار
       --------------------------------------------------------- */

    const buttons = document.querySelectorAll(
        "a, button, .book-button, .feature-card"
    );

    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            button.classList.add("pressed");

            setTimeout(() => {
                button.classList.remove("pressed");
            }, 180);

        });

    });


    /* ---------------------------------------------------------
       زر العودة إلى أعلى الصفحة
       --------------------------------------------------------- */

    const topButton = document.createElement("button");

    topButton.innerHTML = "↑";

    topButton.className = "back-to-top";

    topButton.setAttribute(
        "aria-label",
        "العودة إلى أعلى الصفحة"
    );

    document.body.appendChild(topButton);


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topButton.classList.add("visible");

        } else {

            topButton.classList.remove("visible");

        }

    });


    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* ---------------------------------------------------------
       السنة الحالية تلقائيًا
       --------------------------------------------------------- */

    const yearElements = document.querySelectorAll(
        "[data-current-year]"
    );

    yearElements.forEach((element) => {

        element.textContent = new Date().getFullYear();

    });


    /* ---------------------------------------------------------
       رسالة ترحيبية بسيطة
       --------------------------------------------------------- */

    const welcomeButton = document.querySelector(
        "[data-welcome]"
    );

    if (welcomeButton) {

        welcomeButton.addEventListener("click", () => {

            alert(
                "أهلاً بك يا أخي في موقع سيف بن عمران.\n\n" +
                "أرجو أن تستفيد من المؤلفات، وجزاك الله كل خير."
            );

        });

    }


    /* ---------------------------------------------------------
       تأثير الكتاب عند المرور عليه
       --------------------------------------------------------- */

    const books = document.querySelectorAll(".book-card");

    books.forEach((book) => {

        book.addEventListener("mouseenter", () => {

            book.classList.add("book-hover");

        });

        book.addEventListener("mouseleave", () => {

            book.classList.remove("book-hover");

        });

    });


    /* ---------------------------------------------------------
       منع تكرار الضغط على روابط القراءة أثناء الانتقال
       --------------------------------------------------------- */

    const bookLinks = document.querySelectorAll(
        ".book-button"
    );

    bookLinks.forEach((link) => {

        link.addEventListener("click", () => {

            link.classList.add("loading");

            const originalText = link.innerHTML;

            link.innerHTML = "جاري فتح الكتاب...";

            setTimeout(() => {

                link.classList.remove("loading");

                link.innerHTML = originalText;

            }, 1500);

        });

    });


    /* ---------------------------------------------------------
       القائمة المتنقلة للهواتف
       --------------------------------------------------------- */

    const menuButton = document.querySelector(
        ".mobile-menu-button"
    );

    const navigation = document.querySelector(
        ".main-nav"
    );

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {

            navigation.classList.toggle("mobile-open");

            menuButton.classList.toggle("active");

        });


        navigation.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                navigation.classList.remove(
                    "mobile-open"
                );

                menuButton.classList.remove("active");

            });

        });

    }


    /* ---------------------------------------------------------
       إغلاق القائمة عند الضغط خارجها
       --------------------------------------------------------- */

    document.addEventListener("click", (event) => {

        if (!navigation || !menuButton) {
            return;
        }

        const clickedInsideMenu =
            navigation.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedButton
        ) {

            navigation.classList.remove(
                "mobile-open"
            );

            menuButton.classList.remove(
                "active"
            );

        }

    });


    /* ---------------------------------------------------------
       تأثير خفيف للصفحة عند تحميلها
       --------------------------------------------------------- */

    document.body.classList.add("page-loaded");


    /* ---------------------------------------------------------
       روابط التواصل الاجتماعي
       --------------------------------------------------------- */

    const socialLinks = document.querySelectorAll(
        "[data-social-link]"
    );

    socialLinks.forEach((link) => {

        link.addEventListener("click", () => {

            link.classList.add("social-clicked");

        });

    });


    /* ---------------------------------------------------------
       نسخ رقم التواصل عند الضغط
       --------------------------------------------------------- */

    const copyButtons = document.querySelectorAll(
        "[data-copy-phone]"
    );

    copyButtons.forEach((button) => {

        button.addEventListener("click", async () => {

            const phone =
                button.getAttribute(
                    "data-copy-phone"
                );

            if (!phone) {
                return;
            }

            try {

                await navigator.clipboard.writeText(
                    phone
                );

                const oldText =
                    button.innerHTML;

                button.innerHTML =
                    "✓ تم نسخ الرقم";

                setTimeout(() => {

                    button.innerHTML =
                        oldText;

                }, 1800);

            } catch (error) {

                alert(
                    "رقم التواصل: " + phone
                );

            }

        });

    });


    /* ---------------------------------------------------------
       تأثير ظهور الشعار
       --------------------------------------------------------- */

    const brand =
        document.querySelector(".brand");

    if (brand) {

        brand.addEventListener(
            "mouseenter",
            () => {
                brand.classList.add(
                    "brand-glow"
                );
            }
        );

        brand.addEventListener(
            "mouseleave",
            () => {
                brand.classList.remove(
                    "brand-glow"
                );
            }
        );

    }


    /* ---------------------------------------------------------
       تأثير النجوم/الجزيئات في الخلفية
       --------------------------------------------------------- */

    const particlesContainer =
        document.querySelector(
            ".particles"
        );

    if (particlesContainer) {

        for (let i = 0; i < 25; i++) {

            const particle =
                document.createElement("span");

            particle.className =
                "particle";

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.top =
                Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 5 + "s";

            particle.style.animationDuration =
                4 + Math.random() * 6 + "s";

            particlesContainer.appendChild(
                particle
            );

        }

    }

});
