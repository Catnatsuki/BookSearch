import fetch from 'node-fetch';
import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const apiKey = 'my_api_key';


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('C:/Users/rgkul/Downloads/InterviewProject'))

app.post('/search', (req, res) => {
  var query = req.body.q;
  console.log("Query received: ", query);
  const searchQuery = req.body.searchQuery;
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}`)
    .then(response => {
      const books = response.data.items.map(item => {
        const book = {
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          isbn: item.volumeInfo.industryIdentifiers && item.volumeInfo.industryIdentifiers[0].identifier,
          thumbnail: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
        };
        return book;
      });
      res.json(books);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error retrieving books from Google Books API');
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
