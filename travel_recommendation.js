function searchDestination() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('searchResults');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const countries = data.country;
            const country = countries.find(item => item.search.toLowerCase() === input);

            const temples = data.temple;
            const temple = temples.find(item => item.search.toLowerCase() === input);
            if (country) {
                const countryNames = countries.map(country => country.name).join(', ');
                resultDiv.innerHTML = `<h3>${countryNames}</h3>`;
            }
            if (temple) {
                const templeNames = temple.map(country => temple.name).join(', ');
                resultDiv.innerHTML = `<h3>${templeNames}</h3>`;
            } else {
                resultDiv.innerHTML = 'Destination not found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
        btnSearch.addEventListener('click', searchDestination);
