import education from "@/data/experience/education.json";

export interface Education {
  school: string;
  major: string;
  start: {
    month: string;
    year: string;
  };
  end?: {
    month: string;
    year: string;
  } | null;
  media?: string[];
}

export const allEducation: () => Education[] = (): Education[] => {
  return education.data as unknown as Education[];
};
