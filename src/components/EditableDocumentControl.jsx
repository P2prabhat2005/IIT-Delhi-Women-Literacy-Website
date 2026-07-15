import { FileUp } from 'lucide-react';
import { PDF_ACCEPT } from '../utils/editableMediaStorage.js';
import EditableAssetControl from './EditableAssetControl.jsx';

export default function EditableDocumentControl({
  allowRemove,
  allowUpload,
  documentEntry = null,
  label = 'document',
  onAttach,
  onRemove,
}) {
  return (
    <EditableAssetControl
      accept={PDF_ACCEPT}
      allowRemove={allowRemove}
      allowUpload={allowUpload}
      hasAsset={Boolean(documentEntry?.url)}
      Icon={FileUp}
      label={`${label} PDF`}
      onAttach={onAttach}
      onRemove={onRemove}
      tone="dark"
    />
  );
}
