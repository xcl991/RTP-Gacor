'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Shuffle, Clock, Image, Palette, Hash, Layout, Search, Layers, ChevronRight, Sparkles, X, Check, ListChecks, Plus, Trash2 } from 'lucide-react';
import { WEBSITES, RTP_STYLES, TIME_SLOTS, LAYOUT_OPTIONS, TEXTURE_OPTIONS, CARD_STYLE_OPTIONS, BACKGROUND_CATEGORIES } from '@/data/games';
import { WebsiteOption, RTPStyle, TimeSlot, LayoutOption, TextureOption, CardStyleOption, BackgroundCategory, TrikConfig, TrikItem, Game, MaxwinConfig, DefaultLayoutSizeConfig, FooterConfig } from '@/types';

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
  featuredGame: Game | null;
  featuredPosition: 'left' | 'center' | 'right';
  onFeaturedPositionChange: (position: 'left' | 'center' | 'right') => void;
  onOpenFeaturedSelector: (source: 'pragmatic' | 'pgsoft') => void;
  featuredTrik: TrikConfig;
  onFeaturedTrikChange: (trik: TrikConfig) => void;
  maxwinConfig: MaxwinConfig;
  onMaxwinConfigChange: (config: MaxwinConfig) => void;
  telegramUsername: string;
  onTelegramUsernameChange: (username: string) => void;
  customDateEnabled: boolean;
  onCustomDateEnabledChange: (enabled: boolean) => void;
  customDate: Date;
  onCustomDateChange: (date: Date) => void;
  customHeaderText: string;
  onCustomHeaderTextChange: (text: string) => void;
  headerFontSize: 'small' | 'medium' | 'large' | 'xlarge';
  onHeaderFontSizeChange: (size: 'small' | 'medium' | 'large' | 'xlarge') => void;
  defaultLayoutSize: DefaultLayoutSizeConfig;
  onDefaultLayoutSizeChange: (config: DefaultLayoutSizeConfig) => void;
  footerConfig: FooterConfig;
  onFooterConfigChange: (config: FooterConfig) => void;
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
  onPgSoftTrikChange,
  featuredGame,
  featuredPosition,
  onFeaturedPositionChange,
  onOpenFeaturedSelector,
  featuredTrik,
  onFeaturedTrikChange,
  maxwinConfig,
  onMaxwinConfigChange,
  telegramUsername,
  onTelegramUsernameChange,
  customDateEnabled,
  onCustomDateEnabledChange,
  customDate,
  onCustomDateChange,
  customHeaderText,
  onCustomHeaderTextChange,
  headerFontSize,
  onHeaderFontSizeChange,
  defaultLayoutSize,
  onDefaultLayoutSizeChange,
  footerConfig,
  onFooterConfigChange
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLayoutDropdownOpen, setIsLayoutDropdownOpen] = useState(false);
  const [isStyleDropdownOpen, setIsStyleDropdownOpen] = useState(false);
  const [isTextureDropdownOpen, setIsTextureDropdownOpen] = useState(false);
  const [isCardStyleDropdownOpen, setIsCardStyleDropdownOpen] = useState(false);
  const [isBackgroundDropdownOpen, setIsBackgroundDropdownOpen] = useState(false);
  const [isTrikPanelOpen, setIsTrikPanelOpen] = useState(false);
  const [activeTrikTab, setActiveTrikTab] = useState<'pragmatic' | 'pgsoft' | 'featured'>('pragmatic');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isMaxwinPanelOpen, setIsMaxwinPanelOpen] = useState(false);
  const [isFontSizeDropdownOpen, setIsFontSizeDropdownOpen] = useState(false);
  const [isFooterPanelOpen, setIsFooterPanelOpen] = useState(false);
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
            <div className="absolute top-full left-0 mt-2 w-72 max-h-[600px] overflow-y-auto bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
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

        {/* Telegram Username Input */}
        <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span className="text-sm font-semibold">@</span>
          <input
            type="text"
            value={telegramUsername}
            onChange={(e) => onTelegramUsernameChange(e.target.value)}
            placeholder={selectedWebsite.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}
            className="w-40 px-2 py-1 bg-blue-700 text-white rounded border border-blue-500 focus:border-blue-300 focus:outline-none text-sm placeholder:text-blue-300"
          />
        </div>

        {/* Custom Date Toggle & Input */}
        <div className="flex items-center gap-3 bg-purple-600 text-white px-4 py-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span className="text-sm font-semibold">Custom Date:</span>
          <button
            onClick={() => onCustomDateEnabledChange(!customDateEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              customDateEnabled ? 'bg-green-500' : 'bg-purple-800'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                customDateEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          {customDateEnabled && (
            <input
              type="date"
              value={customDate.toISOString().split('T')[0]}
              onChange={(e) => onCustomDateChange(new Date(e.target.value))}
              className="px-2 py-1 bg-purple-700 text-white rounded border border-purple-500 focus:border-purple-300 focus:outline-none text-sm"
            />
          )}
        </div>

        {/* Custom Header Text Input */}
        <div className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M4 7V4h16v3"></path>
            <path d="M9 20h6"></path>
            <path d="M12 4v16"></path>
          </svg>
          <span className="text-sm font-semibold">Header:</span>
          <input
            type="text"
            value={customHeaderText}
            onChange={(e) => onCustomHeaderTextChange(e.target.value)}
            placeholder="INFO TOP GAMES GACOR HARI INI"
            className="w-64 px-2 py-1 bg-teal-700 text-white rounded border border-teal-500 focus:border-teal-300 focus:outline-none text-sm placeholder:text-teal-300"
          />
        </div>

        {/* Font Size Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsFontSizeDropdownOpen(!isFontSizeDropdownOpen)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Hash className="w-4 h-4" />
            <span className="font-semibold">{headerFontSize === 'xlarge' ? 'X-Large' : headerFontSize === 'large' ? 'Large' : headerFontSize === 'medium' ? 'Medium' : 'Small'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isFontSizeDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isFontSizeDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              <button
                onClick={() => {
                  onHeaderFontSizeChange('small');
                  setIsFontSizeDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${headerFontSize === 'small' ? 'bg-emerald-700' : ''}`}
              >
                <span className="text-sm text-white">Small</span>
              </button>
              <button
                onClick={() => {
                  onHeaderFontSizeChange('medium');
                  setIsFontSizeDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${headerFontSize === 'medium' ? 'bg-emerald-700' : ''}`}
              >
                <span className="text-base text-white">Medium</span>
              </button>
              <button
                onClick={() => {
                  onHeaderFontSizeChange('large');
                  setIsFontSizeDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${headerFontSize === 'large' ? 'bg-emerald-700' : ''}`}
              >
                <span className="text-lg text-white">Large</span>
              </button>
              <button
                onClick={() => {
                  onHeaderFontSizeChange('xlarge');
                  setIsFontSizeDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors rounded-b-lg ${headerFontSize === 'xlarge' ? 'bg-emerald-700' : ''}`}
              >
                <span className="text-xl text-white">X-Large</span>
              </button>
            </div>
          )}
        </div>

        {/* Layout Resize Controls - Show for all layouts except singlefeatured */}
        {selectedLayout.id !== 'singlefeatured' && (
          <div className="flex items-center gap-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-4 py-2 rounded-lg">
            <Layers className="w-4 h-4" />

            {/* Lock/Unlock Toggle Button */}
            <button
              onClick={() => onDefaultLayoutSizeChange({
                ...defaultLayoutSize,
                isLocked: !defaultLayoutSize.isLocked
              })}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm transition-all ${
                defaultLayoutSize.isLocked
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
            >
              {defaultLayoutSize.isLocked ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Locked
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                  </svg>
                  Unlocked
                </>
              )}
            </button>

            {defaultLayoutSize.isLocked ? (
              // Display locked values
              <div className="flex items-center gap-2 text-xs bg-black/20 px-3 py-1.5 rounded">
                <span>Card:{defaultLayoutSize.gameCardSize}px</span>
                <span>Gap:{defaultLayoutSize.gameGap}px</span>
                <span>Trik:{defaultLayoutSize.trikPanelWidth}px</span>
                <span>Title:{defaultLayoutSize.providerTitleSize}px</span>
              </div>
            ) : (
              // Show sliders when unlocked
              <>
            <span className="text-sm font-semibold">Resize:</span>

            {/* Game Card Size */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] opacity-80">Game {defaultLayoutSize.gameCardSize}px</label>
              <input
                type="range"
                min="80"
                max="150"
                value={defaultLayoutSize.gameCardSize}
                onChange={(e) => onDefaultLayoutSizeChange({
                  ...defaultLayoutSize,
                  gameCardSize: Number(e.target.value)
                })}
                className="w-20 h-1 bg-pink-400 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Game Gap */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] opacity-80">Gap {defaultLayoutSize.gameGap}px</label>
              <input
                type="range"
                min="0"
                max="10"
                value={defaultLayoutSize.gameGap}
                onChange={(e) => onDefaultLayoutSizeChange({
                  ...defaultLayoutSize,
                  gameGap: Number(e.target.value)
                })}
                className="w-16 h-1 bg-pink-400 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Trik Panel Width */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] opacity-80">Trik {defaultLayoutSize.trikPanelWidth}px</label>
              <input
                type="range"
                min="180"
                max="700"
                value={defaultLayoutSize.trikPanelWidth}
                onChange={(e) => onDefaultLayoutSizeChange({
                  ...defaultLayoutSize,
                  trikPanelWidth: Number(e.target.value)
                })}
                className="w-20 h-1 bg-pink-400 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Modal Padding */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] opacity-80">Modal Pad {defaultLayoutSize.modalPadding}px</label>
              <input
                type="range"
                min="0"
                max="20"
                value={defaultLayoutSize.modalPadding}
                onChange={(e) => onDefaultLayoutSizeChange({
                  ...defaultLayoutSize,
                  modalPadding: Number(e.target.value)
                })}
                className="w-16 h-1 bg-pink-400 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Header Padding */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] opacity-80">Head Pad {defaultLayoutSize.headerPadding}px</label>
              <input
                type="range"
                min="0"
                max="20"
                value={defaultLayoutSize.headerPadding}
                onChange={(e) => onDefaultLayoutSizeChange({
                  ...defaultLayoutSize,
                  headerPadding: Number(e.target.value)
                })}
                className="w-16 h-1 bg-pink-400 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Header Margin Bottom */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] opacity-80">Head MB {defaultLayoutSize.headerMarginBottom}px</label>
              <input
                type="range"
                min="0"
                max="20"
                value={defaultLayoutSize.headerMarginBottom}
                onChange={(e) => onDefaultLayoutSizeChange({
                  ...defaultLayoutSize,
                  headerMarginBottom: Number(e.target.value)
                })}
                className="w-16 h-1 bg-pink-400 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Provider Title Size */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] opacity-80">Title {defaultLayoutSize.providerTitleSize}px</label>
              <input
                type="range"
                min="6"
                max="24"
                value={defaultLayoutSize.providerTitleSize}
                onChange={(e) => onDefaultLayoutSizeChange({
                  ...defaultLayoutSize,
                  providerTitleSize: Number(e.target.value)
                })}
                className="w-16 h-1 bg-pink-400 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            </>
            )}
          </div>
        )}

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

        {/* Game Selection Controls */}
        <div className="flex items-center gap-4 bg-gray-800 px-4 py-2 rounded-lg">
          {selectedLayout.id === 'singlefeatured' ? (
            <>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <label className="text-white text-sm font-semibold">Pilih Game (Tampil 2 pertama):</label>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onOpenPragmaticSelector?.()}
                  className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded transition-colors font-medium flex items-center gap-2"
                >
                  <Hash className="w-4 h-4" />
                  Pragmatic
                </button>
                <button
                  onClick={() => onOpenPgSoftSelector?.()}
                  className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded transition-colors font-medium flex items-center gap-2"
                >
                  <Hash className="w-4 h-4" />
                  PG Soft
                </button>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Trik Gacor Button */}
        <button
          onClick={() => setIsTrikPanelOpen(!isTrikPanelOpen)}
          className={`flex items-center gap-2 ${isTrikPanelOpen ? 'bg-yellow-500' : 'bg-yellow-600 hover:bg-yellow-700'} text-black px-4 py-2 rounded-lg transition-colors font-semibold`}
        >
          <Sparkles className="w-4 h-4" />
          Trik Gacor
        </button>

        {/* Maxwin Info Button - For Single Featured Layout & Custom Layout 2 */}
        {(selectedLayout.id === 'singlefeatured' || selectedLayout.id === 'customizable2') && (
          <button
            onClick={() => setIsMaxwinPanelOpen(!isMaxwinPanelOpen)}
            className={`flex items-center gap-2 ${isMaxwinPanelOpen ? 'bg-purple-500' : 'bg-purple-600 hover:bg-purple-700'} text-white px-4 py-2 rounded-lg transition-colors font-semibold`}
          >
            <Sparkles className="w-4 h-4" />
            Maxwin Info{maxwinConfig.buttonText ? ` - ${maxwinConfig.buttonText}` : ''}
          </button>
        )}

        {/* Footer Config Button - Only for Customizable Layout */}
        {selectedLayout.id === 'customizable' && (
          <button
            onClick={() => setIsFooterPanelOpen(!isFooterPanelOpen)}
            className={`flex items-center gap-2 ${isFooterPanelOpen ? 'bg-rose-500' : 'bg-rose-600 hover:bg-rose-700'} text-white px-4 py-2 rounded-lg transition-colors font-semibold`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="15" x2="21" y2="15"></line>
            </svg>
            Footer Config
          </button>
        )}
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
            {selectedLayout.id === 'singlefeatured' && (
              <button
                onClick={() => setActiveTrikTab('featured')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  activeTrikTab === 'featured'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Featured
              </button>
            )}
          </div>

          {/* Trik Config Form */}
          {(() => {
            const currentTrik = activeTrikTab === 'pragmatic'
              ? pragmaticTrik
              : activeTrikTab === 'pgsoft'
                ? pgSoftTrik
                : featuredTrik;
            const setCurrentTrik = activeTrikTab === 'pragmatic'
              ? onPragmaticTrikChange
              : activeTrikTab === 'pgsoft'
                ? onPgSoftTrikChange
                : onFeaturedTrikChange;

            return (
              <div className="space-y-4">
                {/* Info Text - Explain which games use this trik */}
                <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3">
                  <p className="text-blue-300 text-sm">
                    {activeTrikTab === 'pragmatic' && '💡 Trik ini akan digunakan untuk game Pragmatic Play'}
                    {activeTrikTab === 'pgsoft' && '💡 Trik ini akan digunakan untuk game PG Soft'}
                    {activeTrikTab === 'featured' && '💡 Trik ini sebagai fallback jika trik provider tidak aktif'}
                  </p>
                </div>

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

                    {/* Fitur Ganda Toggle - Hide for PG Soft */}
                    {activeTrikTab !== 'pgsoft' && (
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
                    )}

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

      {/* Maxwin Info Panel - For Single Featured Layout & Custom Layout 2 */}
      {isMaxwinPanelOpen && (selectedLayout.id === 'singlefeatured' || selectedLayout.id === 'customizable2') && (
        <div className="mt-4 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">Konfigurasi Maxwin Info</h3>

          <div className="space-y-4">
            {/* Enable Toggle */}
            <div className="flex items-center gap-3">
              <label className="text-white text-sm font-semibold">Tampilkan Modal Maxwin:</label>
              <button
                onClick={() => onMaxwinConfigChange({ ...maxwinConfig, enabled: !maxwinConfig.enabled })}
                className={`px-4 py-1 rounded-full font-semibold transition-colors ${
                  maxwinConfig.enabled
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-600 text-gray-300'
                }`}
              >
                {maxwinConfig.enabled ? 'AKTIF' : 'NONAKTIF'}
              </button>
            </div>

            {/* Button Text - Always visible */}
            <div className="flex items-center gap-3">
              <label className="text-white text-sm w-40">Text Tombol:</label>
              <input
                type="text"
                value={maxwinConfig.buttonText}
                onChange={(e) => onMaxwinConfigChange({ ...maxwinConfig, buttonText: e.target.value })}
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                placeholder="Contoh: Event Spesial, Promo Hari Ini, dll"
              />
            </div>

            {maxwinConfig.enabled && (
              <>
                {/* Heading 1 */}
                <div className="flex items-center gap-3">
                  <label className="text-white text-sm w-40">Heading 1:</label>
                  <input
                    type="text"
                    value={maxwinConfig.heading1}
                    onChange={(e) => onMaxwinConfigChange({ ...maxwinConfig, heading1: e.target.value })}
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                    placeholder="KODE MAXWIN GACOR MALAM INI 6.917"
                  />
                </div>

                {/* Heading 2 */}
                <div className="flex items-center gap-3">
                  <label className="text-white text-sm w-40">Heading 2:</label>
                  <input
                    type="text"
                    value={maxwinConfig.heading2}
                    onChange={(e) => onMaxwinConfigChange({ ...maxwinConfig, heading2: e.target.value })}
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                    placeholder="CARA MAIN"
                  />
                </div>

                {/* Text Items - Dynamic List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-white text-sm font-semibold">Text Items:</label>
                    <button
                      onClick={() => {
                        const newItems = [...maxwinConfig.textItems, ''];
                        onMaxwinConfigChange({ ...maxwinConfig, textItems: newItems });
                      }}
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Text
                    </button>
                  </div>

                  {maxwinConfig.textItems.map((text, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <label className="text-white text-sm w-24">Text {index + 1}:</label>
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => {
                          const newItems = [...maxwinConfig.textItems];
                          newItems[index] = e.target.value;
                          onMaxwinConfigChange({ ...maxwinConfig, textItems: newItems });
                        }}
                        className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                        placeholder={`Text item ${index + 1}`}
                      />
                      <button
                        onClick={() => {
                          const newItems = maxwinConfig.textItems.filter((_, i) => i !== index);
                          onMaxwinConfigChange({ ...maxwinConfig, textItems: newItems });
                        }}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                        title="Hapus text item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer Config Panel - Only for Customizable Layout */}
      {isFooterPanelOpen && selectedLayout.id === 'customizable' && (
        <div className="mt-4 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-rose-400 mb-4">Konfigurasi Footer</h3>

          <div className="space-y-4">
            {/* Footer 1 */}
            <div className="flex items-center gap-3">
              <label className="text-white text-sm w-32">Footer 1:</label>
              <input
                type="text"
                value={footerConfig.footer1}
                onChange={(e) => onFooterConfigChange({ ...footerConfig, footer1: e.target.value })}
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-rose-500 focus:outline-none"
                placeholder="Join Telegram: @username"
              />
            </div>

            {/* Sub Footer 1 */}
            <div className="flex items-center gap-3">
              <label className="text-white text-sm w-32">Sub Footer 1:</label>
              <input
                type="text"
                value={footerConfig.subFooter1}
                onChange={(e) => onFooterConfigChange({ ...footerConfig, subFooter1: e.target.value })}
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-rose-500 focus:outline-none"
                placeholder="Hubungi kami untuk info lebih lanjut"
              />
            </div>

            {/* Footer 2 */}
            <div className="flex items-center gap-3">
              <label className="text-white text-sm w-32">Footer 2:</label>
              <input
                type="text"
                value={footerConfig.footer2}
                onChange={(e) => onFooterConfigChange({ ...footerConfig, footer2: e.target.value })}
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-rose-500 focus:outline-none"
                placeholder="© 2024 All Rights Reserved"
              />
            </div>

            {/* Preview */}
            <div className="mt-4 p-3 bg-gray-900 rounded-lg border border-gray-600">
              <p className="text-gray-400 text-xs mb-2">Preview:</p>
              <div className="space-y-1">
                <p className="text-rose-400 text-sm font-bold">{footerConfig.footer1 || '(Footer 1 kosong)'}</p>
                <p className="text-gray-400 text-xs">{footerConfig.subFooter1 || '(Sub Footer kosong)'}</p>
                <p className="text-gray-500 text-xs">{footerConfig.footer2 || '(Footer 2 kosong)'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
