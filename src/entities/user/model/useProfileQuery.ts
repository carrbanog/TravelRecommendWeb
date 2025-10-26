import {useQuery} from '@tanstack/react-query';
import {getProfile} from '../api/getProfile';
import type { ProfileData } from '../../../shared/types/usertype';

export const useProfileQuery = () => {
  return useQuery<ProfileData>({
    queryKey: ["getProfile"],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}