document.addEventListener('DOMContentLoaded', () => {
    const results = document.getElementById('results');
    
    const catUrl = ('https://api.thecatapi.com/v1/images/search?limit=50')
    fetch(catUrl, {
        method: "GET",
        headers: {
          "Authorization": "Bearer x-api-key", // Use Bearer token if required
          "X-API-KEY": "live_k3ima7uAYMhpJPeceTb5A89mXbbLBVlrBoEVRQ7jnxf1FGB3iaHZNITooDmUV7JZ", // Some APIs use a custom header for API keys
          "Accept": "application/json", // Specify response type
        }
    })
    .then(response => response.json())
    .then(cats => renderCats(cats))


    function renderCats(cats) {
        
        cats.forEach(cat => {
          const li = document.createElement('li');
          li.innerHTML = `This is url to get the Image ${cat.url}`;
          results.appendChild(li);
        });
      }
});
