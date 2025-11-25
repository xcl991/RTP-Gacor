'use client';

import { useState, useRef } from 'react';
import { Download, Camera } from 'lucide-react';
import html2canvas from 'html2canvas';
import GameGrid from './GameGrid';
import { BACKGROUNDS } from '@/data/games';
import { RTPStyle, TimeSlot, WebsiteOption, Game } from '@/types';

interface RTPPreviewProps {
  selectedWebsite: WebsiteOption;
  selectedStyle: RTPStyle;
  selectedTimeSlot: TimeSlot;
  selectedBackground: string;
  pragmaticCount: number;
  pgSoftCount: number;
  selectedPragmaticGames: Game[];
  selectedPgSoftGames: Game[];
}

export default function RTPPreview({
  selectedWebsite,
  selectedStyle,
  selectedTimeSlot,
  selectedBackground,
  pragmaticCount,
  pgSoftCount,
  selectedPragmaticGames,
  selectedPgSoftGames
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
          width: '1600px',
          height: '1600px',
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

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <img 
              src={selectedWebsite.logo}
              alt={`${selectedWebsite.name} logo`}
              className="h-20 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80"%3E%3Crect width="200" height="80" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="14"%3E' + selectedWebsite.name + '%3C/text%3E%3C/svg%3E';
              }}
            />
            
            <div className="text-right">
              <h1 
                className="text-5xl font-bold mb-2"
                style={{ 
                  color: selectedStyle.primaryColor,
                  textShadow: `0 0 20px ${selectedStyle.primaryColor}`
                }}
              >
                INFO TOP GAMES GACOR HARI INI
              </h1>
              <div className="flex items-center gap-4 justify-end">
                <span className="text-white text-xl">
                  {getCurrentDate()}
                </span>
                <span 
                  className="text-2xl font-bold"
                  style={{ 
                    color: selectedStyle.secondaryColor,
                    textShadow: `0 0 10px ${selectedStyle.secondaryColor}`
                  }}
                >
                  {selectedTimeSlot.label}
                </span>
              </div>
            </div>
          </div>

          {/* Games Container */}
          <div className="flex-1 overflow-y-auto">
            {/* Pragmatic Play Section */}
            <GameGrid
              title="PRAGMATIC PLAY"
              games={selectedPragmaticGames}
              gameCount={pragmaticCount}
              providerLogo="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              providerColor="#ffd700"
              style={selectedStyle}
            />

            {/* PG Soft Section */}
            <GameGrid
              title="PG SOFT"
              games={selectedPgSoftGames}
              gameCount={pgSoftCount}
              providerLogo="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
              providerColor="#00f0ff"
              style={selectedStyle}
            />
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div 
              className="inline-flex items-center gap-4 px-8 py-4 rounded-full"
              style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: `2px solid ${selectedStyle.primaryColor}`
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill={selectedStyle.primaryColor}>
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span 
                className="text-xl font-bold"
                style={{ color: selectedStyle.primaryColor }}
              >
                Join Komunitas Telegram : @{selectedWebsite.name.toLowerCase().replace(/[^a-z0-9]/g, '')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}