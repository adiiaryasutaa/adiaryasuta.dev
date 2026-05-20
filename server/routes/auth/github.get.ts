export default defineOAuthGitHubEventHandler({
  config: {
    scope: ["read:user"],
    redirectURL: process.env.NUXT_OAUTH_GITHUB_REDIRECT_URL,
  },
  async onSuccess(event, { user }) {
    const cfg = useRuntimeConfig();
    if (user.login !== cfg.adminGithubLogin) {
      throw createError({ statusCode: 403, statusMessage: "Forbidden" });
    }
    await setUserSession(event, {
      user: {
        login: user.login,
        avatar: user.avatar_url,
        name: user.name ?? user.login,
      },
    });
    return sendRedirect(event, `/${cfg.public.adminSlug}`);
  },
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
