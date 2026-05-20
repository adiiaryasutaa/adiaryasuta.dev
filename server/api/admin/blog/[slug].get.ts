export default defineEventHandler(async (event) => {
  await assertAdmin(event);
  const slug = getRouterParam(event, "slug") as string;
  const gh = useGitHub();
  const { content, sha } = await gh.getFile(`content/blog/${slug}.md`);
  return { content, sha };
});
