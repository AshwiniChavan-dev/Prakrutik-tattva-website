// /static/js/script.js

// 1. Smooth Scrolling to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 60, // adjust for sticky nav
                behavior: "smooth"
            });
        }
    });
});

// 2. Lazy-loading images
document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// 3. Contact Form Validation
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            const name = form.querySelector('input[name="name"]');
            const email = form.querySelector('input[name="email"]');
            const phone = form.querySelector('input[name="phone"]');
            const message = form.querySelector('textarea[name="message"]');

            let valid = true;
            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            [name, email, phone, message].forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.style.border = "2px solid red";
                } else {
                    field.style.border = "";
                }
            });

            if (!emailPattern.test(email.value.trim())) {
                valid = false;
                email.style.border = "2px solid red";
            }

            if (!valid) {
                e.preventDefault();
                alert("Please fill all fields correctly.");
            }
        });
    }
});

// 4. Scroll Animation (Fade-in)
const fadeElements = document.querySelectorAll(".fade-in");
const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

fadeElements.forEach(el => {
    fadeObserver.observe(el);
});
