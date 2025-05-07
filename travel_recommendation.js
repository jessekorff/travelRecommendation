function searchDestination() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('searchResults');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const countries = data.country || [];
            const temples = data.temple || [];

            // Use filter to find all matches (can match partially)
            const matchedCountries = countries.filter(item =>
                item.search.toLowerCase().includes(input)
            );
            const matchedTemples = temples.filter(item =>
                item.search.toLowerCase() === input);

            let output = '';

            if (matchedCountries.length > 0) {
                output += `<h3>Countries:</h3><ul>`;
                matchedCountries.forEach(country => {
                    output += `<li>${country.name}</li>`;
                });
                output += `</ul>`;
            }

            if (matchedTemples.length > 0) {
                output += `<h3>Temples:</h3><ul>`;
                matchedTemples.forEach(temple => {
                    output += `<li>${temple.name}</li>`;
                });
                output += `</ul>`;
            }

            if (matchedCountries.length === 0 && matchedTemples.length === 0) {
                output = 'Destination not found.';
            }

            resultDiv.innerHTML = output;
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

btnSearch.addEventListener('click', searchDestination);
