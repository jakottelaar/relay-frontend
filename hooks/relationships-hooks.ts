import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export interface Relationship {
  id: string;
  user_id: string;
  other_user_id: string;
  relationship_status: "friend" | "incoming" | "outgoing" | "blocked";
}

const fetchRelationships = async (): Promise<Relationship[]> => {
  const { data } = await apiClient.get("/relationships");
  return data.relationships;
};

export function useRelationships() {
  return useQuery({
    queryKey: ["relationships"],
    queryFn: fetchRelationships,
  });
}
