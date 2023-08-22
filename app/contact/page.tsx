import config from "@/lib/config";
import LoginButton from "./LoginButton";
import ContactForm from "./ContactForm";
import Title from "@/components/Title/Title";

export const metadata = {
  title: `Contact | ${config.title}`,
  description: "Reach me via email",
};

const ContactPage = () => {
  return (
    <>
      <Title title="Reach me" />

      <p className="my-5 text-base text-zinc-800 dark:text-zinc-200 sm:text-lg">
        Use the form to send an email my way{" "}
        <span className="font-light text-zinc-700 dark:text-zinc-300">
          {"(login required)"}
        </span>
      </p>

      <LoginButton />

      <ContactForm />
    </>
  );
};

export default ContactPage;
