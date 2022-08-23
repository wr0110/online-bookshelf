import { getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { libraryCollection } from "../firebase";
import Loading from "../helpers/modal/Loading";

const useGetDataFromFirebase = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [dataForUser, setDataForUser] = useState([]);
  const [loading, setLoading] = useState(false);

  //get the data from the database
  useEffect(() => {
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
      };
      getData();
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  }, []);

  //when the data is available, find the current user's data and set the state
  useEffect(() => {
    if (data && data.length !== 0) {
      const currentUserData = data.find(
        (item) => item.id === currentUser?.userId
      );
      setDataForUser(currentUserData?.document?.userBooks);
    }
  }, [data, currentUser]);

  if (loading) return <Loading />;
  else return dataForUser;
};

export default useGetDataFromFirebase;
