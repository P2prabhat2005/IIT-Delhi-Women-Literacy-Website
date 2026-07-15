import { useCallback, useEffect, useMemo, useState } from 'react';
import * as resourceApi from '../utils/resourceLibraryStorage.js';

function groupByCollection(resources) {
  return resources.reduce((map, resource) => {
    if (!map[resource.collectionId]) map[resource.collectionId] = [];
    map[resource.collectionId].push(resource);
    return map;
  }, {});
}

/**
 * Same public shape as before (`library`, `validationMessage`, and one
 * mutation function per admin action), now backed by the Express + SQLite
 * API instead of localStorage. Components (`ResourcesPage`, `ResourceCard`)
 * did not need to change because they only ever depended on this contract.
 */
export function useResourceLibrary() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  const refetchAll = useCallback(async () => {
    try {
      const data = await resourceApi.fetchAllResources();
      setResources(data || []);
    } catch (error) {
      setValidationMessage(error.message || 'Could not load resources from the server.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetchAll();
  }, [refetchAll]);

  const library = useMemo(() => groupByCollection(resources), [resources]);

  // Refetches the entire library (rather than just one section) after every
  // mutation so edits that move a resource across sections (e.g. changing
  // its category) stay consistent everywhere without extra bookkeeping.
  const runMutation = useCallback(
    async (sectionId, action) => {
      try {
        await action();
        await refetchAll();
        setValidationMessage('');
        return true;
      } catch (error) {
        setValidationMessage(error.message || 'Something went wrong. Please try again.');
        return false;
      }
    },
    [refetchAll],
  );

  const updateContent = useCallback(
    (collectionId, resourceId, fields) => runMutation(collectionId, () => resourceApi.updateResource(resourceId, fields)),
    [runMutation],
  );

  const addResource = useCallback(
    (collectionId, fields) => runMutation(collectionId, () => resourceApi.createResource({ ...fields, category: collectionId })),
    [runMutation],
  );

  const deleteResource = useCallback(
    (collectionId, resourceId) => runMutation(collectionId, () => resourceApi.deleteResource(resourceId)),
    [runMutation],
  );

  const duplicateResource = useCallback(
    (collectionId, resource) => runMutation(collectionId, () => resourceApi.duplicateResource(resource.id)),
    [runMutation],
  );

  const reorderCollection = useCallback(
    (collectionId, orderedIds) => runMutation(collectionId, () => resourceApi.reorderResources(collectionId, orderedIds)),
    [runMutation],
  );

  const moveBefore = useCallback(
    (collectionId, draggedId, targetId, fallbackOrder) => {
      const withoutDragged = fallbackOrder.filter((id) => id !== draggedId);
      const targetIndex = withoutDragged.indexOf(targetId);
      const nextOrder =
        targetIndex === -1
          ? [...withoutDragged, draggedId]
          : [...withoutDragged.slice(0, targetIndex), draggedId, ...withoutDragged.slice(targetIndex)];
      return reorderCollection(collectionId, nextOrder);
    },
    [reorderCollection],
  );

  const attachThumbnail = useCallback(
    (collectionId, resource, file) => runMutation(collectionId, () => resourceApi.uploadResourceThumbnail(resource.id, file)),
    [runMutation],
  );

  const removeThumbnail = useCallback(
    (collectionId, resourceId) => runMutation(collectionId, () => resourceApi.removeResourceThumbnail(resourceId)),
    [runMutation],
  );

  const attachDocument = useCallback(
    (collectionId, resource, file) => runMutation(collectionId, () => resourceApi.uploadResourceDocument(resource.id, file)),
    [runMutation],
  );

  const removeDocument = useCallback(
    (collectionId, resourceId) => runMutation(collectionId, () => resourceApi.removeResourceDocument(resourceId)),
    [runMutation],
  );

  const attachVideo = useCallback(
    (collectionId, resource, file) => runMutation(collectionId, () => resourceApi.uploadResourceVideo(resource.id, file)),
    [runMutation],
  );

  const removeVideo = useCallback(
    (collectionId, resourceId) => runMutation(collectionId, () => resourceApi.removeResourceVideo(resourceId)),
    [runMutation],
  );

  const openDocument = useCallback((resource) => {
    if (!resource.document?.url) return false;
    window.open(resource.document.url, '_blank', 'noopener,noreferrer');
    return true;
  }, []);

  return {
    library,
    isLoading,
    validationMessage,
    clearValidationMessage: () => setValidationMessage(''),
    updateContent,
    addResource,
    deleteResource,
    duplicateResource,
    reorderCollection,
    moveBefore,
    attachThumbnail,
    removeThumbnail,
    attachDocument,
    removeDocument,
    openDocument,
    attachVideo,
    removeVideo,
  };
}
