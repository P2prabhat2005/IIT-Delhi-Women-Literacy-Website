import { useCallback, useEffect, useState } from 'react';
import {
  fetchMediaMap,
  openDocumentInNewTab,
  removeMediaAsset,
  uploadMediaAsset,
} from '../utils/editableMediaStorage.js';

export function useEditableDocumentMap(namespace, keys = []) {
  const [documents, setDocuments] = useState({});
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    fetchMediaMap(namespace, keys, 'document')
      .then((map) => {
        if (!cancelled) setDocuments(map);
      })
      .catch(() => {
        // Keep prior/empty documents state; do not treat fetch failure as "no documents".
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namespace, keys.join(',')]);

  const getDocument = useCallback((key) => documents[key] ?? null, [documents]);

  const openDocument = useCallback(
    (key) => {
      const entry = documents[key];
      if (!entry?.url) return false;
      return openDocumentInNewTab(entry.url);
    },
    [documents],
  );

  const attachDocument = useCallback(
    async (key, file) => {
      const result = await uploadMediaAsset(namespace, key, file, 'document');

      if (!result.ok) {
        setValidationMessage(result.error);
        return false;
      }

      setValidationMessage('');
      setDocuments((current) => ({
        ...current,
        [key]: result.entry,
      }));
      return true;
    },
    [namespace],
  );

  const removeDocument = useCallback(
    async (key) => {
      await removeMediaAsset(namespace, key, 'document');
      setValidationMessage('');
      setDocuments((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    },
    [namespace],
  );

  const replaceDocumentReference = useCallback(
    (key, entry) => {
      setDocuments((current) => {
        const next = { ...current };
        if (entry?.url) {
          next[key] = entry;
        } else {
          delete next[key];
        }
        return next;
      });
    },
    [],
  );

  return {
    documents,
    validationMessage,
    getDocument,
    openDocument,
    attachDocument,
    removeDocument,
    replaceDocumentReference,
    clearValidationMessage: () => setValidationMessage(''),
  };
}
