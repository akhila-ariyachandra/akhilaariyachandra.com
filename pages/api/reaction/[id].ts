import jwt from "jsonwebtoken";
import type { NextApiHandler } from "next";
import type { Reaction } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { parseCookies, setCookie } from "nookies";
import { nanoid } from "nanoid";
import { REACTION_LIMIT } from "@/lib/constants";

const ReactionHandler: NextApiHandler = async (req, res) => {
  const pageId = req.query.id as string;

  const prisma = new PrismaClient();
  let reaction: Reaction;

  let uid: string;
  let authToken: string;

  // Check for JWT
  const { token } = parseCookies({ req });
  // Set JWT is not present
  if (!token) {
    uid = nanoid();
    authToken = await jwt.sign({ uid }, process.env.JWT_SECRET);

    setCookie({ res }, "token", authToken, {
      maxAge: 60 * 60 * 365 * 10, // 10 years
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  } else {
    const payload = (await jwt.verify(
      token,
      process.env.JWT_SECRET
    )) as jwt.JwtPayload;
    uid = payload.uid;
  }

  if (req.method === "POST") {
    const increment = parseInt(req.body.increment as string);

    if (increment <= 0) {
      return res.status(422).json({
        message: "Invalid value",
      });
    }

    // Check if reaction exists
    reaction = await prisma.reaction.findUnique({
      where: {
        id_pageId: {
          id: uid,
          pageId,
        },
      },
    });

    // If reaction exists and it' less than the limit, increment it
    if (reaction && reaction.count < REACTION_LIMIT) {
      const availableReactions = REACTION_LIMIT - reaction.count;

      reaction = await prisma.reaction.update({
        where: {
          id_pageId: {
            id: uid,
            pageId,
          },
        },
        data: {
          count: {
            increment:
              increment > availableReactions ? availableReactions : increment,
          },
        },
      });
    } else if (!reaction) {
      const trueCount = increment > REACTION_LIMIT ? REACTION_LIMIT : increment;

      // If reaction doesn't exist, create it
      reaction = await prisma.reaction.create({
        data: {
          id: uid,
          pageId,
          count: trueCount,
        },
      });
    }
  } else if (req.method === "GET") {
    reaction = await prisma.reaction.findUnique({
      where: {
        id_pageId: {
          id: uid,
          pageId,
        },
      },
    });
  }

  const total = await prisma.reaction.aggregate({
    where: {
      pageId,
    },
    _sum: {
      count: true,
    },
  });

  return res
    .status(200)
    .json({ count: reaction?.count ?? 0, total: total?._sum?.count ?? 0 });
};

export default ReactionHandler;
