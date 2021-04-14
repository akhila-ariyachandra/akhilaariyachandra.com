import admin, { verifyIdToken } from "@/lib/firebase-admin";
import type { NextApiHandler } from "next";
import { getMessages } from "@/lib/guestbook";

const GuestbookHandler: NextApiHandler = async (req, res) => {
  const db = admin.firestore();
  const messagesRef = db.collection("messages");
  let decodedToken: admin.auth.DecodedIdToken;

  if (req.method === "POST" || req.method === "DELETE") {
    try {
      decodedToken = await verifyIdToken(req.headers.token);
    } catch {
      return res.status(401).send("Unauthorized");
    }
  }

  if (req.method === "GET") {
    const messages = await getMessages();

    return res.status(200).json(messages);
  } else if (req.method === "POST") {
    if (!req.body.message) {
      return res.status(400).send("Invalid message");
    }

    const messageRef = messagesRef.doc();

    await messageRef.create({
      message: req.body.message,
      uid: decodedToken.uid,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).send("OK");
  } else if (req.method === "DELETE") {
    if (!req.body.id) {
      return res.status(400).send("Invalid ID");
    }

    const messageRef = messagesRef.doc(req.body.id);

    const messageDoc = await messageRef.get();

    // The message doesn't exist
    if (!messageDoc.exists) {
      return res.status(404).send("Not found");
    }

    // The message doesn't belong to the user
    if (decodedToken.uid !== messageDoc.data().uid) {
      return res.status(401).send("Unauthorized");
    }

    await messageRef.delete();

    return res.status(200).send("OK");
  } else {
    return res.status(400).send("Invalid method");
  }
};

export default GuestbookHandler;
