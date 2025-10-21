// Dean Attali / Beautiful Jekyll 2023
// Enhanced by Leonardo Martin Alarcon - jQuery removed, vanilla JS, performance optimized

let BeautifulJekyllJS = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    setTimeout(BeautifulJekyllJS.initNavbar, 10);

    // Shorten the navbar after scrolling a little bit down
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (navbar && window.pageYOffset > 50) {
        navbar.classList.add('top-nav-short');
      } else if (navbar) {
        navbar.classList.remove('top-nav-short');
      }
    });

    // On mobile, hide the avatar when expanding the navbar menu
    const mainNavbar = document.getElementById('main-navbar');
    if (mainNavbar) {
      mainNavbar.addEventListener('show.bs.collapse', function () {
        document.querySelector('.navbar')?.classList.add('top-nav-expanded');
      });
      mainNavbar.addEventListener('hidden.bs.collapse', function () {
        document.querySelector('.navbar')?.classList.remove('top-nav-expanded');
      });
    }

    // show the big header image
    BeautifulJekyllJS.initImgs();

    BeautifulJekyllJS.initSearch();

    BeautifulJekyllJS.initDarkMode();
  },

  initDarkMode : function() {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Create and add dark mode toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'dark-mode-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    toggleButton.setAttribute('title', 'Toggle dark mode');
    toggleButton.innerHTML = BeautifulJekyllJS.getThemeIcon();

    document.body.appendChild(toggleButton);

    // Toggle dark mode on button click
    toggleButton.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      toggleButton.innerHTML = BeautifulJekyllJS.getThemeIcon();
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        toggleButton.innerHTML = BeautifulJekyllJS.getThemeIcon();
      }
    });
  },

  getThemeIcon : function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = currentTheme === 'dark' || (!currentTheme && prefersDark);

    return isDark
      ? '<i class="fas fa-sun" style="color: #ffd700;"></i>'
      : '<i class="fas fa-moon" style="color: #4169e1;"></i>';
  },

  initNavbar : function() {
    // Set the navbar-dark/light class based on its background color
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const bgColor = window.getComputedStyle(navbar).backgroundColor;
    const rgb = bgColor.match(/\d+/g);
    if (!rgb) return;

    const brightness = Math.round((
      parseInt(rgb[0]) * 299 +
      parseInt(rgb[1]) * 587 +
      parseInt(rgb[2]) * 114
    ) / 1000);

    if (brightness <= 125) {
      navbar.classList.remove('navbar-light');
      navbar.classList.add('navbar-dark');
    } else {
      navbar.classList.remove('navbar-dark');
      navbar.classList.add('navbar-light');
    }
  },

  initImgs : function() {
    // If the page has large images to randomly select from, choose an image
    const bigImgsEl = document.getElementById('header-big-imgs');
    if (bigImgsEl) {
      BeautifulJekyllJS.bigImgEl = bigImgsEl;
      BeautifulJekyllJS.numImgs = parseInt(bigImgsEl.getAttribute('data-num-img'));

      // set an initial image
      const imgInfo = BeautifulJekyllJS.getImgInfo();
      BeautifulJekyllJS.setImg(imgInfo.src, imgInfo.desc);

      // For better UX, prefetch the next image so that it will already be loaded when we want to show it
      const getNextImg = function() {
        const imgInfo = BeautifulJekyllJS.getImgInfo();
        const src = imgInfo.src;
        const desc = imgInfo.desc;

        const prefetchImg = new Image();
        prefetchImg.src = src;

        setTimeout(function(){
          const img = document.createElement('div');
          img.className = 'big-img-transition';
          img.style.backgroundImage = `url(${src})`;

          const introHeader = document.querySelector('.intro-header.big-img');
          if (introHeader) {
            introHeader.prepend(img);
            setTimeout(function(){ img.style.opacity = '1'; }, 50);

            setTimeout(function() {
              BeautifulJekyllJS.setImg(src, desc);
              img.remove();
              getNextImg();
            }, 1000);
          }
        }, 6000);
      };

      // If there are multiple images, cycle through them
      if (BeautifulJekyllJS.numImgs > 1) {
        getNextImg();
      }
    }
  },

  getImgInfo : function() {
    const randNum = Math.floor((Math.random() * BeautifulJekyllJS.numImgs) + 1);
    const src = BeautifulJekyllJS.bigImgEl.getAttribute('data-img-src-' + randNum);
    const desc = BeautifulJekyllJS.bigImgEl.getAttribute('data-img-desc-' + randNum);

    return {
      src : src,
      desc : desc
    }
  },

  setImg : function(src, desc) {
    const introHeader = document.querySelector('.intro-header.big-img');
    if (introHeader) {
      introHeader.style.backgroundImage = `url(${src})`;
    }

    const imgDesc = document.querySelector('.img-desc');
    if (imgDesc) {
      if (desc && desc !== 'false') {
        imgDesc.textContent = desc;
        imgDesc.style.display = 'block';
      } else {
        imgDesc.style.display = 'none';
      }
    }
  },

  initSearch : function() {
    const searchOverlay = document.getElementById('beautifuljekyll-search-overlay');
    if (!searchOverlay) {
      return;
    }

    const searchLink = document.getElementById('nav-search-link');
    const searchInput = document.getElementById('nav-search-input');
    const searchExit = document.getElementById('nav-search-exit');

    if (searchLink) {
      searchLink.addEventListener('click', function(e) {
        e.preventDefault();
        searchOverlay.style.display = 'block';
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
        document.body.classList.add('overflow-hidden');
      });
    }

    if (searchExit) {
      searchExit.addEventListener('click', function(e) {
        e.preventDefault();
        searchOverlay.style.display = 'none';
        document.body.classList.remove('overflow-hidden');
      });
    }

    document.addEventListener('keyup', function(e) {
      if (e.key === 'Escape') {
        searchOverlay.style.display = 'none';
        document.body.classList.remove('overflow-hidden');
      }
    });
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', BeautifulJekyllJS.init);
