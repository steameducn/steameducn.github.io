document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    // Header shadow on scroll
    function updateHeader() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader);
    updateHeader();

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        const isOpen = navList.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navList.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!header.contains(event.target) && navList.classList.contains('open')) {
            navList.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});


// Session modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('session-modal');
    if (!modal) return;

    const modalTitle = modal.querySelector('#modal-title');
    const modalYear = modal.querySelector('.modal-year');
    const modalCity = modal.querySelector('.modal-city');
    const modalTheme = modal.querySelector('.modal-theme');
    const modalGallery = modal.querySelector('.modal-gallery');
    const modalDescription = modal.querySelector('.modal-description');
    const modalClose = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');

    function openModal(item) {
        modalTitle.textContent = item.dataset.title;
        modalYear.textContent = item.dataset.year;
        modalCity.textContent = item.dataset.city;
        modalTheme.textContent = item.dataset.theme;
        modalDescription.textContent = item.dataset.description;

        modalGallery.innerHTML = '';
        if (item.dataset.images) {
            item.dataset.images.split(',').forEach(function(src) {
                src = src.trim();
                if (!src) return;
                const img = document.createElement('img');
                img.src = src;
                img.alt = item.dataset.title;
                img.loading = 'lazy';
                modalGallery.appendChild(img);
            });
        }

        modal.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.hidden = true;
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.timeline-item').forEach(function(item) {
        item.addEventListener('click', function() {
            openModal(item);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });
});
