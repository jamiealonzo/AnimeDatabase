// Fetch Anime data from Jikan API based on user input
async function fetchAnime(query) {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`);
    const data = await response.json();
    return data.data;
}

// Display search results (anime list)
function displayAnimeList(animeArray) {
    const animeList = document.getElementById('anime-list');
    animeList.innerHTML = '';  // Clear previous results

    animeArray.forEach(anime => {
        const animeItem = document.createElement('div');
        animeItem.classList.add('anime-item');
        
        animeItem.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
        `;

        // Add click event to show more details
        animeItem.addEventListener('click', () => {
            displayAnimeDetails(anime);
        });

        animeList.appendChild(animeItem);
    });
}

// Display detailed information about the selected anime
function displayAnimeDetails(anime) {
    const animeDetails = document.getElementById('anime-details');
    animeDetails.innerHTML = `
        <h2>${anime.title}</h2>
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" style="width: 200px;">
        <p><strong>Episodes:</strong> ${anime.episodes}</p>
        <p><strong>Score:</strong> ${anime.score}</p>
        <p><strong>Status:</strong> ${anime.status}</p>
        <p><strong>Synopsis:</strong> ${anime.synopsis}</p>
    `;
}

// Handle the search button click event
document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search').value;
    if (query) {
        const animeData = await fetchAnime(query);
        displayAnimeList(animeData);
    }
});
