function searchDestination() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('searchResults');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const countries = data.country
            const country = countries.find(item => item.search.toLowerCase() === input);

            if (country) {
                resultDiv.innerHTML = 'Destination found.';

                const countryNames = countries.map(country => country.name).join(', ');
                resultDiv.innerHTML += `<h2>${countryNames}</h2>`;
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
