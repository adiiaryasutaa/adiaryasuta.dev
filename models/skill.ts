import skills from "@/data/skill.json";

export interface Skill {
  logo: string;
  name: string;
}

export interface HighlightSkill extends Skill {
  description: string;
}

export const allHighlightSkills: () => HighlightSkill[] = (): HighlightSkill[] => {
  return skills.highlight.data as unknown as HighlightSkill[];
};

export const allOtherSkills: () => Skill[] = (): Skill[] => {
  return skills.other.data as unknown as Skill[];
};
