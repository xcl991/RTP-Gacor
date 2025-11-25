'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Shuffle, Clock, Image, Palette, Hash, Layout, Search } from 'lucide-react';
import { WEBSITES, RTP_STYLES, TIME_SLOTS, LAYOUT_OPTIONS, TEXTURE_OPTIONS } from '@/data/games';
import { WebsiteOption, RTPStyle, TimeSlot, LayoutOption, TextureOption } from '@/types';

interface HeaderProps {
  selectedWebsite: WebsiteOption;
  onWebsiteChange: (website: WebsiteOption) => void;
  onShuffleGames: () => void;
  onShuffleBackground: () => void;
  selectedStyle: RTPStyle;
  onStyleChange: (style: RTPStyle) => void;
  selectedTexture: TextureOption;
  onTextureChange: (texture: TextureOption) => void;
  pragmaticCount: number;
  pgSoftCount: number;
  onPragmaticCountChange: (count: number) => void;
  onPgSoftCountChange: (count: number) => void;
  selectedLayout: LayoutOption;
  onLayoutChange: (layout: LayoutOption) => void;
  customTimeLabel: string;
  onCustomTimeLabelChange: (label: string) => void;
}

export default function Header({
  selectedWebsite,
  onWebsiteChange,
  onShuffleGames,
  onShuffleBackground,
  selectedStyle,
  onStyleChange,
  selectedTexture,
  onTextureChange,
  pragmaticCount,
  pgSoftCount,
  onPragmaticCountChange,
  onPgSoftCountChange,
  selectedLayout,
  onLayoutChange,
  customTimeLabel,
  onCustomTimeLabelChange
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLayoutDropdownOpen, setIsLayoutDropdownOpen] = useState(false);
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);
  const [isTextureDropdownOpen, setIsTextureDropdownOpen] = useState(false);
  const [websiteSearch, setWebsiteSearch] = useState('');
  const websiteInputRef = useRef<HTMLInputElement>(null);

  // Filter websites based on search
  const filteredWebsites = WEBSITES.filter(website =>
    website.name.toLowerCase().includes(websiteSearch.toLowerCase())
  );

  // Focus input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && websiteInputRef.current) {
      websiteInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.website-dropdown')) {
        setIsDropdownOpen(false);
        setWebsiteSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg shadow-xl">
      <div className="flex flex-wrap items-center gap-4">
        {/* Website Searchable Dropdown */}
        <div className="relative website-dropdown">
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
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              {/* Search Input */}
              <div className="p-2 border-b border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={websiteInputRef}
                    type="text"
                    value={websiteSearch}
                    onChange={(e) => setWebsiteSearch(e.target.value)}
                    placeholder="Cari website..."
                    className="w-full pl-9 pr-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* Website List */}
              <div className="max-h-64 overflow-y-auto">
                {filteredWebsites.length > 0 ? (
                  filteredWebsites.map((website) => (
                    <button
                      key={website.id}
                      onClick={() => {
                        onWebsiteChange(website);
                        setIsDropdownOpen(false);
                        setWebsiteSearch('');
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors text-left ${
                        selectedWebsite.id === website.id ? 'bg-gray-700' : ''
                      }`}
                    >
                      <img
                        src={website.logo}
                        alt={`${website.name} logo`}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-white">{website.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-400 text-center text-sm">
                    Website tidak ditemukan
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Layout Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLayoutDropdownOpen(!isLayoutDropdownOpen)}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Layout className="w-4 h-4" />
            <span className="font-semibold">{selectedLayout.name}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isLayoutDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              {LAYOUT_OPTIONS.map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => {
                    onLayoutChange(layout);
                    setIsLayoutDropdownOpen(false);
                  }}
                  className={`w-full flex flex-col px-4 py-3 hover:bg-gray-700 transition-colors text-left ${
                    selectedLayout.id === layout.id ? 'bg-gray-700' : ''
                  }`}
                >
                  <span className="text-white font-semibold">{layout.name}</span>
                  <span className="text-gray-400 text-sm">{layout.description}</span>
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

        {/* Custom Time Input */}
        <div className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg">
          <Clock className="w-4 h-4" />
          <input
            type="text"
            value={customTimeLabel}
            onChange={(e) => onCustomTimeLabelChange(e.target.value)}
            placeholder="00:00 - 06:00 WIB"
            className="w-40 px-2 py-1 bg-purple-700 text-white rounded border border-purple-500 focus:border-purple-300 focus:outline-none text-sm"
          />
        </div>

        <button
          onClick={onShuffleBackground}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Image className="w-4 h-4" />
          Acak Background
        </button>

        {/* Base Color Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsStyleDropdownOpen(!isStyleDropdownOpen)}
            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <div
              className="w-4 h-4 rounded-full border border-white/30"
              style={{ backgroundColor: selectedStyle.primaryColor }}
            />
            <span className="font-semibold">{selectedStyle.name}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isStyleDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
              {RTP_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    onStyleChange(style);
                    setIsStyleDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors text-left ${
                    selectedStyle.id === style.id ? 'bg-gray-700' : ''
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full border border-white/30"
                    style={{ backgroundColor: style.primaryColor }}
                  />
                  <span className="text-white">{style.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Texture Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsTextureDropdownOpen(!isTextureDropdownOpen)}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <span className="font-semibold">{selectedTexture.name}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isTextureDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              {TEXTURE_OPTIONS.map((texture) => (
                <button
                  key={texture.id}
                  onClick={() => {
                    onTextureChange(texture);
                    setIsTextureDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors text-left ${
                    selectedTexture.id === texture.id ? 'bg-gray-700' : ''
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded border border-white/30 bg-gray-900"
                    style={{
                      backgroundImage: texture.pattern !== 'none' ? texture.pattern : 'none'
                    }}
                  />
                  <span className="text-white">{texture.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

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