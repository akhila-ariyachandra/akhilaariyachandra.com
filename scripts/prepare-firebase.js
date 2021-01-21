const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

// Generate the root documents for reactions
(async () => {
  // Read all the blog posts first
  const postsDirectory = path.join("content", "posts");
  const fileNames = fs.readdirSync(postsDirectory);
  const routes = fileNames.map((fileName) => fileName.replace(/\.mdx$/, ""));

  // Read all the snippets as well
  const snippetDirectory = path.join("content", "snippets");
  const snippetFileNames = fs.readdirSync(snippetDirectory);
  for (const fileName of snippetFileNames) {
    routes.push(fileName.replace(/\.mdx$/, ""));
  }

  const db = admin.firestore();
  const reactionCollection = db.collection("reactions");

  for (const route of routes) {
    const reactionDoc = reactionCollection.doc(route);

    await reactionDoc.set({});
  }

  console.log("> Created all reaction root documents");
})();
