'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Shuffle, Clock, Image, Palette, Hash, Layout, Search, Layers, ChevronRight, Sparkles, X, Check, ListChecks } from 'lucide-react';
import { WEBSITES, RTP_STYLES, TIME_SLOTS, LAYOUT_OPTIONS, TEXTURE_OPTIONS, CARD_STYLE_OPTIONS, BACKGROUND_CATEGORIES } from '@/data/games';
import { WebsiteOption, RTPStyle, TimeSlot, LayoutOption, TextureOption, CardStyleOption, BackgroundCategory, TrikConfig, TrikItem } from '@/types';

interface HeaderProps {
  selectedWebsite: WebsiteOption;
  onWebsiteChange: (website: WebsiteOption) => void;
  onShuffleGames: () => void;
  onOpenPragmaticSelector?: () => void;
  onOpenPgSoftSelector?: () => void;
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
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
  selectedCardStyle: CardStyleOption;
  onCardStyleChange: (cardStyle: CardStyleOption) => void;
  pragmaticTrik: TrikConfig;
  onPragmaticTrikChange: (trik: TrikConfig) => void;
  pgSoftTrik: TrikConfig;
  onPgSoftTrikChange: (trik: TrikConfig) => void;
}

export default function Header({
  selectedWebsite,
  onWebsiteChange,
  onShuffleGames,
  onOpenPragmaticSelector,
  onOpenPgSoftSelector,
  selectedBackground,
  onBackgroundChange,
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
  onCustomTimeLabelChange,
  selectedCardStyle,
  onCardStyleChange,
  pragmaticTrik,
  onPragmaticTrikChange,
  pgSoftTrik,
  onPgSoftTrikChange
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLayoutDropdownOpen, setIsLayoutDropdownOpen] = useState(false);
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);
  const [isTextureDropdownOpen, setIsTextureDropdownOpen] = useState(false);
  const [isCardStyleDropdownOpen, setIsCardStyleDropdownOpen] = useState(false);
  const [isBackgroundDropdownOpen, setIsBackgroundDropdownOpen] = useState(false);
  const [isTrikPanelOpen, setIsTrikPanelOpen] = useState(false);
  const [activeTrikTab, setActiveTrikTab] = useState<'pragmatic' | 'pgsoft'>('pragmatic');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [websiteSearch, setWebsiteSearch] = useState('');
  const websiteInputRef = useRef<HTMLInputElement>(null);

  // Get current category name from selected background
  const getCurrentCategoryName = () => {
    // Check website-specific backgrounds first
    if (selectedWebsite.backgrounds?.includes(selectedBackground)) {
      const index = selectedWebsite.backgrounds.indexOf(selectedBackground) + 1;
      return `${selectedWebsite.name} ${index}`;
    }
    // Check general categories
    for (const category of BACKGROUND_CATEGORIES) {
      if (category.backgrounds.includes(selectedBackground)) {
        const index = category.backgrounds.indexOf(selectedBackground) + 1;
        return `${category.name} ${index}`;
      }
    }
    return 'Background';
  };

  // Check if website has custom backgrounds
  const hasCustomBackgrounds = selectedWebsite.backgrounds && selectedWebsite.backgrounds.length > 0;

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

        {/* Manual Selection Buttons */}
        {onOpenPragmaticSelector && (
          <button
            onClick={onOpenPragmaticSelector}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ListChecks className="w-4 h-4" />
            Pilih Pragmatic
          </button>
        )}

        {onOpenPgSoftSelector && (
          <button
            onClick={onOpenPgSoftSelector}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ListChecks className="w-4 h-4" />
            Pilih PG Soft
          </button>
        )}

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

        {/* Background Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsBackgroundDropdownOpen(!isBackgroundDropdownOpen)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Image className="w-4 h-4" />
            <span className="font-semibold">{getCurrentCategoryName()}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isBackgroundDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isBackgroundDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
              {/* Website-specific backgrounds (if available) */}
              {hasCustomBackgrounds && (
                <div>
                  {/* Website Category Header */}
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === 'website-custom' ? null : 'website-custom')}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-indigo-700 transition-colors text-left border-b border-gray-700 bg-indigo-600/20"
                  >
                    <span className="text-indigo-300 font-semibold">{selectedWebsite.name}</span>
                    <ChevronRight className={`w-4 h-4 text-indigo-400 transition-transform ${expandedCategory === 'website-custom' ? 'rotate-90' : ''}`} />
                  </button>

                  {/* Website Background Items */}
                  {expandedCategory === 'website-custom' && (
                    <div className="bg-gray-900">
                      {selectedWebsite.backgrounds!.map((bg, index) => (
                        <button
                          key={bg}
                          onClick={() => {
                            onBackgroundChange(bg);
                            setIsBackgroundDropdownOpen(false);
                            setExpandedCategory(null);
                          }}
                          className={`w-full flex items-center gap-3 px-6 py-2 hover:bg-gray-700 transition-colors text-left ${
                            selectedBackground === bg ? 'bg-indigo-600/30' : ''
                          }`}
                        >
                          <div
                            className="w-8 h-8 rounded border border-indigo-400/50 bg-cover bg-center"
                            style={{ backgroundImage: `url("${bg}")` }}
                          />
                          <span className="text-indigo-300 text-sm">{selectedWebsite.name} {index + 1}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* General background categories */}
              {BACKGROUND_CATEGORIES.map((category) => (
                <div key={category.id}>
                  {/* Category Header */}
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-700 transition-colors text-left border-b border-gray-700"
                  >
                    <span className="text-white font-semibold">{category.name}</span>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedCategory === category.id ? 'rotate-90' : ''}`} />
                  </button>

                  {/* Category Items */}
                  {expandedCategory === category.id && (
                    <div className="bg-gray-900">
                      {category.backgrounds.map((bg, index) => (
                        <button
                          key={bg}
                          onClick={() => {
                            onBackgroundChange(bg);
                            setIsBackgroundDropdownOpen(false);
                            setExpandedCategory(null);
                          }}
                          className={`w-full flex items-center gap-3 px-6 py-2 hover:bg-gray-700 transition-colors text-left ${
                            selectedBackground === bg ? 'bg-indigo-600/30' : ''
                          }`}
                        >
                          <div
                            className="w-8 h-8 rounded border border-white/30 bg-cover bg-center"
                            style={{ backgroundImage: `url("${bg}")` }}
                          />
                          <span className="text-gray-300 text-sm">{category.name} {index + 1}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

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
        {/* Card Style Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCardStyleDropdownOpen(!isCardStyleDropdownOpen)}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span className="font-semibold">{selectedCardStyle.name}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {isCardStyleDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
              {CARD_STYLE_OPTIONS.map((cardStyle) => (
                <button
                  key={cardStyle.id}
                  onClick={() => {
                    onCardStyleChange(cardStyle);
                    setIsCardStyleDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors text-left ${
                    selectedCardStyle.id === cardStyle.id ? 'bg-gray-700' : ''
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded border border-white/30"
                    style={{
                      background: cardStyle.background,
                      opacity: cardStyle.opacity,
                      backgroundImage: cardStyle.pattern !== 'none' ? cardStyle.pattern : 'none'
                    }}
                  />
                  <span className="text-white">{cardStyle.name}</span>
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

        {/* Trik Gacor Button */}
        <button
          onClick={() => setIsTrikPanelOpen(!isTrikPanelOpen)}
          className={`flex items-center gap-2 ${isTrikPanelOpen ? 'bg-yellow-500' : 'bg-yellow-600 hover:bg-yellow-700'} text-black px-4 py-2 rounded-lg transition-colors font-semibold`}
        >
          <Sparkles className="w-4 h-4" />
          Trik Gacor
        </button>
      </div>

      {/* Trik Gacor Panel */}
      {isTrikPanelOpen && (
        <div className="mt-4 bg-gray-800 border border-gray-700 rounded-lg p-4">
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTrikTab('pragmatic')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTrikTab === 'pragmatic'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              Pragmatic Play
            </button>
            <button
              onClick={() => setActiveTrikTab('pgsoft')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTrikTab === 'pgsoft'
                  ? 'bg-cyan-500 text-black'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              PG Soft
            </button>
          </div>

          {/* Trik Config Form */}
          {(() => {
            const currentTrik = activeTrikTab === 'pragmatic' ? pragmaticTrik : pgSoftTrik;
            const setCurrentTrik = activeTrikTab === 'pragmatic' ? onPragmaticTrikChange : onPgSoftTrikChange;

            return (
              <div className="space-y-4">
                {/* Enable Toggle */}
                <div className="flex items-center gap-3">
                  <label className="text-white font-semibold">Tampilkan Modal Trik:</label>
                  <button
                    onClick={() => setCurrentTrik({ ...currentTrik, enabled: !currentTrik.enabled })}
                    className={`px-4 py-1 rounded-full font-semibold transition-colors ${
                      currentTrik.enabled
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    {currentTrik.enabled ? 'ON' : 'OFF'}
                  </button>
                </div>

                {currentTrik.enabled && (
                  <>
                    {/* Title */}
                    <div className="flex items-center gap-3">
                      <label className="text-white text-sm w-40">Judul Panel:</label>
                      <input
                        type="text"
                        value={currentTrik.title}
                        onChange={(e) => setCurrentTrik({ ...currentTrik, title: e.target.value })}
                        className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
                        placeholder="TRIK GACOR"
                      />
                    </div>

                    {/* Font Size */}
                    <div className="flex items-center gap-3">
                      <label className="text-white text-sm w-40">Ukuran Font:</label>
                      <div className="flex gap-2">
                        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                          <button
                            key={size}
                            onClick={() => setCurrentTrik({ ...currentTrik, fontSize: size })}
                            className={`px-3 py-1 rounded font-semibold text-sm transition-colors ${
                              currentTrik.fontSize === size
                                ? 'bg-yellow-500 text-black'
                                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                            }`}
                          >
                            {size.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Deposit Kode */}
                    <div className="flex items-center gap-3">
                      <label className="text-white text-sm w-40">Deposit Kode Unik:</label>
                      <input
                        type="text"
                        value={currentTrik.depositKode}
                        onChange={(e) => setCurrentTrik({ ...currentTrik, depositKode: e.target.value })}
                        className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
                        placeholder="7777"
                      />
                    </div>

                    {/* Putaran Bet Range */}
                    <div className="flex items-center gap-3">
                      <label className="text-white text-sm w-40">Putaran Bet:</label>
                      <input
                        type="number"
                        value={currentTrik.putaranBetMin}
                        onChange={(e) => setCurrentTrik({ ...currentTrik, putaranBetMin: parseInt(e.target.value) || 0 })}
                        className="w-24 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
                        placeholder="100"
                      />
                      <span className="text-white">-</span>
                      <input
                        type="number"
                        value={currentTrik.putaranBetMax}
                        onChange={(e) => setCurrentTrik({ ...currentTrik, putaranBetMax: parseInt(e.target.value) || 0 })}
                        className="w-24 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
                        placeholder="2000"
                      />
                    </div>

                    {/* Fitur Ganda Toggle */}
                    <div className="flex items-center gap-3">
                      <label className="text-white text-sm w-40">Fitur Ganda:</label>
                      <button
                        onClick={() => setCurrentTrik({ ...currentTrik, fiturGanda: !currentTrik.fiturGanda })}
                        className={`px-4 py-1 rounded font-semibold transition-colors ${
                          currentTrik.fiturGanda
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {currentTrik.fiturGanda ? 'MODE ON' : 'MODE OFF'}
                      </button>
                    </div>

                    {/* Trik Items */}
                    <div className="space-y-2">
                      <label className="text-white text-sm font-semibold">Trik Spin:</label>
                      {currentTrik.trikItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 bg-gray-700 p-2 rounded">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const newItems = [...currentTrik.trikItems];
                              newItems[index] = { ...item, name: e.target.value };
                              setCurrentTrik({ ...currentTrik, trikItems: newItems });
                            }}
                            className="flex-1 px-2 py-1 bg-gray-600 text-white rounded border border-gray-500 focus:border-yellow-500 focus:outline-none text-sm"
                            placeholder="Nama Trik"
                          />
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => {
                              const newItems = [...currentTrik.trikItems];
                              newItems[index] = { ...item, value: e.target.value };
                              setCurrentTrik({ ...currentTrik, trikItems: newItems });
                            }}
                            className="w-28 px-2 py-1 bg-gray-600 text-white rounded border border-gray-500 focus:border-yellow-500 focus:outline-none text-sm"
                            placeholder="10x"
                          />
                          <div className="flex items-center gap-1">
                            <span className="text-gray-400 text-xs">Pattern:</span>
                            <input
                              type="text"
                              value={item.pattern}
                              onChange={(e) => {
                                const newItems = [...currentTrik.trikItems];
                                newItems[index] = { ...item, pattern: e.target.value.toUpperCase() };
                                setCurrentTrik({ ...currentTrik, trikItems: newItems });
                              }}
                              className="w-16 px-2 py-1 bg-gray-600 text-white rounded border border-gray-500 focus:border-yellow-500 focus:outline-none text-sm text-center"
                              placeholder="XVV"
                              maxLength={5}
                            />
                          </div>
                          <button
                            onClick={() => {
                              const newItems = currentTrik.trikItems.filter((_, i) => i !== index);
                              setCurrentTrik({ ...currentTrik, trikItems: newItems });
                            }}
                            className="p-1 bg-red-500 hover:bg-red-600 rounded text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setCurrentTrik({
                            ...currentTrik,
                            trikItems: [...currentTrik.trikItems, { name: 'New Trik', value: '10x', pattern: 'VVV' }]
                          });
                        }}
                        className="w-full py-2 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm"
                      >
                        + Tambah Trik
                      </button>
                    </div>

                    {/* Custom Text */}
                    <div className="flex items-center gap-3">
                      <label className="text-white text-sm w-40">Custom Text:</label>
                      <input
                        type="text"
                        value={currentTrik.customText}
                        onChange={(e) => setCurrentTrik({ ...currentTrik, customText: e.target.value })}
                        className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-yellow-500 focus:outline-none text-sm"
                        placeholder="IKUTI TRIK & KODE UNIK..."
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
