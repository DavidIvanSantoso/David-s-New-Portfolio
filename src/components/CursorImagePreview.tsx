import React from 'react';
import './CursorImagePreview.css';

interface CursorImagePreviewProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  previewImgRef: React.RefObject<HTMLImageElement | null>;
}

export const CursorImagePreview: React.FC<CursorImagePreviewProps> = ({ previewRef, previewImgRef }) => (
  <div ref={previewRef} className="cursor-image-preview">
    <img ref={previewImgRef} alt="" className="cursor-image-preview-img" />
  </div>
);
