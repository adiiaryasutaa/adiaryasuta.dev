import tools from "@/data/tool.json";

export interface Tool {
  logo: string;
  name: string;
}

export const allTools: () => Tool[] = (): Tool[] => {
  return tools.data as unknown as Tool[];
};
