'use client';

import { TrikConfig, CardStyleOption } from '@/types';
import { Check, X } from 'lucide-react';

// Font size configurations
// Default: All trick gacor text values set to 20px
const fontSizeConfig = {
  xs: {
    title: 'text-sm',
    titleSize: 14,
    depositKode: 'text-xl',
    label: 12,
    value: 'text-base',
    badge: 'text-[10px]',
    itemName: 'text-[14px]',
    itemValue: 34,
    customText: 26,
    iconSize: 12,
    padding: 'p-2',
    headerPadding: 'px-2 py-1',
    itemPadding: 'px-1.5 py-1',
    gap: 'gap-0.5'
  },
  sm: {
    title: 'text-xl',
    titleSize: 20,
    depositKode: 'text-4xl',
    label: 16,
    value: 'text-xl',
    badge: 'text-[14px]',
    itemName: 'text-[20px]',
    itemValue: 34,
    customText: 26,
    iconSize: 20,
    padding: 'p-2',
    headerPadding: 'px-2 py-1',
    itemPadding: 'px-1.5 py-0.5',
    gap: 'gap-0.5'
  },
  md: {
    title: 'text-lg',
    titleSize: 18,
    depositKode: 'text-3xl',
    label: 14,
    value: 'text-lg',
    badge: 'text-sm',
    itemName: 'text-[18px]',
    itemValue: 34,
    customText: 26,
    iconSize: 16,
    padding: 'p-3',
    headerPadding: 'px-3 py-2',
    itemPadding: 'px-2 py-1',
    gap: 'gap-1'
  },
  lg: {
    title: 'text-xl',
    titleSize: 20,
    depositKode: 'text-4xl',
    label: 15,
    value: 'text-xl',
    badge: 'text-base',
    itemName: 'text-[21px]',
    itemValue: 34,
    customText: 26,
    iconSize: 18,
    padding: 'p-4',
    headerPadding: 'px-4 py-2.5',
    itemPadding: 'px-2.5 py-1.5',
    gap: 'gap-1'
  },
  xl: {
    title: 'text-2xl',
    titleSize: 24,
    depositKode: 'text-5xl',
    label: 16,
    value: 'text-2xl',
    badge: 'text-lg',
    itemName: 'text-[23px]',
    itemValue: 34,
    customText: 26,
    iconSize: 20,
    padding: 'p-5',
    headerPadding: 'px-5 py-3',
    itemPadding: 'px-3 py-2',
    gap: 'gap-1.5'
  }
};

