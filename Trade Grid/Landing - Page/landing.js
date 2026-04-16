/*
* SCROLL-SPY: Watches which section is in view and highlights
* the correct nav link automatically.
*
* How it works:
* - IntersectionObserver fires whenever a section enters/leaves
*   the viewport (at the 20% threshold).
* - We track all observed sections; when one becomes visible we
*   remove .active from all nav links and add it only to the one
*   whose data-section matches the visible section's id.
*/

(function () {
    const sections = document.querySelectorAll('#landing, #aboutus, #markets, #contact');
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.section === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.2,       // section must be 20% visible to trigger
        rootMargin: '-60px 0px 0px 0px'  // offset for the fixed nav height
    });

    sections.forEach(section => observer.observe(section));
});
