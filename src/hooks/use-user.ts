import React from "react";
import firebase from "@/lib/firebase";

const useUser = () => {
  const [user, setUser] = React.useState(null);
  const [loadingUser, setLoadingUser] = React.useState(true);

  React.useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        setLoadingUser(true);

        if (user) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = user;
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser({ uid, displayName, email, photoURL });
        } else {
          setUser(null);
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return { user, loadingUser };
};

export default useUser;
