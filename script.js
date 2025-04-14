document.addEventListener("DOMContentLoaded", function() {
    // Back to top button functionality
    const backToTopBtn = document.getElementById("backToTopBtn");
    
    window.addEventListener("scroll", () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Use Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationClass = element.dataset.animation || 'animate__fadeIn';
                element.classList.add(animationClass);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        // Remove any pre-existing animation classes
        element.classList.remove(
            'animate__fadeInDown', 
            'animate__fadeInUp', 
            'animate__fadeInLeft', 
            'animate__fadeInRight',
            'animate__zoomIn'
        );
        
        // Store the desired animation as a data attribute
        const currentClasses = element.className;
        if (currentClasses.includes('animate__fadeInDown')) {
            element.dataset.animation = 'animate__fadeInDown';
        } else if (currentClasses.includes('animate__fadeInUp')) {
            element.dataset.animation = 'animate__fadeInUp';
        } else if (currentClasses.includes('animate__fadeInLeft')) {
            element.dataset.animation = 'animate__fadeInLeft';
        } else if (currentClasses.includes('animate__fadeInRight')) {
            element.dataset.animation = 'animate__fadeInRight';
        } else if (currentClasses.includes('animate__zoomIn')) {
            element.dataset.animation = 'animate__zoomIn';
        }
        
        // Start observing
        observer.observe(element);
    });
});