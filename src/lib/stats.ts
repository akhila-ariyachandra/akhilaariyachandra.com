import admin from "@/lib/firebase-admin";
import axios from "axios";
import { getFirestore } from "firebase-admin/firestore";

export const getTotalViews = async (): Promise<number> => {
  let totalViews = 0;

  const db = getFirestore(admin);
  const pagesRef = db.collection("pages");
  const pagesSnapshot = await pagesRef.get();

  if (!pagesSnapshot.empty) {
    pagesSnapshot.forEach((doc) => {
      const hits = doc.data().hits ?? 0;

      totalViews = totalViews + hits;
    });
  }

  return totalViews;
};

export const getTotalReactions = async (): Promise<number> => {
  let totalReactions = 0;

  const db = getFirestore(admin);
  const pagesRef = db.collection("pages");
  const pagesSnapshot = await pagesRef.get();

  const pageIds: string[] = [];

  if (!pagesSnapshot.empty) {
    pagesSnapshot.forEach((doc) => {
      pageIds.push(doc.id);
    });
  }

  for await (const id of pageIds) {
    const reactionsRef = pagesRef.doc(id).collection("reactions");
    const reactionsSnapshot = await reactionsRef.get();

    if (!reactionsSnapshot.empty) {
      reactionsSnapshot.forEach((doc) => {
        const reactions = doc.data().uniqueIds?.length ?? 0;

        totalReactions = totalReactions + reactions;
      });
    }
  }

  return totalReactions;
};

export const getMostPopularPosts = async () => {
  const posts: { title: string; slug: string; hits: number }[] = [];

  const db = getFirestore(admin);
  const pagesRef = db.collection("pages");
  const pagesSnapshot = await pagesRef.orderBy("hits", "desc").limit(3).get();

  if (!pagesSnapshot.empty) {
    pagesSnapshot.forEach((doc) => {
      const { title, slug, hits } = doc.data();

      posts.push({ title, slug, hits });
    });
  }

  return posts;
};

export const getTotalDevViews = async (): Promise<number> => {
  const { data } = await axios.request({
    url: "https://dev.to/api/articles/me/published",
    headers: {
      "api-key": process.env.DEV_API_KEY,
    },
  });

  const totalViews = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.page_views_count,
    0
  );

  return totalViews;
};

export const getTotalDevReactions = async (): Promise<number> => {
  const { data } = await axios.request({
    url: "https://dev.to/api/articles/me/published",
    headers: {
      "api-key": process.env.DEV_API_KEY,
    },
  });

  const totalReactions = data.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.public_reactions_count,
    0
  );

  return totalReactions;
};
