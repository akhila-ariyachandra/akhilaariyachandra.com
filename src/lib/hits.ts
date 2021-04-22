import admin from "@/lib/firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

export const getPageHits = async (id: string): Promise<number> => {
  const db = getFirestore(admin);

  const pageRef = db.collection("pages").doc(id);
  const page = await pageRef.get();

  if (!page.exists || !page.data().hits) {
    return 0;
  } else {
    return page.data().hits;
  }
};
