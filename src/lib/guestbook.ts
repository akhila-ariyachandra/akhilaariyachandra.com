import admin from "@/lib/firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

export const getComments = async () => {
  const db = getFirestore(admin);
  const auth = getAuth(admin);
  const commentsRef = db.collection("comments").orderBy("timestamp", "desc");
  const snapshot = await commentsRef.get();

  const data = [];

  snapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  const comments = [];

  // Get user data
  for await (const element of data) {
    const { uid, displayName } = await auth.getUser(element.uid);

    const { id, comment, timestamp } = element;

    comments.push({
      id,
      comment,
      timestamp: timestamp.toDate(),
      user: { uid, displayName },
    });
  }

  return comments;
};
