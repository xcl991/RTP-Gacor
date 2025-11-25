'use client';

import { useState } from 'react';
import { ChevronDown, Shuffle, Clock, Image, Palette, Hash } from 'lucide-react';
import { WEBSITES, RTP_STYLES, TIME_SLOTS } from '@/data/games';
import { WebsiteOption, RTPStyle, TimeSlot } from '@/types';

interface HeaderProps {
  selectedWebsite: WebsiteOption;
  onWebsiteChange: (website: WebsiteOption) => void;
  onShuffleGames: () => void;
  onShuffleTime: () => void;
  onShuffleBackground: () => void;
  onShuffleStyle: () => void;
  pragmaticCount: number;
  pgSoftCount: number;
  onPragmaticCountChange: (count: number) => void;
  onPgSoftCountChange: (count: number) => void;
}

export default function Header({
  selectedWebsite,
  onWebsiteChange,
  onShuffleGames,
  onShuffleTime,
  onShuffleBackground,
  onShuffleStyle,
  pragmaticCount,
  pgSoftCount,
  onPragmaticCountChange,
  onPgSoftCountChange
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg shadow-xl">
      <div className="flex flex-wrap items-center gap-4">
        {/* Website Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <img 
              src={selectedWebsite.logo} 
              alt={`${selectedWebsite.name} logo`}
              className="w-6 h-6 object-contain"
            />
            <span className="font-semibold">{selectedWebsite.name}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              {WEBSITES.map((website) => (
                <button
                  key={website.id}
                  onClick={() => {
                    onWebsiteChange(website);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors text-left"
                >
                  <img 
                    src={website.logo} 
                    alt={`${website.name} logo`}
                    className="w-6 h-6 object-contain"
                  />
                  <span className="text-white">{website.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <button
          onClick={onShuffleGames}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Shuffle className="w-4 h-4" />
          Acak Games
        </button>

        <button
          onClick={onShuffleTime}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Clock className="w-4 h-4" />
          Acak Jam
        </button>

        <button
          onClick={onShuffleBackground}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Image className="w-4 h-4" />
          Acak Background
        </button>

        <button
          onClick={onShuffleStyle}
          className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Palette className="w-4 h-4" />
          Acak Style
        </button>

        {/* Game Count Controls */}
        <div className="flex items-center gap-4 bg-gray-800 px-4 py-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-yellow-400" />
            <label className="text-white text-sm">Pragmatic:</label>
            <input
              type="number"
              min="1"
              max="20"
              value={pragmaticCount}
              onChange={(e) => onPragmaticCountChange(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
              className="w-16 px-2 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-cyan-400" />
            <label className="text-white text-sm">PG Soft:</label>
            <input
              type="number"
              min="1"
              max="20"
              value={pgSoftCount}
              onChange={(e) => onPgSoftCountChange(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
              className="w-16 px-2 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}