'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { X, Download, Move } from 'lucide-react';

interface SelectionArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ScreenshotSelectorProps {
  targetRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
}

export default function ScreenshotSelector({
  targetRef,
  isOpen,
  onClose,
  fileName
}: ScreenshotSelectorProps) {
  const [selection, setSelection] = useState<SelectionArea | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isCapturing, setIsCapturing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Reset selection when opened
  useEffect(() => {
    if (isOpen) {
      setSelection(null);
    }
  }, [isOpen]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!overlayRef.current) return;

    const rect = overlayRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStartPos({ x, y });
    setSelection({ x, y, width: 0, height: 0 });
    setIsSelecting(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isSelecting || !overlayRef.current) return;

    const rect = overlayRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const x = Math.min(startPos.x, currentX);
    const y = Math.min(startPos.y, currentY);
    const width = Math.abs(currentX - startPos.x);
    const height = Math.abs(currentY - startPos.y);

    setSelection({ x, y, width, height });
  }, [isSelecting, startPos]);

  const handleMouseUp = useCallback(() => {
    setIsSelecting(false);
  }, []);

  const handleCapture = async () => {
    if (!selection || !targetRef.current || selection.width < 10 || selection.height < 10) {
      alert('Pilih area terlebih dahulu dengan drag mouse');
      return;
    }

    setIsCapturing(true);
    try {
      // Get the target element's position
      const targetRect = targetRef.current.getBoundingClientRect();
      const overlayRect = overlayRef.current?.getBoundingClientRect();

      if (!overlayRect) return;

      // Calculate the selection relative to the target element
      const scrollLeft = window.scrollX;
      const scrollTop = window.scrollY;

      // Capture the entire target first
      const fullCanvas = await html2canvas(targetRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      // Calculate scale factor
      const scaleX = fullCanvas.width / targetRect.width;
      const scaleY = fullCanvas.height / targetRect.height;

      // Calculate crop coordinates relative to target
      const cropX = (selection.x - (targetRect.left - overlayRect.left)) * scaleX;
      const cropY = (selection.y - (targetRect.top - overlayRect.top + scrollTop)) * scaleY;
      const cropWidth = selection.width * scaleX;
      const cropHeight = selection.height * scaleY;

      // Create cropped canvas
      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;

      const ctx = croppedCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          fullCanvas,
          Math.max(0, cropX),
          Math.max(0, cropY),
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight
        );
      }

      // Download
      const link = document.createElement('a');
      link.download = fileName;
      link.href = croppedCanvas.toDataURL('image/png', 1.0);
      link.click();

      onClose();
    } catch (error) {
      console.error('Error capturing:', error);
      alert('Gagal capture gambar');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleCaptureFullPreview = async () => {
    if (!targetRef.current) return;

    setIsCapturing(true);
    try {
      const canvas = await html2canvas(targetRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = fileName;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

      onClose();
    } catch (error) {
      console.error('Error capturing:', error);
      alert('Gagal capture gambar');
    } finally {
      setIsCapturing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gray-900 p-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <Move className="w-5 h-5 text-gray-400" />
          <span className="text-white font-medium">
            Drag untuk pilih area yang ingin di-capture
          </span>
          {selection && selection.width > 0 && (
            <span className="text-yellow-400 text-sm">
              ({Math.round(selection.width)} x {Math.round(selection.height)} px)
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCaptureFullPreview}
            disabled={isCapturing}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Download Full
          </button>
          <button
            onClick={handleCapture}
            disabled={isCapturing || !selection || selection.width < 10}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            {isCapturing ? 'Processing...' : 'Download Selection'}
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            <X className="w-4 h-4" />
            Batal
          </button>
        </div>
      </div>

      {/* Selection Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 mt-16 cursor-crosshair overflow-auto"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Selection Rectangle */}
        {selection && selection.width > 0 && selection.height > 0 && (
          <>
            {/* Dark overlay with hole */}
            <div
              className="absolute bg-black/50 pointer-events-none"
              style={{
                top: 0,
                left: 0,
                right: 0,
                height: selection.y
              }}
            />
            <div
              className="absolute bg-black/50 pointer-events-none"
              style={{
                top: selection.y + selection.height,
                left: 0,
                right: 0,
                bottom: 0
              }}
            />
            <div
              className="absolute bg-black/50 pointer-events-none"
              style={{
                top: selection.y,
                left: 0,
                width: selection.x,
                height: selection.height
              }}
            />
            <div
              className="absolute bg-black/50 pointer-events-none"
              style={{
                top: selection.y,
                left: selection.x + selection.width,
                right: 0,
                height: selection.height
              }}
            />

            {/* Selection border */}
            <div
              className="absolute border-2 border-dashed border-yellow-400 pointer-events-none"
              style={{
                left: selection.x,
                top: selection.y,
                width: selection.width,
                height: selection.height,
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.3)'
              }}
            >
              {/* Corner handles */}
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full" />

              {/* Size label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                {Math.round(selection.width)} × {Math.round(selection.height)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
