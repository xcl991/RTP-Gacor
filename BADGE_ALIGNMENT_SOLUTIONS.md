# Badge Alignment Solutions - Multiple Approaches

## Problem
Badge text (RTP percentages like "91%" and game counts like "8 Games") tidak sejajar / warping saat di-render dan di-screenshot.

## Causes
1. **Font baseline rendering** - Different browsers render font baseline differently
2. **Inherited CSS** - Tailwind classes can override inline styles
3. **Line-height computation** - Browser calculates line-height differently
4. **Flexbox rendering** - Some browsers have flexbox bugs
5. **Transform/zoom effects** - CSS transforms can cause sub-pixel rendering issues

---

## ✅ SOLUTION 1: Inline Flex with CSS Reset (IMPLEMENTED)

**File**: `GalaxyLayout2.tsx`

```typescript
<div
  style={{
    // Remove ALL classNames, use 100% inline styles
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '24px',
    padding: '0 10px',
    // Explicit font properties
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '1',  // CRITICAL
    letterSpacing: '0',
    textAlign: 'center',
    verticalAlign: 'middle',
    // Reset inherited styles
    margin: '0',
    border: 'none',
    textDecoration: 'none',
    textTransform: 'none',
    whiteSpace: 'nowrap',
    // Visual
    backgroundColor: '#ffd700',
    color: '#000',
    borderRadius: '9999px',
    boxShadow: '0 0 10px #ffd700'
  }}
>
  {value}%
</div>
```

**Pros**: Works in most modern browsers
**Cons**: Flexbox can still have sub-pixel issues in some browsers

---

## ✅ SOLUTION 2: CSS Grid Centering (ALTERNATIVE)

**Replace display flex with grid**:

```typescript
<div
  style={{
    display: 'inline-grid',  // Grid instead of flex
    placeItems: 'center',    // Perfect centering shorthand
    height: '24px',
    minWidth: '45px',
    padding: '0 10px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '1',
    backgroundColor: '#ffd700',
    color: '#000',
    borderRadius: '9999px',
    boxShadow: '0 0 10px #ffd700'
  }}
>
  {value}%
</div>
```

**Pros**: CSS Grid `place-items: center` is the most reliable centering method
**Cons**: Slightly less browser support (but still 95%+)

---

## ✅ SOLUTION 3: Table-Cell Method (MOST RELIABLE)

**Using display: table-cell**:

```typescript
<div style={{ display: 'table', height: '24px', minWidth: '45px' }}>
  <div
    style={{
      display: 'table-cell',
      verticalAlign: 'middle',
      textAlign: 'center',
      padding: '0 10px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: '1',
      backgroundColor: '#ffd700',
      color: '#000',
      borderRadius: '9999px',
      boxShadow: '0 0 10px #ffd700'
    }}
  >
    {value}%
  </div>
</div>
```

**Pros**: Works in ALL browsers including very old ones, most reliable vertical centering
**Cons**: Requires nested div structure

---

## ✅ SOLUTION 4: Padding-Based Centering (NO FLEXBOX)

**Manual padding calculation**:

```typescript
<div
  style={{
    display: 'inline-block',
    height: '24px',
    minWidth: '45px',
    // Manual centering with padding
    paddingTop: '5px',   // (24px - 14px font-size) / 2
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '14px',  // Same as font-size
    textAlign: 'center',
    backgroundColor: '#ffd700',
    color: '#000',
    borderRadius: '9999px',
    boxShadow: '0 0 10px #ffd700'
  }}
>
  {value}%
</div>
```

**Pros**: No flexbox/grid, works everywhere, very predictable
**Cons**: Requires manual calculation, less flexible

---

## ✅ SOLUTION 5: Transform Translate (SUB-PIXEL PERFECT)

**Using transform for fine-tuning**:

```typescript
<div
  style={{
    position: 'relative',
    display: 'inline-block',
    height: '24px',
    minWidth: '45px',
    backgroundColor: '#ffd700',
    borderRadius: '9999px',
    boxShadow: '0 0 10px #ffd700'
  }}
>
  <span
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',  // Perfect centering
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: '1',
      color: '#000',
      whiteSpace: 'nowrap'
    }}
  >
    {value}%
  </span>
</div>
```

**Pros**: Sub-pixel perfect centering, works with any font
**Cons**: Requires nested element, transform can cause blurry text in some browsers

---

## 🔧 Screenshot Fix (IMPLEMENTED)

**File**: `page.tsx` - `onclone` callback

Automatically forces proper centering for all badge elements during screenshot:

```typescript
// Force flexbox properties for rounded badges
if (computedStyle.borderRadius && parseFloat(computedStyle.borderRadius) > 50) {
  htmlEl.style.display = 'inline-flex';
  htmlEl.style.alignItems = 'center';
  htmlEl.style.justifyContent = 'center';
  htmlEl.style.lineHeight = '1';
  htmlEl.style.textAlign = 'center';
  htmlEl.style.verticalAlign = 'middle';
}
```

---

## 🎯 Recommendation

1. **Current implementation (Solution 1)** should work for 95% of cases
2. If still having issues, try **Solution 3 (Table-Cell)** - most reliable
3. For pixel-perfect results, combine **Solution 1** with **Solution 5 (Transform)**

---

## 🧪 Testing

Test in these browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari (macOS/iOS)

Test these scenarios:
- Live preview in browser
- Screenshot/download result
- Different zoom levels (90%, 100%, 110%, 125%)
- Different screen DPIs (1x, 1.5x, 2x, 3x)

---

## 📝 Debug Checklist

If alignment still broken:

1. ✅ Check `lineHeight` is explicitly set to `'1'`
2. ✅ Check NO Tailwind classes on badge element (use inline styles only)
3. ✅ Check `fontFamily` is explicitly set
4. ✅ Check `fontSize` is explicitly set (not inheriting)
5. ✅ Check browser zoom level is 100%
6. ✅ Check no parent elements have `transform` or `zoom` properties
7. ✅ Check html2canvas version is latest (1.4.1+)
8. ✅ Inspect element in DevTools - check computed styles

---

## 💡 Last Resort: SVG Text

If ALL solutions fail, use SVG for guaranteed perfect rendering:

```typescript
<svg width="60" height="24" style={{ display: 'inline-block' }}>
  <rect width="60" height="24" rx="12" fill="#ffd700" />
  <text
    x="30"
    y="12"
    textAnchor="middle"
    dominantBaseline="middle"
    fill="#000"
    fontFamily="system-ui, sans-serif"
    fontSize="14"
    fontWeight="700"
  >
    {value}%
  </text>
</svg>
```

SVG text centering is pixel-perfect across ALL browsers and renderers.
