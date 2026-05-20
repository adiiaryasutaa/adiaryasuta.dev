export default defineEventHandler(async (event) => {
  await assertAdmin(event);
  const body = await readBody<{ data: unknown; sha: string }>(event);
  if (!body?.data || !body?.sha) {
    throw createError({ statusCode: 400, statusMessage: "Missing data or sha" });
  }
  const gh = useGitHub();
  await gh.putFile(
    "data/seo.json",
    JSON.stringify(body.data, null, 2),
    "chore(admin): update data/seo.json",
    body.sha
  );
  return { ok: true, redeployInSeconds: 30 };
});
