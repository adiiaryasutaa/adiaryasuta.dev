const ALLOWED = new Set([
  "project",
  "skill",
  "tech",
  "tool",
  "friend",
  "experience/work",
  "experience/education",
  "experience/volunteer",
  "seo",
]);

export default defineEventHandler(async (event) => {
  await assertAdmin(event);
  const resource = getRouterParam(event, "resource") as string;
  if (!ALLOWED.has(resource)) {
    throw createError({ statusCode: 400, statusMessage: `Unknown resource: ${resource}` });
  }
  const body = await readBody<{ data: unknown; sha: string }>(event);
  if (!body?.data || !body?.sha) {
    throw createError({ statusCode: 400, statusMessage: "Missing data or sha" });
  }
  const gh = useGitHub();
  await gh.putFile(
    `data/${resource}.json`,
    JSON.stringify(body.data, null, 2),
    `chore(admin): update data/${resource}.json`,
    body.sha
  );
  return { ok: true, redeployInSeconds: 30 };
});
