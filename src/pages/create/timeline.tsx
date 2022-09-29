import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/Button";
import { trpc } from "../../utils/trpc";

const CreateTimeline: NextPage = () => {
  const router = useRouter();
  const utils = trpc.useContext();
  const { status } = useSession();


  const [timelineName, setTimelineName] = useState("");
  const { mutate, isLoading } = trpc.useMutation(["timeline.create"], {
    onSuccess: () => {
      setTimelineName("");
      utils.invalidateQueries(["timeline.getAll"]);
    }
  });

  if (status === "loading") return <p>loading...</p>;
  if (status === "unauthenticated") router.push("/");
  

  return (
    <>
      <h1>Create Timeline</h1>

        <input
          className="block border"
          value={timelineName}
          onChange={(e) => setTimelineName(e.currentTarget.value)}
        />
        <Button
          disabled={isLoading}
          onClick={() => {
            mutate({ name: timelineName });
          }}
        >
          Create Timeline
        </Button>
    </>
  )
}

export default CreateTimeline;
