document.addEventListener('DOMContentLoaded', () =>{
    const mobileNavbarMenu = document.querySelector('.mobile-navbar-menu');
    const navbar = document.querySelector('.logo-and-nav');
    const submitBtn = document.querySelector('.submitBtn');
    const inputURLFied = document.getElementById('short-link');
    const errorMessage = document.querySelector('.errorMessage');
    const shortLinkHTMLSection = document.querySelector('.shorten-URL-link')

  mobileNavbarMenu.onclick = (event) => {
    event.stopPropagation();
    navbar.classList.toggle('mobile-nav')
  } 

  document.addEventListener('click', (event) => {

      if (!navbar.contains(event.target)) {
        navbar.classList.remove('mobile-nav');
      }
  });


  submitBtn.onclick = async (event) => {
    event.preventDefault();
    event.target.style.cursor = 'wait';

    const longUrl = inputURLFied.value;
    

    if (longUrl) {
      try {
        await getShortUrl(longUrl); 
      } finally {
        event.target.style.cursor = 'pointer'; 
      }
    }else{
      errorMessage.classList.add('error'); 
      
      inputURLFied.classList.add('userError');

      event.target.style.cursor = 'pointer';
    }
    
  }

  inputURLFied.onfocus = () => {
    inputURLFied.classList.remove('userError');
    errorMessage.classList.remove('error');
  }


  const getShortUrl = async (longUrl) => {
    const apiKey = 'pax2N1DSeifVtwlvDAjKiaGDM8a1IzJgmWOHQcWKyUR8b2kbP92T4btmHFoi'; 
  
    try {
      const response = await fetch('https://api.tinyurl.com/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: longUrl
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();

      displayBothLongAndShortURL(data,longUrl)
  
    } catch (error) {
      errorMessage.classList.add('error'); 
      
      inputURLFied.classList.add('userError');
    }
  };


  const displayBothLongAndShortURL = (shortlink, longUrl) => {
    const URLHTMLContent = document.createElement('div');
    URLHTMLContent.classList.add('URL-link');
  
    URLHTMLContent.innerHTML = `
      <p class="long-URL-link">${longUrl}</p>
      <p class="short-URL-link">${shortlink.data.tiny_url}</p>
      <button class="copy">copy</button>
    `;
  
    shortLinkHTMLSection.appendChild(URLHTMLContent);

  };
  
  //COPY TO CLIPBOARD

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('copy')) {
    const container = event.target.closest('.URL-link'); 
    const shortUrlElement = container.querySelector('.short-URL-link'); 
    const shortUrlText = shortUrlElement.textContent;

    // Clipboard API
    navigator.clipboard.writeText(shortUrlText)
      .then(() => {
        alert('Short URL copied to clipboard!');
        event.target.textContent = 'copied!'
        event.target.style.backgroundColor = 'hsl(259, 23%, 21%)';
        event.target.style.opacity = '1';
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }
});

  
  
})