import work from "@/data/experience/work.json";

export interface Work {
  title: string;
  employment: string;
  company: string;
  description?: string;
  current: boolean | false;
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

export const allWork: () => Work[] = (): Work[] => {
  return work.data as unknown as Work[];
};