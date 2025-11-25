'use client';

import { useRef } from 'react';
import { Camera } from 'lucide-react';
import html2canvas from 'html2canvas';
import DefaultLayout from './layouts/DefaultLayout';
import ClassicLayout from './layouts/ClassicLayout';
import FuturisticLayout from './layouts/FuturisticLayout';
import NeonLayout from './layouts/NeonLayout';
import ElegantLayout from './layouts/ElegantLayout';
import CyberLayout from './layouts/CyberLayout';
import MinimalLayout from './layouts/MinimalLayout';
import { RTPStyle, TimeSlot, WebsiteOption, Game, LayoutOption, TextureOption } from '@/types';

interface RTPPreviewProps {
  selectedWebsite: WebsiteOption;
  selectedStyle: RTPStyle;
  selectedTimeSlot: TimeSlot;
  selectedBackground: string;
  selectedTexture: TextureOption;
  pragmaticCount: number;
  pgSoftCount: number;
  selectedPragmaticGames: Game[];
  selectedPgSoftGames: Game[];
  selectedLayout: LayoutOption;
}

export default function RTPPreview({
  selectedWebsite,
  selectedStyle,
  selectedTimeSlot,
  selectedBackground,
  selectedTexture,
  pragmaticCount,
  pgSoftCount,
  selectedPragmaticGames,
  selectedPgSoftGames,
  selectedLayout
}: RTPPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (previewRef.current) {
      try {
        const canvas = await html2canvas(previewRef.current, {
          scale: 2,
          backgroundColor: null,
          logging: false,
          useCORS: true,
          allowTaint: true
        });
        
        const link = document.createElement('a');
        link.download = `rtp-${selectedWebsite.name.toLowerCase()}-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  const getCurrentDate = () => {
    const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
    const months = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
    
    const now = new Date();
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    
    return `${dayName}, ${date} ${monthName} ${year}`;
  };

  return (
    <div className="space-y-4">
      {/* Download Button */}
      <div className="flex justify-end">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
        >
          <Camera className="w-5 h-5" />
          Generate & Download Image
        </button>
      </div>

      {/* Preview Container */}
      <div 
        ref={previewRef}
        className="relative overflow-hidden rounded-lg shadow-2xl"
        style={{
          width: '1200px',
          minHeight: '1600px',
          height: 'auto',
          backgroundColor: selectedStyle.backgroundColor,
          backgroundImage: `url(${selectedBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: '0 auto'
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 100%)'
          }}
        />

        {/* Texture Overlay */}
        {selectedTexture.pattern !== 'none' && (
          <div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              backgroundImage: selectedTexture.pattern.replace(/%23ffffff/g, encodeURIComponent(selectedStyle.primaryColor)),
              backgroundRepeat: 'repeat'
            }}
          />
        )}

        {/* Content - Render based on selected layout */}
        {selectedLayout.id === 'default' && (
          <DefaultLayout
            selectedWebsite={selectedWebsite}
            selectedStyle={selectedStyle}
            selectedTimeSlot={selectedTimeSlot}
            selectedPragmaticGames={selectedPragmaticGames}
            selectedPgSoftGames={selectedPgSoftGames}
            pragmaticCount={pragmaticCount}
            pgSoftCount={pgSoftCount}
            getCurrentDate={getCurrentDate}
          />
        )}

        {selectedLayout.id === 'classic' && (
          <ClassicLayout
            selectedWebsite={selectedWebsite}
            selectedStyle={selectedStyle}
            selectedTimeSlot={selectedTimeSlot}
            selectedPragmaticGames={selectedPragmaticGames}
            selectedPgSoftGames={selectedPgSoftGames}
            pragmaticCount={pragmaticCount}
            pgSoftCount={pgSoftCount}
            getCurrentDate={getCurrentDate}
          />
        )}

        {selectedLayout.id === 'futuristic' && (
          <FuturisticLayout
            selectedWebsite={selectedWebsite}
            selectedStyle={selectedStyle}
            selectedTimeSlot={selectedTimeSlot}
            selectedPragmaticGames={selectedPragmaticGames}
            selectedPgSoftGames={selectedPgSoftGames}
            pragmaticCount={pragmaticCount}
            pgSoftCount={pgSoftCount}
            getCurrentDate={getCurrentDate}
          />
        )}

        {selectedLayout.id === 'neon' && (
          <NeonLayout
            selectedWebsite={selectedWebsite}
            selectedStyle={selectedStyle}
            selectedTimeSlot={selectedTimeSlot}
            selectedPragmaticGames={selectedPragmaticGames}
            selectedPgSoftGames={selectedPgSoftGames}
            pragmaticCount={pragmaticCount}
            pgSoftCount={pgSoftCount}
            getCurrentDate={getCurrentDate}
          />
        )}

        {selectedLayout.id === 'elegant' && (
          <ElegantLayout
            selectedWebsite={selectedWebsite}
            selectedStyle={selectedStyle}
            selectedTimeSlot={selectedTimeSlot}
            selectedPragmaticGames={selectedPragmaticGames}
            selectedPgSoftGames={selectedPgSoftGames}
            pragmaticCount={pragmaticCount}
            pgSoftCount={pgSoftCount}
            getCurrentDate={getCurrentDate}
          />
        )}

        {selectedLayout.id === 'cyber' && (
          <CyberLayout
            selectedWebsite={selectedWebsite}
            selectedStyle={selectedStyle}
            selectedTimeSlot={selectedTimeSlot}
            selectedPragmaticGames={selectedPragmaticGames}
            selectedPgSoftGames={selectedPgSoftGames}
            pragmaticCount={pragmaticCount}
            pgSoftCount={pgSoftCount}
            getCurrentDate={getCurrentDate}
          />
        )}

        {selectedLayout.id === 'minimal' && (
          <MinimalLayout
            selectedWebsite={selectedWebsite}
            selectedStyle={selectedStyle}
            selectedTimeSlot={selectedTimeSlot}
            selectedPragmaticGames={selectedPragmaticGames}
            selectedPgSoftGames={selectedPgSoftGames}
            pragmaticCount={pragmaticCount}
            pgSoftCount={pgSoftCount}
            getCurrentDate={getCurrentDate}
          />
        )}
      </div>
    </div>
  );
}