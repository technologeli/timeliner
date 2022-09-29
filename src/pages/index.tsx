import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const TempButton: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="rounded border px-2 py-2 transition hover:shadow-lg"
    >
      {children}
    </button>
  );
};

const Home: NextPage = () => {
  const utils = trpc.useContext();
  const { data: session } = useSession();
  const timelines = trpc.useQuery(["timeline.getAll"]);

  const [timelineName, setTimelineName] = useState("");
  const { mutate, isLoading } = trpc.useMutation(["timeline.create"], {
    onSuccess: () => {
      setTimelineName("");
      utils.invalidateQueries(["timeline.getAll"]);
    }
  });

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
        <input
          className="block border"
          value={timelineName}
          onChange={(e) => setTimelineName(e.currentTarget.value)}
        />
        <TempButton
          disabled={isLoading}
          onClick={() => {
            mutate({ name: timelineName });
          }}
        >
          Create Timeline
        </TempButton>
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
      <TempButton onClick={() => signIn()}>Sign In</TempButton>
    </>
  );
};

export default Home;
