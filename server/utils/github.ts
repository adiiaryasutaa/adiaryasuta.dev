import { Octokit } from "@octokit/rest";

export function useGitHub() {
  const cfg = useRuntimeConfig();
  const octokit = new Octokit({ auth: cfg.githubPat });
  const owner = cfg.githubRepoOwner;
  const repo = cfg.githubRepoName;
  const branch = cfg.githubBranch;

  return {
    async getFile(path: string) {
      const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
      if (Array.isArray(data) || data.type !== "file") throw new Error("Not a file");
      return {
        sha: data.sha,
        content: Buffer.from(data.content, "base64").toString("utf-8"),
      };
    },

    async listDir(path: string) {
      const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
      if (!Array.isArray(data)) throw new Error("Not a directory");
      return data;
    },

    async putFile(path: string, content: string, message: string, sha?: string) {
      return octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        branch,
        message,
        content: Buffer.from(content, "utf-8").toString("base64"),
        ...(sha ? { sha } : {}),
      });
    },

    async deleteFile(path: string, message: string, sha: string) {
      return octokit.repos.deleteFile({ owner, repo, path, branch, message, sha });
    },
  };
}
