import { getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { libraryCollection } from "../firebase";

const useGetDataFromFirebase = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [dataForUser, setDataForUser] = useState([]);

  //get the data from the database
  useEffect(() => {
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

  return dataForUser;
};

export default useGetDataFromFirebase;
