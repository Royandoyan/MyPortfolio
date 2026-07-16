// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const navLinksList = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-links a");

menuBtn.onclick = () => {
    navLinksList.classList.toggle("active");
};

// Smooth scroll for all anchor links
const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

allAnchorLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default jump
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
        
        // Close mobile menu if open
        navLinksList.classList.remove("active");
    });
});

// Slide animation for sections (excluding hero)
const sections = document.querySelectorAll("section:not(#home)");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

sections.forEach((section) => {
    observer.observe(section);
});

// ScrollSpy to highlight active navigation link
const scrollSpy = () => {
    let current = '';
    const scrollPosition = window.scrollY + 150; // Offset for fixed header

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.style.color = 'white';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#38bdf8';
        }
    });
};

// Run scrollSpy on page load and scroll
window.addEventListener('load', scrollSpy);
window.addEventListener('scroll', scrollSpy);
