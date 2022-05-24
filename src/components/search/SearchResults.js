import React, { useEffect, useState } from "react";
import styled from "./SearchResults.module.css";
import { Navigate, useLocation } from "react-router-dom";
import Books from "../books/Books";
import Container from "../../helpers/wrapper/Container";
import Modal from "../../helpers/modal/Modal";
import { GiBookshelf } from "react-icons/gi";
import Heading from "../../helpers/heading/Heading";
import Summary from "../books/Summary";

const SearchResults = () => {
  // states
  const [bookResults, setBookResults] = useState([]);
  const [loading, setLoading] = useState(false);

  /** the location object returns information about the page
   * convert the location object into a javascript object
   * get the search property and store is value in a constant  */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");

  /**
   * url includes searchQuery, orderBy relevance and maxResults of 40
   * setBookResults  to the results from the fetched data
   */
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    const url = ` https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&orderBy=relevance&maxResults=40&key=${apiKey}`;

    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setBookResults(data.items);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchBook();
  }, [searchQuery]);

  /**map over the bookResults array and return a Book with the info
   * destucture properties from the book object and pass them as props
   */
  const allBooks = bookResults.map((book) => {
    const { id, searchInfo } = book;
    const { title, authors, publishedDate, categories, imageLinks } =
      book.volumeInfo;
    const bookData = {
      id,
      searchInfo,
      title,
      authors,
      publishedDate,
      categories,
      imageLinks,
    };
    return (
      <Books
        key={book.id}
        modalComponent={<Summary book={bookData} />}
        book={bookData}
      />
    );
  });

  //props for heading component
  const text = (
    <>
      Showing results for <span>{searchQuery}</span>
    </>
  );

  /**prevent user from visiting the route manually route,
   * the user can only visit this page if there is a search term*/
  if (!searchQuery) {
    return <Navigate to="/" />;
  }

  return (
    <section className={styled.results}>
      {/* when loading show Modal */}
      {loading && (
        <Modal>
          <GiBookshelf size="50px" />
        </Modal>
      )}

      <Container>
        {allBooks && <Heading className="heading-md" text={text} />}
        <div className={styled.allBooks}>{allBooks}</div>
      </Container>
    </section>
  );
};

export default SearchResults;

// {
//   "kind": "books#volume",
//   "id": "Ef4PDQAAQBAJ",
//   "etag": "Nqj6L3rJHeA",
//   "selfLink": "https://www.googleapis.com/books/v1/volumes/Ef4PDQAAQBAJ",
//   "volumeInfo": {
//     "title": "Next To Never",
//     "authors": [
//       "Penelope Douglas"
//     ],
//     "publisher": "Penguin",
//     "publishedDate": "2017-01-17",
//     "description": "New York Times bestselling author Penelope Douglas introduces Quinn, younger sister to Jared, Madoc, and Jaxon, in this compelling novella in the Fall Away series. Quinn Caruthers has several problems: her father, Jason, and her three older brothers, Jared, Madoc, and Jaxon. Under the close watch of the men in her family, Quinn has found it nearly impossible to spread her wings—or even date—without them jumping in to hover. And when a family friend—several years older—from her childhood captures her heart, she knows they’re going to be a problem. Lucas Morrow is a man—experienced, sophisticated, and important. And knowing her brothers, he may as well be forbidden. But Lucas left town years ago and shows no signs of returning. Quinn knows she shouldn’t wait for him anymore. But then a package turns up on her doorstep with no return address and its contents reveal family secrets that threaten to turn Quinn’s world upside down. She’s never asked about the tumultuous path of her parents’ romantic history, but she soon learns their happy marriage had a very rocky and passionate start. As she begins to see things around her with new eyes, Quinn will have to make tough choices about whether she’ll keep waiting…or finally go after what she really wants.",
//     "industryIdentifiers": [
//       {
//         "type": "ISBN_13",
//         "identifier": "9780399584923"
//       },
//       {
//         "type": "ISBN_10",
//         "identifier": "0399584927"
//       }
//     ],
//     "readingModes": {
//       "text": true,
//       "image": false
//     },
//     "pageCount": 183,
//     "printType": "BOOK",
//     "categories": [
//       "Fiction"
//     ],
//     "averageRating": 3,
//     "ratingsCount": 1,
//     "maturityRating": "NOT_MATURE",
//     "allowAnonLogging": true,
//     "contentVersion": "1.5.6.0.preview.2",
//     "panelizationSummary": {
//       "containsEpubBubbles": false,
//       "containsImageBubbles": false
//     },
//     "imageLinks": {
//       "smallThumbnail": "http://books.google.com/books/content?id=Ef4PDQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
//       "thumbnail": "http://books.google.com/books/content?id=Ef4PDQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
//     },
//     "language": "en",
//     "previewLink": "http://books.google.com/books?id=Ef4PDQAAQBAJ&dq=penelope+douglas&hl=&cd=24&source=gbs_api",
//     "infoLink": "http://books.google.com/books?id=Ef4PDQAAQBAJ&dq=penelope+douglas&hl=&source=gbs_api",
//     "canonicalVolumeLink": "https://books.google.com/books/about/Next_To_Never.html?hl=&id=Ef4PDQAAQBAJ"
//   },
//   "saleInfo": {
//     "country": "JM",
//     "saleability": "NOT_FOR_SALE",
//     "isEbook": false
//   },
//   "accessInfo": {
//     "country": "JM",
//     "viewability": "NO_PAGES",
//     "embeddable": false,
//     "publicDomain": false,
//     "textToSpeechPermission": "ALLOWED",
//     "epub": {
//       "isAvailable": true
//     },
//     "pdf": {
//       "isAvailable": true
//     },
//     "webReaderLink": "http://play.google.com/books/reader?id=Ef4PDQAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
//     "accessViewStatus": "NONE",
//     "quoteSharingAllowed": false
//   },
//   "searchInfo": {
//     "textSnippet": "New York Times bestselling author Penelope Douglas introduces Quinn, younger sister to Jared, Madoc, and Jaxon, in this compelling novella in the Fall Away series."
//   }
// }
