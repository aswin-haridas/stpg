// Fetch history using React Query
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/axios";

export default function useHistory() {
  const queryClient = useQueryClient();

  // Create a function with the same signature as the original saveToHistory
  const saveToHistory = (query) => {
    saveToHistoryMutation.mutate(query);
  };

  const { data = [] } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      try {
        const response = await api.get("/history");

        return response.data;
      } catch (error) {
        console.error("Failed to fetch history:", error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 10, // 5 minutes
    refetchOnWindowFocus: true, // Refetch when the window is focused
  });
  // Save to history using mutation
  const saveToHistoryMutation = useMutation({
    mutationFn: (query) => {
      return api.post("/history", { query });
    },
    onSuccess: () => {
      // Invalidate and refetch history after adding a new entry
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });

  return { data, saveToHistory };
}
