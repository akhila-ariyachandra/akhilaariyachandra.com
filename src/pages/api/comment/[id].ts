import admin from "src/lib/firebaseAdmin";
import { NextApiHandler } from "next";
import { formatDate } from "src/lib/helpers";

const Comments: NextApiHandler = async (req, res) => {
  const {
    query: { id },
  } = req;

  if (!id) {
    return res.status(400).json({
      message: "Article id not provided",
    });
  }

  const db = admin.firestore();
  const commentsRef = db.collection("comments");

  const snapshot = await commentsRef
    .where("id", "==", id)
    .orderBy("date")
    .get();

  const rawComments = [];
  const comments = [];

  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      rawComments.push({ ...doc.data(), id: doc.id });
    });

    for (const doc of rawComments) {
      const user = await admin.auth().getUser(doc.userUid);

      comments.push({
        id: doc.id,
        userUid: doc.userUid,
        name: user.displayName,
        picture: user.photoURL,
        body: doc.body,
        date: formatDate(doc.date.toDate().toString()),
      });
    }
  }

  return res.status(200).send(comments);
};

export default Comments;
