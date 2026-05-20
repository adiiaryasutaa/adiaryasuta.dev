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
  const gh = useGitHub();
  const { content, sha } = await gh.getFile(`data/${resource}.json`);
  return { data: JSON.parse(content), sha };
});
