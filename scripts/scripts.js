function activeButton() { // this function adds/removes the active class depending on current window
  document.addEventListener('DOMContentLoaded', function() {
    // Get the current window location path
    const currentPath = window.location.pathname;

    // Select all buttons in the navigation panel
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        // Create an anchor element to parse the button's href
        const buttonPath = new URL(button.href, window.location.origin).pathname;

        // Normalize paths to handle both .htm and .html extensions
        const normalizedCurrentPath = currentPath.replace(/\.html?$/, '');
        const normalizedButtonPath = buttonPath.replace(/\.html?$/, '');

        // Check if the normalized paths match
        if (normalizedButtonPath === normalizedCurrentPath) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
  });
}

function headScripts() {
  document.addEventListener('DOMContentLoaded', function () {
    const scripts = [
      {
        src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        integrity:
          'sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo',
        crossorigin: 'anonymous',
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js',
        integrity:
          'sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut',
        crossorigin: 'anonymous',
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js',
        integrity:
          'sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO',
        crossorigin: 'anonymous',
      },
    ];

    scripts.forEach(({ src, integrity, crossorigin }) => {
      const script = document.createElement('script');
      script.src = src;
      if (integrity) script.integrity = integrity;
      if (crossorigin) script.crossOrigin = crossorigin;
      script.defer = true;
      document.body.appendChild(script);
    });
  });
}

function headerFooter() {
  document.addEventListener("DOMContentLoaded", function () {
    const headerHTML = `
      <header class="row" tabindex="0">
        <h1 class="col-12 text-info font-italic site-heading" tabindex="0">San Diego Surf</h1>
        <nav class="col-12 navbar navbar-expand-md navbar-light bg-light" tabindex="0">
          <a class="navbar-brand" href="#"><img src="images/wave.svg" alt="surf logo" class="logo" /></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapseNav"
            aria-controls="collapseNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapseNav">
           <ul class="d-flex navbar-nav">
              <li class="flex-fill nav-item"><a class="nav-link btn m-1" href="./index.html">Home</a></li>
              <li class="flex-fill nav-item"><a class="visually-hidden nav-link btn" href="#mainContent">Skip to Content</a></li>
              <li class="flex-fill nav-item"><a class="nav-link btn m-1" href="./schedule.html">Schedule & Tickets</a></li>
              <li class="flex-fill nav-item"><a class="nav-link btn m-1" href="./statistics.html">News & Statistics</a></li>
              <li class="flex-fill nav-item"><a class="nav-link btn m-1" href="./contact.html">Contact & Information</a></li>
            </ul>
          </div>
        </nav>
      </header>
    `;
    const footerHTML = `
      <footer class="row m-3" tabindex="0">
        <nav tabindex="0">
          <ul class="nav d-flex justify-content-center">
            <li class="mx-5"><a href="#">Rules & Regulations</a></li>
            <li class="mx-5"><a href="#">Contact Us</a></li>
            <li class="mx-5"><a href="#">&copy;Copyright Information</a></li>
          </ul>
        </nav>
      </footer>
    `;

    const wrapper = document.querySelector('.container.bg-light.wrapper');
    if (wrapper) {
      wrapper.insertAdjacentHTML('afterbegin', headerHTML);
      wrapper.insertAdjacentHTML("beforeend", footerHTML);
    } else {
      console.warn('Wrapper element not found.');
    }
  });
}

function init() {
  headScripts();
  headerFooter();
  activeButton();
}

init();