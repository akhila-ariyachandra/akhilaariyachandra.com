import sanitizeHtml from "sanitize-html";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactSchema } from "@/lib/schema";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  try {
    const data = await ContactSchema.parseAsync(body);

    const resend = new Resend(process.env.RESEND_API_KEY as string);

    resend.emails.send({
      from: `${data.name} <${data.email}>`,
      to: process.env.TO_EMAIL as string,
      subject: sanitizeHtml(data.subject),
      html: sanitizeHtml(data.content),
    });

    return NextResponse.json({
      message: "Success",
    });
  } catch (error) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }
};
