const ALLOWED_LANGS = new Set(["en", "id"]);

export default defineEventHandler(async (event) => {
  await assertAdmin(event);
  const lang = getRouterParam(event, "lang") as string;
  if (!ALLOWED_LANGS.has(lang)) {
    throw createError({ statusCode: 400, statusMessage: `Unknown locale: ${lang}` });
  }
  const gh = useGitHub();
  const { content, sha } = await gh.getFile(`i18n/locales/${lang}.json`);
  return { data: JSON.parse(content), sha };
});
