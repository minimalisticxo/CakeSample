document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loader = document.getElementById("loader");

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    const cakeModal = document.getElementById("cakeModal");
    const modalOverlay = document.getElementById("modalOverlay");
    const modalClose = document.getElementById("modalClose");

    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalPrice = document.getElementById("modalPrice");
    const modalNumber = document.getElementById("modalNumber");

    const cakeButtons = document.querySelectorAll(".cake-view");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");

            document.body.style.overflow = "";

        }, 900);

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            mobileMenu.classList.toggle("active");

            if (mobileMenu.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICK
    ===================================================== */

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active");
            mobileMenu.classList.remove("active");

            document.body.style.overflow = "";

        });

    });


    /* =====================================================
       CAKE DATA
    ===================================================== */

    const cakeData = {

        "Velvet Noir": {
            number: "01",
            image: "assets/cakes/velvet-noir.jpg",
            description:
                "A rich chocolate creation crafted with Belgian cocoa, smooth cream and layers of deep chocolate flavor.",
            price: "₹1,499"
        },

        "Strawberry Éclat": {
            number: "02",
            image: "assets/cakes/strawberry-eclat.jpg",
            description:
                "Fresh strawberries meet delicate vanilla cream in a light, elegant cake made for beautiful celebrations.",
            price: "₹1,399"
        },

        "Golden Hazelnut": {
            number: "03",
            image: "assets/cakes/golden-hazelnut.jpg",
            description:
                "Roasted hazelnuts, silky milk chocolate and soft layers come together in this indulgent Maison favorite.",
            price: "₹1,599"
        },

        "Vanilla Bloom": {
            number: "04",
            image: "assets/cakes/vanilla-bloom.jpg",
            description:
                "A timeless vanilla cake made with Madagascar vanilla and finished with soft Chantilly cream.",
            price: "₹1,299"
        },

        "Berry Muse": {
            number: "05",
            image: "assets/cakes/berry-muse.jpg",
            description:
                "A delicate combination of mixed berries and cream cheese with a fresh, lightly sweet finish.",
            price: "₹1,499"
        }

    };


    /* =====================================================
       OPEN CAKE MODAL
    ===================================================== */

    cakeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const cakeName = button.dataset.cake;

            const cake = cakeData[cakeName];

            if (!cake) {
                return;
            }

            modalNumber.textContent = cake.number;

            modalTitle.textContent = cakeName;

            modalDescription.textContent = cake.description;

            modalPrice.textContent = cake.price;

            modalImage.src = cake.image;

            modalImage.alt = cakeName;

            cakeModal.classList.add("active");

            document.body.classList.add("modal-open");

        });

    });


    /* =====================================================
       CLOSE CAKE MODAL
    ===================================================== */

    function closeCakeModal() {

        cakeModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    if (modalClose) {

        modalClose.addEventListener("click", closeCakeModal);

    }


    if (modalOverlay) {

        modalOverlay.addEventListener("click", closeCakeModal);

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeCakeModal();

            if (mobileMenu.classList.contains("active")) {

                menuToggle.classList.remove("active");

                mobileMenu.classList.remove("active");

                document.body.style.overflow = "";

            }

        }

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".intro, .section-heading, .cake-card, .feature-section, .values-heading, .value-item, .about-content, .cta-inner"
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       STAGGER CAKE CARDS
    ===================================================== */

    const cakeCards = document.querySelectorAll(".cake-card");

    cakeCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 0.08}s`;

    });


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    let lastScroll = 0;

    window.addEventListener(
        "scroll",
        () => {

            const currentScroll = window.scrollY;

            if (currentScroll > 80) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

            lastScroll = currentScroll;

        },
        { passive: true }
    );


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetID = link.getAttribute("href");

            if (!targetID || targetID === "#") {
                return;
            }

            const target = document.querySelector(targetID);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight = 80;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       IMAGE PARALLAX
    ===================================================== */

    const heroImage = document.querySelector(".hero-image img");

    if (heroImage) {

        window.addEventListener(
            "scroll",
            () => {

                const scrollPosition = window.scrollY;

                if (scrollPosition < window.innerHeight) {

                    heroImage.style.transform =
                        `translateY(${scrollPosition * 0.08}px) scale(1.02)`;

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       CURSOR EFFECT — DESKTOP ONLY
    ===================================================== */

    const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches;


    if (!isTouchDevice) {

        const buttons = document.querySelectorAll(
            ".primary-button, .cake-view, .nav-button"
        );

        buttons.forEach(button => {

            button.addEventListener("mousemove", event => {

                const rect = button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * 0.08}px, ${y * 0.08}px)`;

            });


            button.addEventListener("mouseleave", () => {

                button.style.transform = "";

            });

        });

    }


    /* =====================================================
       PRELOAD CAKE IMAGES
    ===================================================== */

    Object.values(cakeData).forEach(cake => {

        const image = new Image();

        image.src = cake.image;

    });


    /* =====================================================
       ORDER BUTTON DEMO
    ===================================================== */

    const orderButtons = document.querySelectorAll(
        ".cta-button, .modal-bottom .primary-button"
    );

    orderButtons.forEach(button => {

        button.addEventListener("click", event => {

            const href = button.getAttribute("href");

            if (href === "#" || href === "#contact") {

                event.preventDefault();

                const contactSection =
                    document.querySelector("#contact");

                if (contactSection) {

                    contactSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

                closeCakeModal();

            }

        });

    });


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%cMAISON CAKE",
        "font-size: 24px; font-weight: bold;"
    );

    console.log(
        "Premium cakes. Made for moments worth remembering."
    );

});