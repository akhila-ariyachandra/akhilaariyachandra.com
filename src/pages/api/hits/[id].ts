import admin from "@/lib/firebase-admin";
import prisma from "@/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase-admin/firestore";

const RegisterHit = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = getFirestore(admin);

  const id = req.query.id as string;

  let page = await prisma.page.findUnique({
    where: {
      id,
    },
  });

  // If page hits is zero, check if value exists in Firebase
  if (page.hits === 0) {
    const pageRef = db.collection("pages").doc(id);
    const pageDoc = await pageRef.get();

    // If value exists, update database with that value
    if (pageDoc.exists && pageDoc.data().hits) {
      page = await prisma.page.update({
        where: {
          id,
        },
        data: {
          hits: pageDoc.data().hits,
        },
      });
    }
  }

  // Increment hits for POST requests
  if (req.method === "POST") {
    page = await prisma.page.update({
      where: { id },
      data: { hits: { increment: 1 } },
    });
  }

  return res.status(200).send(page.hits);
};

export default RegisterHit;
