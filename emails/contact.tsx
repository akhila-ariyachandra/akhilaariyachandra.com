import {
  Button,
  Html,
  Tailwind,
  Container,
  Img,
  Row,
  Column,
  Heading,
  Body,
  Head,
} from "@react-email/components";
import { Markdown } from "@react-email/markdown";

type ContactEmail = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  content?: string;
};

const placeholderUser: ContactEmail["user"] = {
  name: "Akhila Ariyachandra",
  email: "akhila@acme.com",
  image: "https://loremflickr.com/120/120",
};

const ContactEmail = ({
  user = placeholderUser,
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim lobortis scelerisque fermentum dui faucibus in ornare.",
}: ContactEmail) => {
  return (
    <Html>
      <Head />

      <Tailwind>
        <Body className="font-sans">
          <Container className="rounded bg-white p-4">
            <Row>
              {!!user?.image && (
                <Column align="center">
                  <Img
                    src={user.image}
                    alt="Cat"
                    width="120"
                    height="120"
                    className="rounded-full"
                  />
                </Column>
              )}

              <Column align="left">
                <Heading as="h1" className="text-zinc-900">
                  {user.name}
                </Heading>
                <Heading as="h2" className="text-zinc-900">
                  {user.email}
                </Heading>
              </Column>
            </Row>

            <Markdown>{content}</Markdown>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;
