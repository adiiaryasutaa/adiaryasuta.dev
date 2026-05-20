import { allHighlightSkills, allOtherSkills } from "~/models/skill";

export const useSkill = () =>
  useState("skills", () => ({
    highlight: allHighlightSkills(),
    other: allOtherSkills(),
  }));
