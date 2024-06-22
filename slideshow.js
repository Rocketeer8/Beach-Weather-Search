const slideshowImages = document.querySelectorAll(".intro-slideshow img");
const nextImageDelay = 5000;
let currentImageCounter = 0; // setting a variable to keep track of the current image (slide)

// Initially show the first image
slideshowImages[currentImageCounter].style.opacity = 1;

setInterval(nextImage, nextImageDelay);

function nextImage() {
    // Fade out the current image
    slideshowImages[currentImageCounter].style.opacity = 0;

    // Increment the counter and wrap around using modulus operator
    currentImageCounter = (currentImageCounter + 1) % slideshowImages.length;
    
    // Fade in the next image
    slideshowImages[currentImageCounter].style.opacity = 1;
}
