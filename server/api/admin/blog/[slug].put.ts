export default defineEventHandler(async (event) => {
  await assertAdmin(event);
  const slug = getRouterParam(event, "slug") as string;
  const body = await readBody<{ content: string; sha?: string; isNew?: boolean }>(event);
  if (!body?.content) {
    throw createError({ statusCode: 400, statusMessage: "Missing content" });
  }
  const gh = useGitHub();
  const path = `content/blog/${slug}.md`;
  const message = body.isNew
    ? `content(admin): add blog post ${slug}`
    : `content(admin): update blog post ${slug}`;
  await gh.putFile(path, body.content, message, body.sha);
  return { ok: true, redeployInSeconds: 30 };
});
