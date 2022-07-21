import React, { useContext, useEffect, useState } from "react";
import styled from "../components/pagesStyles/Library.module.css";
import { useSearchParams } from "react-router-dom";
import BooksForLibrary from "../components/library/BooksForLibrary";
import LibraryNav from "../components/library/LibraryNav";
import Container from "../helpers/wrapper/Container";
import { getDocs } from "firebase/firestore";
import { libraryCollection } from "../firebase";
import { useDispatch } from "react-redux";
import { AuthContext } from "../contexts/authContext";
import { updateLibraryState } from "../store/features/library/librarySlice";

const Library = () => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    //get the data from the database
    const getData = async () => {
      const data = await getDocs(libraryCollection).then((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return { document: doc.data(), id: doc.id };
        });
        return data;
      });
      setData(data);
      console.log("hi");
    };
    getData();
    return () => setData([]);
  }, []);

  //when there is data in the database, update the library state
  useEffect(() => {
    if (data.length !== 0) {
      dispatch(updateLibraryState({ user: currentUser, userData: data }));
    }
  }, [data, currentUser, dispatch]);

  return (
    <section className={styled["library-container"]}>
      <Container>
        <LibraryNav
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <BooksForLibrary
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </Container>
    </section>
  );
};

export default Library;
