document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Animation for Blog Posts ---
    const posts = document.querySelectorAll('.blog-post-wrapper');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // This adds a slight delay to each card for a staggered effect
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100);
                
                // Stop observing the post once it has been animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger the animation when 10% of the post is visible
    });

    // Tell the observer to watch each of the blog posts
    posts.forEach(post => {
        observer.observe(post);
    });

});