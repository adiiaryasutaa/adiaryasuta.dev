import tech from "@/data/tech.json";

export interface Tech {
  logo: string;
  name: string;
  highlight: boolean;
  description?: string | null;
}

export const allTech = (): Record<string, Tech[]> => {
  const techs: Record<string, Tech[]> = {};

  Object.keys(tech).forEach((key) => {
    techs[key] = tech[key as keyof typeof tech].data as unknown as Tech[];
  });

  return techs;
};
