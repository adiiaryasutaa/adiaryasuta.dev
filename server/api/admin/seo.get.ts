export default defineEventHandler(async (event) => {
  await assertAdmin(event);
  const gh = useGitHub();
  const { content, sha } = await gh.getFile("data/seo.json");
  return { data: JSON.parse(content), sha };
});
