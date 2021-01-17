import admin, { verifyIdToken } from "src/lib/firebaseAdmin";
import { NextApiHandler } from "next";

const Comment: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    let user: admin.auth.UserRecord;

    try {
      const token = req.headers.token;
      const decodedToken = await verifyIdToken(token);
      user = await admin.auth().getUser(decodedToken.uid);
    } catch (error) {
      return res.status(401).send("Unauthorised");
    }

    const {
      body: { id, body },
    } = req;

    if (!id || !body) {
      return res.status(400).send("Incorrect Body");
    }

    const db = admin.firestore();
    const docRef = db.collection("comments").doc();

    try {
      await docRef.set({
        userUid: user.uid,
        id,
        body,
        date: new Date(),
      });
    } catch {
      return res.status(500).send("Error saving comment");
    }

    return res.status(200).send("OK");
  } else {
    return res.status(405).send("Incorrect Method");
  }
};

export default Comment;
