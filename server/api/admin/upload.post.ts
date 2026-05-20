export default defineEventHandler(async (event) => {
  await assertAdmin(event);
  const formData = await readFormData(event);
  const file = formData.get("file") as File | null;
  const section = (formData.get("section") as string | null) ?? "misc";

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: "No file provided" });
  }

  const ext = file.name.split(".").pop() ?? "bin";
  const slug = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 60);
  const filename = `${slug}-${Date.now()}.${ext}`;
  const path = `public/assets/imgs/${section}/${filename}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const gh = useGitHub();
  await gh.putFile(path, buffer.toString("base64"), `chore(admin): upload ${filename}`);

  const cfg = useRuntimeConfig();
  const url = `${cfg.public.adminSlug ? cfg.public.adminSlug : ""}/assets/imgs/${section}/${filename}`;
  return { ok: true, url: `/assets/imgs/${section}/${filename}` };
});
