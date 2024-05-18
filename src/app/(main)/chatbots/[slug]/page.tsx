const filter = {};

export default async function ChatbotsPage({
  params,
}: {
  params: { slug: string };
}) {
  return <>{params.slug}</>;
}
