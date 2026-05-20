export default defineEventHandler(async (event) => {
  await assertAdmin(event);
  const slug = getRouterParam(event, "slug") as string;
  const body = await readBody<{ sha: string }>(event);
  if (!body?.sha) {
    throw createError({ statusCode: 400, statusMessage: "Missing sha" });
  }
  const gh = useGitHub();
  await gh.deleteFile(
    `content/blog/${slug}.md`,
    `content(admin): delete blog post ${slug}`,
    body.sha
  );
  return { ok: true };
});
