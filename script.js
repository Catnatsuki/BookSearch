//Getting the submit button by its ID and then using an event listener to check for clicks and submits.
const searchingButton = document.getElementById('book-search-form');
searchingButton.addEventListener('submit', (event) => {
  event.preventDefault()
  const searchQuery = document.getElementById('search-input').value;
  axios.post('http://localhost:3000/search', { query: 'John Green' }, { timeout: 10000 })
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
  // if (!searchResults.items || searchResults.items.length === 0) {
  //   searchResultsElement.innerHTML = '<p>No results found</p>';
  //   return;
  // }
  const topResults = searchResults;
  topResults.forEach(book => {
    const title = book.title;
    const authors = book.authors ? book.authors.join(', ') : '';
    const isbn = book.isbn ? book.isbn : '';

    const resultElement = document.createElement('div');
    resultElement.innerHTML = `<p>Title: ${title}</p><p>Author(s): ${authors}</p><p>ISBN: ${isbn}</p>`;
    searchResultsElement.appendChild(resultElement);
  });
  // searchResults.items.forEach(item => {
  //   const title = item.title;
  //   const authors = item.authors ? item.volumeInfo.authorss.join(', ') : '';
  //   const isbn = item.isbn;

  //   const resultElement = document.createElement('div');
  //   resultElement.innerHTML = `<p>Title: ${title}</p><p>Author(s): ${authors}</p><p>ISBN: ${isbn}</p>`;
  //   searchResultsElement.appendChild(resultElement);
  // });
}