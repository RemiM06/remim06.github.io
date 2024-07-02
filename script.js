document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.animate__animated');

    elements.forEach(element => {
        element.classList.add('animate__animated');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const backToTopBtn = document.getElementById("backToTopBtn");
    
    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    // Smooth scrolling to top
    backToTopBtn.addEventListener("click", () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});
