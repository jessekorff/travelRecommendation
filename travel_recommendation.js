function searchDestination() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('searchResults');
    
    const titleDiv = document.getElementById('title');
    resultDiv.innerHTML = '';
    title.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const countries = data.country || [];
            const temples = data.temple || [];
            const beaches = data.beach || [];

            const matchedCountries = countries.filter(item =>
                item.search.toLowerCase().includes(input)
            );
            const matchedTemples = temples.filter(item =>
                item.search.toLowerCase() === input);
            
            const matchedBeaches = beaches.filter(item =>
                item.search.toLowerCase() === input);

            let output = '';

            if (matchedCountries.length > 0) {
                matchedCountries.forEach(country => {
                    output += `<h3>Country: ${country.name}</h3>`;
            
                    if (country.cities && country.cities.length > 0) {
                        output += `<div><h3>Cities:<ul>`;
                        country.cities.forEach(city => {
                            output += `<li><strong>${city.name}</strong></li>`;
                            output += `<li>${city.description}</li>`;
                            output += `<li><img src="${city.imageUrl}" alt="${city.name}" style="max-width:400px;"></li>`;
                        });
                        output += `</ul></h3></div>`;
                    } else {
                        output += `<p>No cities listed.</p>`;
                    }
                });
            }

            if (matchedTemples.length > 0) {
                output += `<h3>Temples:<ul>`;
                matchedTemples.forEach(temple => {
                    output += `<li>${temple.name}</li>`;
                    output += `<li>${temple.description}</li>`;
                    output += `<li><img src="${temple.imageUrl}" alt="${temple.name}" style="max-width:400px;"></li>`;
                });
                output += `</ul></h3>`;
            }

            if (matchedBeaches.length > 0) {
                output += `<h3>Beaches:<ul>`;
                matchedBeaches.forEach(beach => {
                    output += `<li>${beach.name}</li>`;
                    output += `<li>${beach.description}</li>`;
                    output += `<li><img src="${beach.imageUrl}" alt="${beach.name}" style="max-width:400px;"></li>`;
                });
                output += `</ul></h3>`;
            }

            if (matchedCountries.length === 0 && matchedTemples.length === 0 && matchedBeaches.length === 0) {
                output = 'Destination not found.';
            }

            resultDiv.innerHTML = output;
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
function resetForm() {
    const resultDiv = document.getElementById("searchResults");
    const titleDiv = document.getElementById("title");

    resultDiv.innerHTML = `<h3>Search for beaches, temples, or countries.</h3>`;

    document.getElementById("searchInput").value = '';

    title.innerHTML = `
        <h2 class="bottom-text">TRAVEL THE WORLD</h2>
        <h1 class="text-box">
            With TravelBloom, your next adventure is waiting for you! Our service scours the globe for just the right destination, whether you're looking for the luxury beach or the historical tour.
        </h1>
    `;
}
document.getElementById("btnSearch").addEventListener("click", searchDestination);
document.getElementById("btnReset").addEventListener("click", resetForm);