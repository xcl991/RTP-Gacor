'use client';

import { TrikConfig, CardStyleOption } from '@/types';
import { Check, X } from 'lucide-react';

// Komponen untuk menampilkan pattern centang/silang
const PatternDisplay = ({ pattern, color }: { pattern: string; color: string }) => {
  return (
    <div className="flex items-center gap-0.5">
      {pattern.split('').map((char, index) => (
        <span key={index}>
          {char === 'V' ? (
            <Check className="w-3 h-3 text-green-400" />
          ) : (
            <X className="w-3 h-3 text-red-400" />
          )}
        </span>
      ))}
    </div>
  );
};

interface TrikPanelProps {
  trik: TrikConfig;
  providerColor: string;
  // Style customization
  fontFamily?: string;
  cardStyle?: CardStyleOption;
  // Layout variant styles
  variant?: 'default' | 'classic' | 'futuristic' | 'neon' | 'elegant' | 'cyber' | 'galaxy' | 'cyberpunk' | 'steampunk';
}

export default function TrikPanel({
  trik,
  providerColor,
  fontFamily = 'inherit',
  cardStyle,
  variant = 'default'
}: TrikPanelProps) {
  if (!trik.enabled) return null;

  // Get variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'classic':
        return {
          background: cardStyle?.background || `linear-gradient(to bottom, ${providerColor}20, rgba(0,0,0,0.8))`,
          border: cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `2px solid ${providerColor}`,
          headerBg: `linear-gradient(90deg, transparent, ${providerColor}30, transparent)`,
          itemBg: 'rgba(0,0,0,0.5)',
          shadow: cardStyle?.shadow || `0 0 15px ${providerColor}30`
        };
      case 'futuristic':
        return {
          background: cardStyle?.background || 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))',
          border: cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `1px solid rgba(255,255,255,0.1)`,
          headerBg: `linear-gradient(90deg, transparent, ${providerColor}20, transparent)`,
          itemBg: 'rgba(0,0,0,0.4)',
          shadow: cardStyle?.shadow || 'none',
          topAccent: providerColor
        };
      case 'neon':
        return {
          background: cardStyle?.background || 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)',
          border: cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `2px solid ${providerColor}`,
          headerBg: `linear-gradient(90deg, transparent, ${providerColor}30, transparent)`,
          itemBg: 'rgba(10,10,21,0.8)',
          shadow: cardStyle?.shadow || `0 0 20px ${providerColor}40, inset 0 0 20px ${providerColor}10`
        };
      case 'elegant':
        return {
          background: cardStyle?.background || 'linear-gradient(145deg, #2a2215 0%, #1a1508 100%)',
          border: cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `1px solid ${providerColor}`,
          headerBg: `linear-gradient(90deg, transparent, ${providerColor}20, transparent)`,
          itemBg: 'rgba(13,10,4,0.8)',
          shadow: cardStyle?.shadow || `0 4px 20px ${providerColor}30`
        };
      case 'cyber':
        return {
          background: cardStyle?.background || 'linear-gradient(90deg, rgba(0,0,0,0.9), rgba(20,20,30,0.95))',
          border: cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `1px solid ${providerColor}`,
          headerBg: `linear-gradient(90deg, ${providerColor}20, transparent)`,
          itemBg: 'rgba(0,0,0,0.6)',
          shadow: cardStyle?.shadow || 'none',
          leftAccent: providerColor
        };
      case 'galaxy':
        return {
          background: cardStyle?.background || 'linear-gradient(145deg, rgba(15,15,35,0.95), rgba(5,5,20,0.98))',
          border: cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `2px solid ${providerColor}60`,
          headerBg: `linear-gradient(90deg, transparent, ${providerColor}30, transparent)`,
          itemBg: 'rgba(0,0,0,0.5)',
          shadow: cardStyle?.shadow || `0 0 20px ${providerColor}30, inset 0 0 30px rgba(0,0,0,0.5)`
        };
      case 'cyberpunk':
        return {
          background: cardStyle?.background || 'linear-gradient(180deg, rgba(0,0,0,0.95), rgba(10,10,20,0.9))',
          border: cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `2px solid ${providerColor}`,
          headerBg: `linear-gradient(90deg, ${providerColor}20, transparent)`,
          itemBg: 'rgba(0,0,0,0.7)',
          shadow: cardStyle?.shadow || `0 0 20px ${providerColor}30, inset 0 0 30px rgba(0,0,0,0.8)`,
          leftAccent: providerColor
        };
      case 'steampunk':
        return {
          background: cardStyle?.background || 'linear-gradient(145deg, rgba(45,35,25,0.95), rgba(25,18,12,0.98))',
          border: cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `3px solid ${providerColor}`,
          headerBg: `linear-gradient(90deg, transparent, ${providerColor}30, transparent)`,
          itemBg: 'rgba(0,0,0,0.4)',
          shadow: cardStyle?.shadow || `inset 0 0 20px ${providerColor}30`
        };
      default:
        return {
          background: cardStyle?.background || 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,20,40,0.95) 100%)',
          border: cardStyle?.border ? `${cardStyle.border} ${providerColor}` : `2px solid ${providerColor}`,
          headerBg: `linear-gradient(90deg, transparent, ${providerColor}30, transparent)`,
          itemBg: 'rgba(0,0,0,0.5)',
          shadow: cardStyle?.shadow || `0 0 15px ${providerColor}30, inset 0 0 20px rgba(0,0,0,0.5)`
        };
    }
  };

  const styles = getVariantStyles();
  const isMono = variant === 'cyber' || variant === 'cyberpunk';

  return (
    <div
      className="h-full rounded-xl overflow-hidden flex flex-col relative"
      style={{
        background: styles.background,
        border: styles.border,
        boxShadow: styles.shadow,
        fontFamily: fontFamily,
        opacity: cardStyle?.opacity || 1
      }}
    >
      {/* Pattern Overlay */}
      {cardStyle?.pattern && cardStyle.pattern !== 'none' && (
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            backgroundImage: cardStyle.pattern,
            backgroundRepeat: 'repeat'
          }}
        />
      )}

      {/* Top/Left Accent for certain variants */}
      {(styles as any).topAccent && (
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: (styles as any).topAccent }} />
      )}
      {(styles as any).leftAccent && (
        <div className="absolute top-0 left-0 w-1 h-full" style={{ background: (styles as any).leftAccent }} />
      )}

      {/* Header */}
      <div
        className="px-3 py-2 text-center relative z-10"
        style={{
          background: styles.headerBg,
          borderBottom: `1px solid ${providerColor}50`
        }}
      >
        <h3
          className={`text-base font-black uppercase tracking-wider ${isMono ? 'font-mono' : ''}`}
          style={{
            color: providerColor,
            textShadow: `0 0 10px ${providerColor}, 0 0 20px ${providerColor}50`
          }}
        >
          {isMono ? '> TRIK_GACOR' : 'TRIK GACOR'}
        </h3>
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col justify-between gap-1 relative z-10">
        {/* Deposit Kode */}
        <div className="rounded-lg px-2 py-1.5 text-center" style={{ background: styles.itemBg }}>
          <span className={`text-gray-400 text-[10px] block leading-tight ${isMono ? 'font-mono' : ''}`}>
            {isMono ? 'DEPOSIT_KODE_UNIK' : 'DEPOSIT KODE UNIK'}
          </span>
          <span
            className={`text-xl font-black leading-tight ${isMono ? 'font-mono' : ''}`}
            style={{
              color: providerColor,
              textShadow: `0 0 10px ${providerColor}`
            }}
          >
            {trik.depositKode}
          </span>
        </div>

        {/* Putaran Bet */}
        <div className="rounded-lg px-2 py-1.5 text-center" style={{ background: styles.itemBg }}>
          <span className={`text-gray-400 text-[10px] block leading-tight ${isMono ? 'font-mono' : ''}`}>
            {isMono ? 'PUTARAN_BET' : 'PUTARAN BET'}
          </span>
          <span
            className={`text-sm font-bold leading-tight ${isMono ? 'font-mono' : ''}`}
            style={{ color: providerColor }}
          >
            {trik.putaranBetMin.toLocaleString()} - {trik.putaranBetMax.toLocaleString()}
          </span>
        </div>

        {/* Fitur Ganda */}
        <div className="rounded-lg px-2 py-1.5 text-center" style={{ background: styles.itemBg }}>
          <span className={`text-gray-400 text-[10px] block leading-tight ${isMono ? 'font-mono' : ''}`}>
            {isMono ? 'FITUR_GANDA' : 'FITUR GANDA'}
          </span>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${isMono ? 'font-mono' : ''} ${
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
              className="flex items-center justify-between rounded px-2 py-1"
              style={{ background: styles.itemBg }}
            >
              <div className="flex flex-col leading-tight">
                <span className={`text-white text-xs font-semibold ${isMono ? 'font-mono' : ''}`}>{item.name}</span>
                <span
                  className={`text-[10px] font-bold ${isMono ? 'font-mono' : ''}`}
                  style={{ color: providerColor }}
                >
                  {item.value}
                </span>
              </div>
              <PatternDisplay pattern={item.pattern} color={providerColor} />
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
            className={`text-[10px] font-bold uppercase leading-tight ${isMono ? 'font-mono' : ''}`}
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
}
