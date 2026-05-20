import { Octokit } from "@octokit/rest";
import { readFileSync, writeFileSync, unlinkSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function useLocalFS() {
  const root = process.cwd();

  return {
    async getFile(path: string) {
      const content = readFileSync(join(root, path), "utf-8");
      return { sha: "", content };
    },

    async listDir(path: string) {
      const entries = readdirSync(join(root, path));
      return entries.map((name) => {
        const stat = statSync(join(root, path, name));
        return { name, type: stat.isDirectory() ? "dir" : "file", path: `${path}/${name}` };
      });
    },

    async putFile(path: string, content: string, _message: string, _sha?: string) {
      writeFileSync(join(root, path), content, "utf-8");
      return { data: { commit: { sha: "" } } };
    },

    async deleteFile(path: string, _message: string, _sha: string) {
      unlinkSync(join(root, path));
      return { data: {} };
    },
  };
}

function useRemoteGitHub() {
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

export function useGitHub() {
  return import.meta.dev ? useLocalFS() : useRemoteGitHub();
}
