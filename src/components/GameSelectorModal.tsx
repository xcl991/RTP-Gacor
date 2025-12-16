'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, Check, Gamepad2 } from 'lucide-react';
import { Game } from '@/types';

interface GameSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  games: Game[];
  selectedGames: Game[];
  onApply: (selectedGames: Game[]) => void;
  provider: 'Pragmatic Play' | 'PG Soft';
  maxSelection: number;
}

export default function GameSelectorModal({
  isOpen,
  onClose,
  games,
  selectedGames,
  onApply,
  provider,
  maxSelection
}: GameSelectorModalProps) {
  const [search, setSearch] = useState('');
  const [tempSelected, setTempSelected] = useState<Game[]>(selectedGames);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Reset temp selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempSelected(selectedGames);
      setSearch('');
      searchInputRef.current?.focus();
    }
  }, [isOpen, selectedGames]);

  // Filter games based on search
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleGame = (game: Game) => {
    const isSelected = tempSelected.some(g => g.id === game.id);

    if (isSelected) {
      // Remove game
      setTempSelected(tempSelected.filter(g => g.id !== game.id));
    } else {
      // Add game (check max limit)
      if (tempSelected.length < maxSelection) {
        setTempSelected([...tempSelected, game]);
      }
    }
  };

  const handleApply = () => {
    onApply(tempSelected);
    onClose();
  };

  const handleSelectAll = () => {
    setTempSelected(filteredGames.slice(0, maxSelection));
  };

  const handleClearAll = () => {
    setTempSelected([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border-2 border-cyan-500">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">
              Pilih Games {provider}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari game..."
              className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Selection Info & Quick Actions */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-300">
              Dipilih: <span className="font-bold text-cyan-400">{tempSelected.length}</span> / {maxSelection}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleSelectAll}
                disabled={filteredGames.length === 0}
                className="text-xs px-3 py-1 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors"
              >
                Pilih Semua
              </button>
              <button
                onClick={handleClearAll}
                disabled={tempSelected.length === 0}
                className="text-xs px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors"
              >
                Hapus Semua
              </button>
            </div>
          </div>
        </div>

        {/* Games List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {filteredGames.map((game) => {
                const isSelected = tempSelected.some(g => g.id === game.id);
                const isDisabled = !isSelected && tempSelected.length >= maxSelection;

                return (
                  <button
                    key={game.id}
                    onClick={() => toggleGame(game)}
                    disabled={isDisabled}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? 'bg-cyan-600/20 border-cyan-500'
                        : isDisabled
                        ? 'bg-gray-700/50 border-gray-600 cursor-not-allowed opacity-50'
                        : 'bg-gray-700 border-gray-600 hover:border-cyan-500/50'
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'bg-cyan-500 border-cyan-500'
                          : 'bg-gray-600 border-gray-500'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>

                    {/* Game Image */}
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-12 h-12 object-cover rounded"
                    />

                    {/* Game Name */}
                    <span className="flex-1 text-white font-medium">
                      {game.name}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Tidak ada game ditemukan</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleApply}
            disabled={tempSelected.length === 0}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            Terapkan ({tempSelected.length})
          </button>
        </div>
      </div>
    </div>
  );
}
