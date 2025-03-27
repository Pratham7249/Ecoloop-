function filterCountries() {
    const input = document.querySelector('input[name="query"]');
    const filter = input.value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    
    // Clear previous results
    resultsContainer.innerHTML = '';

    // Example data for demonstration (this should be replaced with actual data)
    const countries = ['USA', 'Canada', 'Mexico', 'Germany', 'France', 'Spain'];

    // Filter countries based on input
    const filteredCountries = countries.filter(country => country.toLowerCase().includes(filter));

    // Display filtered results
    filteredCountries.forEach(country => {
        const div = document.createElement('div');
        div.textContent = country;
        resultsContainer.appendChild(div);
    });
}
