import admin, { verifyIdToken } from "@/lib/firebase-admin";
import type { NextApiHandler } from "next";
import type { DecodedIdToken } from "firebase-admin/auth";
import { getComments } from "@/lib/guestbook";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const GuestbookHandler: NextApiHandler = async (req, res) => {
  const db = getFirestore(admin);
  const commentsRef = db.collection("comments");
  let decodedToken: DecodedIdToken;

  if (req.method === "POST" || req.method === "DELETE") {
    try {
      decodedToken = await verifyIdToken(req.headers.token);
    } catch {
      return res.status(401).send("Unauthorized");
    }
  }

  if (req.method === "GET") {
    const comments = await getComments();

    return res.status(200).json(comments);
  } else if (req.method === "POST") {
    if (!req.body.comment) {
      return res.status(400).send("Invalid comment");
    }

    const commentRef = commentsRef.doc();

    await commentRef.create({
      comment: req.body.comment,
      uid: decodedToken.uid,
      timestamp: FieldValue.serverTimestamp(),
    });

    return res.status(200).send("OK");
  } else if (req.method === "DELETE") {
    if (!req.body.id) {
      return res.status(400).send("Invalid ID");
    }

    const commentRef = commentsRef.doc(req.body.id);

    const commentDoc = await commentRef.get();

    // The comment doesn't exist
    if (!commentDoc.exists) {
      return res.status(404).send("Not found");
    }

    // The comment doesn't belong to the user
    if (decodedToken.uid !== commentDoc.data().uid) {
      return res.status(401).send("Unauthorized");
    }

    await commentRef.delete();

    return res.status(200).send("OK");
  } else {
    return res.status(400).send("Invalid method");
  }
};

export default GuestbookHandler;
