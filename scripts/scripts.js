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

function init() {
  activeButton();
}

init();