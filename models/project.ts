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