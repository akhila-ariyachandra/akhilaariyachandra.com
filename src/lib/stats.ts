import admin from "@/lib/firebase";

export const getTotalViews = async (): Promise<number> => {
  let totalViews = 0;

  const db = admin.firestore();
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

  const db = admin.firestore();
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

  const db = admin.firestore();
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
