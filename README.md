# San Diego Surf Basketball Team Site
This project utilizes semantic HTML with the use of microdata & Wai-Aria. 
It creates a responsive layout using the Bootstrap flexbox framework. 
It minimizes CSS specificity and leverages pseudo-classes/elements, transitions and a custom animation. I originally built this as a static page very early on in my journey and have recently been enjoying blowing it up and making it dynamic with JavaScript.

## Dynamic Features
One of the most obvious things that stood out to me after coming back to revisit and update this project was how much hard-coded HTML I had in it. The schedule page in particular gave me so much anxiety having to doom scroll through a bunch of messy hard coded calendar elements. The Bootstrap style sheets and scripts had also become out of date. Essentially the goal is to update anything repetitive and redundant with JavaScript.

### Header and Footer
After much frustration over having to update the common elements of this older project on every single page, I saved myself from ever having to do that again by creating a dynamically displayed header and footer. Re-branding the team for example in the future would be a much easier task.

### Statistics Page
The Statistics table generated dynamically and pulls API data to populate the table with realistic team statistics.

### Schedule Page
The calendar feature is also generated dynamically with JavaScript and will soon use API data to display game matches (as soon as my free plan to the API becomes available again). This one was so satisfying to get rid of all that redundancy.

### Common Scripts
I am also loading 3 common scripts on each page dynamically to load Bootstrap & jQuery.