// Komponen untuk menampilkan pattern centang/silang dengan ukuran adaptif
const PatternDisplay = ({ pattern, iconSize }: { pattern: string; iconSize: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {pattern.split('').map((char, index) => (
        <span key={index}>
          {char === 'V' ? (
            <Check
              className="text-green-400"
              style={{ width: iconSize, height: iconSize }}
            />
          ) : (
            <X
              className="text-red-400"
              style={{ width: iconSize, height: iconSize }}
            />
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
  // Hide fitur ganda section (for PG Soft)
  hideFiturGanda?: boolean;
  // Horizontal layout for items (name | value | pattern inline)
  horizontalItems?: boolean;
}

export default function TrikPanel({
  trik,
  providerColor,
  fontFamily = 'inherit',
  cardStyle,
  variant = 'default',
  hideFiturGanda = false,
  horizontalItems = false
}: TrikPanelProps) {
  if (!trik.enabled) return null;

  // Get font size config
  const sizes = fontSizeConfig[trik.fontSize || 'md'];

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
        className={`${sizes.headerPadding} text-center relative z-10`}
        style={{
          background: styles.headerBg,
          borderBottom: `1px solid ${providerColor}50`
        }}
      >
        <h3
          className={`${sizes.title} font-black uppercase tracking-wider ${isMono ? 'font-mono' : ''}`}
          style={{
            color: providerColor,
            textShadow: `0 0 10px ${providerColor}, 0 0 20px ${providerColor}50`
          }}
        >
          {isMono ? `> ${trik.title.replace(/\s+/g, '_')}` : trik.title}
        </h3>
      </div>

      {/* Content */}
      <div className={`${sizes.padding} flex-1 flex flex-col justify-between ${sizes.gap} relative z-10`}>
        {/* Deposit Kode */}
        <div className={`rounded-lg ${sizes.itemPadding} text-center`} style={{ background: styles.itemBg }}>
          <span
            className={`text-gray-400 block leading-tight ${isMono ? 'font-mono' : ''}`}
            style={{ fontSize: sizes.label }}
          >
            {isMono ? 'DEPOSIT_KODE_UNIK' : 'DEPOSIT KODE UNIK'}
          </span>
          <span
            className={`${sizes.depositKode} font-black leading-tight ${isMono ? 'font-mono' : ''}`}
            style={{
              color: providerColor,
              textShadow: `0 0 10px ${providerColor}`
            }}
          >
            {trik.depositKode}
          </span>
        </div>

        {/* Putaran Bet */}
        <div className={`rounded-lg ${sizes.itemPadding} text-center`} style={{ background: styles.itemBg }}>
          <span
            className={`text-gray-400 block leading-tight ${isMono ? 'font-mono' : ''}`}
            style={{ fontSize: sizes.label }}
          >
            {isMono ? 'PUTARAN_BET' : 'PUTARAN BET'}
          </span>
          <span
            className={`${sizes.value} font-bold leading-tight ${isMono ? 'font-mono' : ''}`}
            style={{ color: providerColor }}
          >
            {trik.putaranBetMin.toLocaleString()} - {trik.putaranBetMax.toLocaleString()}
          </span>
        </div>

        {/* Fitur Ganda - Invisible placeholder for PG Soft to maintain equal height */}
        <div
          className={`rounded-lg ${sizes.itemPadding} text-center`}
          style={{
            background: styles.itemBg,
            visibility: hideFiturGanda ? 'hidden' : 'visible',
            pointerEvents: hideFiturGanda ? 'none' : 'auto'
          }}
        >
          <span
            className={`text-gray-400 block leading-tight ${isMono ? 'font-mono' : ''}`}
            style={{ fontSize: sizes.label }}
          >
            {isMono ? 'FITUR_GANDA' : 'FITUR GANDA'}
          </span>
          <span
            className={`${sizes.badge} font-bold px-2 py-0.5 rounded-full inline-block ${isMono ? 'font-mono' : ''} ${
              trik.fiturGanda ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}
          >
            MODE {trik.fiturGanda ? 'ON' : 'OFF'}
          </span>
        </div>

        {/* Trik Items */}
        <div className={`${sizes.gap} flex-1 flex flex-col justify-center`} style={{ gap: trik.fontSize === 'xs' ? '2px' : trik.fontSize === 'sm' ? '2px' : '4px' }}>
          {trik.trikItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center ${horizontalItems ? 'justify-between gap-3' : variant === 'elegant' ? 'justify-between' : 'justify-center'} rounded ${sizes.itemPadding}`}
              style={{ background: styles.itemBg }}
            >
              {horizontalItems ? (
                // Horizontal layout: name | value (centered) | pattern
                <>
                  <span className={`text-white ${sizes.itemName} font-semibold ${isMono ? 'font-mono' : ''} flex-shrink-0 flex-1 text-left`}>
                    {item.name}
                  </span>
                  <span className={`font-bold ${isMono ? 'font-mono' : ''} flex-shrink-0 text-center min-w-[60px]`} style={{ color: providerColor, fontSize: variant === 'futuristic' ? '26px' : variant === 'classic' ? '22px' : '20px' }}>
                    {item.value}
                  </span>
                  <div className="flex-shrink-0 flex-1 flex justify-end">
                    <PatternDisplay pattern={item.pattern} iconSize={sizes.iconSize} />
                  </div>
                </>
              ) : variant === 'elegant' ? (
                // Casino Luxury (elegant) - Keep original format: name and value stacked
                <>
                  <div className="flex flex-col leading-tight">
                    <span className={`text-white ${sizes.itemName} font-semibold ${isMono ? 'font-mono' : ''}`}>
                      {item.name}
                    </span>
                    <span
                      className={`font-bold ${isMono ? 'font-mono' : ''}`}
                      style={{ color: providerColor, fontSize: sizes.itemValue }}
                    >
                      {item.value}
                    </span>
                  </div>
                  <PatternDisplay pattern={item.pattern} iconSize={sizes.iconSize} />
                </>
              ) : (
                // Other layouts: name | 10x | pattern (automatic format - compact)
                <div className="flex items-center justify-between leading-tight w-full">
                  <span className={`text-white ${sizes.itemName} font-semibold ${isMono ? 'font-mono' : ''} flex-1 text-left`}>
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-gray-500" style={{ fontSize: sizes.itemValue }}>|</span>
                    <span
                      className={`font-bold ${isMono ? 'font-mono' : ''} min-w-[40px] text-center`}
                      style={{ color: providerColor, fontSize: sizes.itemValue }}
                    >
                      10x
                    </span>
                    <span className="text-gray-500" style={{ fontSize: sizes.itemValue }}>|</span>
                    <PatternDisplay pattern={item.pattern} iconSize={sizes.iconSize} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Custom Text - Dinonaktifkan untuk variant cyberpunk (Cyberpunk Terminal) */}
        {variant !== 'cyberpunk' && (
          <div
            className={`text-center ${sizes.itemPadding} rounded-lg`}
            style={{
              background: `linear-gradient(90deg, transparent, ${providerColor}20, transparent)`,
              border: `1px solid ${providerColor}30`
            }}
          >
            <p
              className={`font-bold uppercase leading-tight ${isMono ? 'font-mono' : ''}`}
              style={{
                color: providerColor,
                textShadow: `0 0 5px ${providerColor}50`,
                fontSize: sizes.customText
              }}
            >
              {trik.customText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
