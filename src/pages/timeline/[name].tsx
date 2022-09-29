import type { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
const Timeline: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const { data: timeline, isLoading } = trpc.useQuery([
    "timeline.get",
    { name: name as string },
  ]);

  if (isLoading) return <p>loading...</p>;
  if (!timeline) return <p>not found</p>;

  return (
    <>
      <h1>{timeline.name}</h1>
    </>
  );
};

export default Timeline;
