import { allProjects } from "~/models/project";

export const useProject = () => useState("Project", allProjects);
