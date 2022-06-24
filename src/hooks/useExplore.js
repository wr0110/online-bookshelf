import { useEffect, useState } from "react";
import Books from "../components/books/Books";
import LibraryActions from "../components/books/LibraryActions";

const useExplore = (query, subject) => {
  const [loading, setLoading] = useState(false);
  const [exploreBooks, setExploreBooks] = useState([]);

  //fetch the books from the API based on the subject
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}subject:${subject}&maxResults=20&key=${apiKey}`;

    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setExploreBooks(data.items);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchBook();
  }, [query, subject]);

  /**map over the bookResults array and return a Book with the info
     destucture properties from the book object and pass them as props
     substitute the searchInfo object with the description property
     calculate the key because some books will be repeated
     */

  const allBooks = exploreBooks?.map((book, i) => {
    const { id } = book;
    const {
      title,
      authors,
      publishedDate,
      categories,
      imageLinks,
      description,
    } = book.volumeInfo;

    const bookData = {
      id,
      searchInfo: { textSnippet: description },
      title,
      authors,
      publishedDate,
      categories,
      imageLinks,
    };
    return (
      <Books
        key={Date.now() + i}
        book={bookData}
        actionsComponent={<LibraryActions book={bookData} />}
      />
    );
  });

  return [loading, allBooks];
};

export default useExplore;
