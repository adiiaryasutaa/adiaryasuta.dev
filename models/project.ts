import projectData from "@/data/project.json";
import type { Tag } from "~/models/tag";
import type { Repository } from "~/models/repository";
import type { Preview } from "~/models/preview";

export interface Project {
  cover: string;
  name: string;
  description: string;
  tags: Tag[];
  repository?: Repository;
  preview?: Preview;
}

export const allProjects = (): Project[] => projectData.projects as unknown as Project[];
