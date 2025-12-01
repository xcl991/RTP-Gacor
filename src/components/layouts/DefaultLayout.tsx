'use client';

import GameGrid from '../GameGrid';
import { RTPStyle, WebsiteOption, Game, CardStyleOption, TrikConfig } from '@/types';
import { Check, X } from 'lucide-react';

interface DefaultLayoutProps {
  selectedWebsite: WebsiteOption;
  selectedStyle: RTPStyle;
  customTimeLabel: string;
  selectedPragmaticGames: Game[];
  selectedPgSoftGames: Game[];
  pragmaticCount: number;
  pgSoftCount: number;
  getCurrentDate: () => string;
  selectedCardStyle: CardStyleOption;
  pragmaticTrik: TrikConfig;
  pgSoftTrik: TrikConfig;
}

// Komponen untuk menampilkan pattern centang/silang
const PatternDisplay = ({ pattern }: { pattern: string }) => {
  return (
    <div className="flex items-center gap-1">
      {pattern.split('').map((char, index) => (
        <span key={index}>
          {char === 'V' ? (
            <Check className="w-4 h-4 text-green-400" />
          ) : (
            <X className="w-4 h-4 text-red-400" />
          )}
        </span>
      ))}
    </div>
  );
};

// Komponen Panel Trik (Compact - untuk side-by-side layout)
const TrikPanel = ({
  trik,
  provider,
  style
}: {
  trik: TrikConfig;
  provider: 'PRAGMATIC PLAY' | 'PG SOFT';
  style: RTPStyle;
}) => {
  if (!trik.enabled) return null;

  const providerColor = provider === 'PRAGMATIC PLAY' ? '#ffd700' : '#00f0ff';

  return (
    <div
      className="h-full rounded-xl overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,40,0.95) 100%)',
        border: `2px solid ${providerColor}`,
        boxShadow: `0 0 15px ${providerColor}30, inset 0 0 20px rgba(0,0,0,0.5)`
      }}
    >
      {/* Header */}
      <div
        className="px-3 py-2 text-center"
        style={{
          background: `linear-gradient(90deg, transparent, ${providerColor}30, transparent)`,
          borderBottom: `1px solid ${providerColor}50`
        }}
      >
        <h3
          className="text-base font-black uppercase tracking-wider"
          style={{
            color: providerColor,
            textShadow: `0 0 10px ${providerColor}, 0 0 20px ${providerColor}50`
          }}
        >
          TRIK GACOR
        </h3>
      </div>

      {/* Content - flex-1 dan justify-between untuk distribusi merata */}
      <div className="p-3 flex-1 flex flex-col justify-between gap-1">
        {/* Deposit Kode */}
        <div className="bg-black/50 rounded-lg px-2 py-1.5 text-center">
          <span className="text-gray-400 text-[10px] block leading-tight">DEPOSIT KODE UNIK</span>
          <span
            className="text-xl font-black leading-tight"
            style={{
              color: providerColor,
              textShadow: `0 0 10px ${providerColor}`
            }}
          >
            {trik.depositKode}
          </span>
        </div>

        {/* Putaran Bet */}
        <div className="bg-black/50 rounded-lg px-2 py-1.5 text-center">
          <span className="text-gray-400 text-[10px] block leading-tight">PUTARAN BET</span>
          <span
            className="text-sm font-bold leading-tight"
            style={{ color: providerColor }}
          >
            {trik.putaranBetMin.toLocaleString()} - {trik.putaranBetMax.toLocaleString()}
          </span>
        </div>

        {/* Fitur Ganda */}
        <div className="bg-black/50 rounded-lg px-2 py-1.5 text-center">
          <span className="text-gray-400 text-[10px] block leading-tight">FITUR GANDA</span>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${
              trik.fiturGanda ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}
          >
            MODE {trik.fiturGanda ? 'ON' : 'OFF'}
          </span>
        </div>

        {/* Trik Items */}
        <div className="space-y-1 flex-1 flex flex-col justify-center">
          {trik.trikItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-black/50 rounded px-2 py-1"
            >
              <div className="flex flex-col leading-tight">
                <span className="text-white text-xs font-semibold">{item.name}</span>
                <span
                  className="text-[10px] font-bold"
                  style={{ color: providerColor }}
                >
                  {item.value}
                </span>
              </div>
              <PatternDisplay pattern={item.pattern} />
            </div>
          ))}
        </div>

        {/* Custom Text */}
        <div
          className="text-center py-1.5 px-2 rounded-lg"
          style={{
            background: `linear-gradient(90deg, transparent, ${providerColor}20, transparent)`,
            border: `1px solid ${providerColor}30`
          }}
        >
          <p
            className="text-[10px] font-bold uppercase leading-tight"
            style={{
              color: providerColor,
              textShadow: `0 0 5px ${providerColor}50`
            }}
          >
            {trik.customText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function DefaultLayout({
  selectedWebsite,
  selectedStyle,
  customTimeLabel,
  selectedPragmaticGames,
  selectedPgSoftGames,
  pragmaticCount,
  pgSoftCount,
  getCurrentDate,
  selectedCardStyle,
  pragmaticTrik,
  pgSoftTrik
}: DefaultLayoutProps) {
  return (
    <div className="relative z-10 flex flex-col p-8" style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}>
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
            className="text-4xl font-black mb-2 uppercase tracking-wider"
            style={{
              color: selectedStyle.primaryColor,
              textShadow: `0 0 20px ${selectedStyle.primaryColor}, 0 0 40px ${selectedStyle.primaryColor}50`
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
              {customTimeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Games Container */}
      <div className="flex-1 space-y-6">
        {/* Pragmatic Play Section - Side by Side dengan CSS Grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: pragmaticTrik.enabled ? '1fr 256px' : '1fr'
          }}
        >
          {/* RTP Grid */}
          <div className="min-w-0">
            <GameGrid
              title="PRAGMATIC PLAY"
              games={selectedPragmaticGames}
              gameCount={pragmaticCount}
              providerLogo="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd6JBXF6-nJ7cAuYfPpx5tAckyV8KM5guWWeV-ZIHVCUluIE8As1b41nyGJE3FSsL__ImOQ3WOOmymZmvWzECCUR5Qagtg2OdKeatK2elfcSL4rZB-ARMUXCJyWuIY8j29KomqPboqtVqgXBGNyP5LKPgjlfNKkbhnXkgGrAaZ234uQBSauAMzOvQ7zSFq/w411-h274/Pragmatic-Play-logo.png"
              providerColor="#ffd700"
              style={selectedStyle}
              cardStyle={selectedCardStyle}
            />
          </div>
          {/* Trik Panel Pragmatic */}
          {pragmaticTrik.enabled && (
            <div className="min-h-0">
              <TrikPanel trik={pragmaticTrik} provider="PRAGMATIC PLAY" style={selectedStyle} />
            </div>
          )}
        </div>

        {/* PG Soft Section - Side by Side dengan CSS Grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: pgSoftTrik.enabled ? '1fr 256px' : '1fr'
          }}
        >
          {/* RTP Grid */}
          <div className="min-w-0">
            <GameGrid
              title="PG SOFT"
              games={selectedPgSoftGames}
              gameCount={pgSoftCount}
              providerLogo="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyRL8QUJ4ATALDgUz3f6Xzp8WeH_7vGwGW6KYIdsi3gC_F9HkYiTABnlxysMEFraHBkUUnc71XGjXybY7EQNqlN3-Ddz480rPdcV_CWGie6bwGds0LzTZ7JClIkg-t-nCTzMOa_qJJQV_ARXE_dbQajerSg7IyDHiDRYswEQdyRQWs6pTlcFbsTNMzbn07/w539-h303/663b3b87ed4e2097a300be14_pg-soft.png"
              providerColor="#00f0ff"
              style={selectedStyle}
              cardStyle={selectedCardStyle}
            />
          </div>
          {/* Trik Panel PG Soft */}
          {pgSoftTrik.enabled && (
            <div className="min-h-0">
              <TrikPanel trik={pgSoftTrik} provider="PG SOFT" style={selectedStyle} />
            </div>
          )}
        </div>
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
  );
}
