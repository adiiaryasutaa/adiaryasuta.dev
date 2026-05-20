export default defineEventHandler(async (event) => {
  await assertAdmin(event);
  const gh = useGitHub();
  const entries = await gh.listDir("content/blog");
  const posts = entries
    .filter((e) => e.name.endsWith(".md"))
    .map((e) => ({ name: e.name, sha: e.sha, path: e.path }));
  return posts;
});
