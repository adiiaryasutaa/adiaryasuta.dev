import type { Friend } from "@/models/friend";
import friendData from "@/data/friend.json";

export const useFriend = () => {
  return useState("friends", (): Friend[] => friendData as Friend[]);
};
