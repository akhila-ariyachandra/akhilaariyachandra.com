import { initializeApp, cert, getApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const admin = !getApps().length
  ? initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    })
  : getApp();

export default admin;

export const verifyIdToken = (token) => {
  const auth = getAuth(admin);

  return auth.verifyIdToken(token).catch((error) => {
    throw error;
  });
};
