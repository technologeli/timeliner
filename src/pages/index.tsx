import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Button from "../components/Button";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const timelines = trpc.useQuery(["timeline.getAll"]);

  if (session) {
    return (
      <>
        <Head>
          <title>Timeliner</title>
          <meta name="description" content="Visualize timelines" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Hello {session.user?.name}!</h1>
        <Button onClick={() => signOut()}>Sign Out</Button>
        <pre>{JSON.stringify(timelines.data, null, 4)}</pre>
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
      <Button onClick={() => signIn()}>Sign In</Button>
    </>
  );
};

export default Home;
