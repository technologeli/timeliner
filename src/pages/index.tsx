import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";

const TempButton: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, ...props}) => {
  return (
    <button {...props} className="rounded border px-2 py-2 transition hover:shadow-lg">
      {children}
    </button>
  );
};

const Home: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Head>
          <title>Timeliner</title>
          <meta name="description" content="Visualize timelines" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Hello {session.user?.name}!</h1>
        <TempButton onClick={() => signOut()}>Sign Out</TempButton>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Timeliner</title>
        <meta name="description" content="Visualize timelines" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello world!</h1>
      <TempButton onClick={() => signIn()}>Sign In</TempButton>
    </>
  );
};

export default Home;
