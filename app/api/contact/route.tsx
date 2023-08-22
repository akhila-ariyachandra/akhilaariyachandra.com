import sanitizeHtml from "sanitize-html";
import ContactEmail from "@/emails/contact";
import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schema";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(1, "10 m"),
  analytics: true,
  ephemeralCache: new Map(),
});

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  // Check rate limit
  const { success, limit, reset, remaining } = await ratelimit.limit(
    `${session?.user?.email}_email`,
    request
  );
  if (!success) {
    return NextResponse.json(
      {
        error: "Too many requests",
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      }
    );
  }

  const body = await request.json();

  try {
    const data = await contactSchema.parseAsync(body);

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Portfolio Contact <contact@akhilaariyachandra.com>",
        to: [process.env.TO_EMAIL as string],
        subject: sanitizeHtml(data.subject),
        react: (
          <ContactEmail
            user={session.user}
            content={sanitizeHtml(data.content)}
          />
        ),
      });

      return NextResponse.json({
        message: "Success",
      });
    } catch {
      return NextResponse.json(
        {
          error: "Error sending email",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
};
