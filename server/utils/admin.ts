import type { H3Event } from "h3";

export async function assertAdmin(event: H3Event) {
  const session = await requireUserSession(event);
  const cfg = useRuntimeConfig();
  if ((session.user as any).login !== cfg.adminGithubLogin) {
    throw createError({ statusCode: 403, statusMessage: "Forbidden" });
  }
  return session;
}
