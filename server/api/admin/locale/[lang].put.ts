const ALLOWED_LANGS = new Set(["en", "id"]);

export default defineEventHandler(async (event) => {
  await assertAdmin(event);
  const lang = getRouterParam(event, "lang") as string;
  if (!ALLOWED_LANGS.has(lang)) {
    throw createError({ statusCode: 400, statusMessage: `Unknown locale: ${lang}` });
  }
  const body = await readBody<{ data: unknown; sha: string }>(event);
  if (!body?.data || !body?.sha) {
    throw createError({ statusCode: 400, statusMessage: "Missing data or sha" });
  }
  const gh = useGitHub();
  await gh.putFile(
    `i18n/locales/${lang}.json`,
    JSON.stringify(body.data, null, 2),
    `chore(admin): update i18n/${lang} locale`,
    body.sha
  );
  return { ok: true, redeployInSeconds: 30 };
});
