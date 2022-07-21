import { getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../contexts/authContext";
import { libraryCollection } from "../../firebase";
import Loading from "../../helpers/modal/Loading";
import { updateLibraryState } from "../../store/features/library/librarySlice";

const GetLibraryFromFirebase = () => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //get the data from the database
    setLoading(true);
    try {
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
    } catch (error) {
      console.log(error);
    }
    setLoading(false);

    // return () => setData([]);
  }, []);

  //when there is data in the database, update the library state
  useEffect(() => {
    if (data.length !== 0) {
      dispatch(updateLibraryState({ user: currentUser, userData: data }));
    }
  }, [data, currentUser, dispatch]);
  return <div>{loading && <Loading />}</div>;
};

export default GetLibraryFromFirebase;
