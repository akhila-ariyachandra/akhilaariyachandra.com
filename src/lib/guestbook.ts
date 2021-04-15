import admin from "@/lib/firebase-admin";

export const getComments = async () => {
  const db = admin.firestore();
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
    const { uid, displayName } = await admin.auth().getUser(element.uid);

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
