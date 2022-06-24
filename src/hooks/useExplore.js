import { useEffect, useState } from "react";
import Books from "../components/books/Books";
import LibraryActions from "../components/books/LibraryActions";

const useExplore = (subject) => {
  const [loading, setLoading] = useState(false);
  const [exploreBooks, setExploreBooks] = useState([]);

  //fetch the books from the API based on the subject
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=20&key=${apiKey}`;

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
  }, [subject]);

  //map over the bookResults array and return a Book with the info
  const allBooks = exploreBooks.map((book) => {
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
        book={bookData}
        actionsComponent={<LibraryActions book={bookData} />}
      />
    );
  });

  return [loading, allBooks];
};

export default useExplore;
