import { useQuery } from '@tanstack/react-query';
import { fetchAllSkills, getCategories } from '../api/github';
import type { CategoryWithCount } from '../types';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<CategoryWithCount[]> => {
      const skills = await fetchAllSkills();
      return getCategories(skills);
    },
    staleTime: 1000 * 60 * 30,
  });
}
