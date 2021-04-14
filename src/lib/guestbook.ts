import admin from "@/lib/firebase-admin";

export const getMessages = async () => {
  const db = admin.firestore();
  const messagesRef = db.collection("messages").orderBy("timestamp", "desc");
  const snapshot = await messagesRef.get();

  const data = [];

  snapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  const messages = [];

  // Get user data
  for await (const element of data) {
    const { uid, displayName } = await admin.auth().getUser(element.uid);

    const { id, message, timestamp } = element;

    messages.push({
      id,
      message,
      timestamp: timestamp.toDate(),
      user: { uid, displayName },
    });
  }

  return messages;
};
