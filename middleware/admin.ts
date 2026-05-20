export default defineNuxtRouteMiddleware(async (to) => {
  const cfg = useRuntimeConfig();
  const adminSlug = cfg.public.adminSlug;

  // Reject wrong slug — return normal 404
  if (to.params.adminSlug !== adminSlug) {
    throw createError({ statusCode: 404, statusMessage: "Page not found" });
  }

  // Allow the login page unauthenticated
  if (to.path === `/${adminSlug}/login`) return;

  // Check session
  const { loggedIn } = useUserSession();
  if (!loggedIn.value) {
    return navigateTo(`/${adminSlug}/login`);
  }
});
