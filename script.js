//Getting the submit button by its ID and then using an event listener to check for clicks and submits.
const searchingButton = document.getElementById('book-search-form');
searchingButton.addEventListener('submit', (event) => {
  event.preventDefault()
  // const searchQuery = document.getElementById('searchbar').value;
  const searchQuery = document.getElementById('searchbar').value;
  console.log("Query extracted: ",searchQuery);
  axios.post('http://localhost:3000/search', { searchQuery: searchQuery }, { timeout: 10000 })
    .then(response => {
      // Handle the response from the server
      const searchResults = response.data;
      displaySearchResults(searchResults);
    })
    .catch(error => {
      // Handle errors
      console.error(error);
    });
});

// Funtion for displaying the obtained results on the HTML page
function displaySearchResults(searchResults) {
  const searchResultsElement = document.getElementById('search-results');
  searchResultsElement.innerHTML = '';
  const topResults = searchResults;
  topResults.forEach(book => {
    const title = book.title;
    const authors = book.authors ? book.authors.join(', ') : '';
    const isbn = book.isbn ? book.isbn : '';

    const resultElement = document.createElement('div');
    resultElement.innerHTML = `<p>Title: ${title}</p><p>Author(s): ${authors}</p><p>ISBN: ${isbn}</p><br>`;
    searchResultsElement.appendChild(resultElement);
  });
}