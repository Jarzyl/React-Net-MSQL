import { useMutation, useQueryClient } from "@tanstack/react-query";
import { executeCreate } from "./habitCreateService";

export const useCreateHabitMutation = (userId: number) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (habitName: string) => executeCreate(userId, habitName),
      onSuccess: () => {
        // Invalidate queries po sukcesie
        queryClient.invalidateQueries<any>(["habits", userId]);
      },
      onError: (error) => {
        console.error("Error creating habit:", error);
      },
    });
  };