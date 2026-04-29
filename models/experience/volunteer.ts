import volunteer from "@/data/experience/volunteer.json";

export interface Volunteer {
  title: string;
  organization: string;
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

export const allVolunteer: () => Volunteer[] = (): Volunteer[] => {
  return volunteer.data as unknown as Volunteer[];
};