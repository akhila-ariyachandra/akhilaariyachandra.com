import admin from "src/lib/firebaseAdmin";
import type { NextApiHandler } from "next";
import { ReactionType } from "src/lib/types";
import { setCookie, deleteCookie } from "src/lib/helpers";

const Reaction: NextApiHandler = async (req, res) => {
  if (req.method === "POST" || req.method === "DELETE") {
    const {
      body: { id, type },
    } = req;

    if (!id || !type) {
      return res.status(400).send("Incorrect Body");
    }

    // Check for reaction type
    if (!(type in ReactionType)) {
      return res.status(400).send("Invalid Type");
    }

    const db = admin.firestore();
    const reactionRef = db.collection("reactions");

    // Check if ID exists
    const reaction = await reactionRef.doc(id).get();

    if (!reaction.exists) {
      return res.status(404).send("Not Found");
    }

    const typeDoc = reactionRef.doc(id).collection("types").doc(type);

    let newCount: number;

    if (req.method === "POST") {
      // Check if the type exists
      // And create it if is doesn't
      const typeRec = await typeDoc.get();
      if (!typeRec.exists) {
        newCount = 1;
      } else {
        // Increment the count by one
        const previousCount = typeRec.data().count;
        newCount = previousCount + 1;
      }

      // Set the cookie
      setCookie(`${id}-${type}`, "true", res);
    } else {
      // Check if the type exists
      const typeRec = await typeDoc.get();
      if (!typeRec.exists) {
        return res.status(404).send("Not Found");
      } else {
        // Decrement the count by one
        const previousCount = typeRec.data().count;
        newCount = previousCount - 1;
      }

      // Delete the cookie
      deleteCookie(`${id}-${type}`, res);
    }

    await typeDoc.set({
      count: newCount,
    });

    return res.status(200).send(newCount);
  } else {
    return res.status(405).send("Incorrect Method");
  }
};

export default Reaction;
