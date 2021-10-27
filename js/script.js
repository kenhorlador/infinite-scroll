// Constants
const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []


// Unsplash API
// Constants
const count = 30;
const apiKey = '_mG-1AlpA6SdLYhWJjAwVGwD1uU_vMuzgpmGLUwlsc8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded)
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
    console.log('ready = ', ready)
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Display Photos
function displayPhotos() {
  imagesLoaded = 0 
  totalImages = photosArray.length
  console.log('total images = ', totalImages)
  photosArray.forEach((photo) => {
    // Create anchor element to connect to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html)
    // item.setAttribute('target', '_blank')
    
    // Helper Function =>
    setAttributes(item, {
      href: photo.links.html,
      target: 'blank'
    })

    // Create image for photo
    const img = document.createElement('img')
    // img.setAttribute('src', photo.urls.regular)
    // img.setAttribute('alt', photo.alt_description)
    // img.setAttribute('title', photo.alt_description)
    
    // Helper Function =>
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    })
    // Event Listner, check when each is finished loading
    img.addEventListener('load', imageLoaded)

    // Put image inside the anchor element, then put both inside imageContainer Element
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    console.log(photosArray)
    displayPhotos()
  } 
  
  catch (error) {
    // Catch error
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false
    getPhotos()
  }
})

// On Load
getPhotos();