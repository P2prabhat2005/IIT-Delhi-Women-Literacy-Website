import { useCallback, useEffect, useState } from 'react';
import * as teamApi from '../utils/teamDirectoryApi.js';

export function useTeamDirectory({ includeInactive = false } = {}) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  const refetch = useCallback(async () => {
    try {
      const data = await teamApi.fetchTeamDirectory({ includeInactive });
      setCategories(data || []);
      setValidationMessage('');
    } catch (error) {
      setValidationMessage(error.message || 'Could not load team members.');
    } finally {
      setIsLoading(false);
    }
  }, [includeInactive]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const runMutation = useCallback(
    async (action) => {
      try {
        await action();
        await refetch();
        setValidationMessage('');
        return true;
      } catch (error) {
        setValidationMessage(error.message || 'Team update failed. Please try again.');
        return false;
      }
    },
    [refetch],
  );

  return {
    categories,
    isLoading,
    validationMessage,
    createCategory: (fields) => runMutation(() => teamApi.createTeamCategory(fields)),
    updateCategory: (categoryId, fields) => runMutation(() => teamApi.updateTeamCategory(categoryId, fields)),
    deleteCategory: (categoryId) => runMutation(() => teamApi.deleteTeamCategory(categoryId)),
    createMember: (fields) => runMutation(() => teamApi.createTeamMember(fields)),
    updateMember: (memberId, fields) => runMutation(() => teamApi.updateTeamMember(memberId, fields)),
    deleteMember: (memberId) => runMutation(() => teamApi.deleteTeamMember(memberId)),
    uploadPhoto: (memberId, file) => runMutation(() => teamApi.uploadTeamMemberPhoto(memberId, file)),
    removePhoto: (memberId) => runMutation(() => teamApi.removeTeamMemberPhoto(memberId)),
    refetch,
  };
}

