# RTP Live Generator

Website RTP Design Generator yang memiliki fungsi untuk generate Gambar RTP beserta jam main, game list dari pragmatic play dan pgsoft.

## Fitur

### 🎯 Fitur Utama
- **Website Selector**: Dropdown untuk memilih nama website (GALAXY77BET, SULTAN88, RAJACASINO88, MPO777, BOSWIN168)
- **Game Management**: Atur jumlah game yang ditampilkan untuk Pragmatic Play dan PG Soft (1-20 games)
- **Shuffle Functions**: 
  - Acak Games - Mengacak urutan game
  - Acak Jam - Mengacak waktu (00:00-12:00, 12:00-18:00, 18:00-00:00 WIB)
  - Acak Background - Mengacak background (6 pilihan background)
  - Acak Style - Mengacak style RTP (5 pilihan style)
- **Image Generation**: Generate dan download gambar RTP menggunakan html2canvas

### 🎨 RTP Styles
1. **Galaxy Style** - Cyan dan Gold dengan background gelap
2. **Neon Style** - Pink dan Hijau dengan background hitam
3. **Royal Style** - Gold dan Merah dengan background royal
4. **Ocean Style** - Biru laut dengan background ocean
5. **Forest Style** - Hijau forest dengan background alam

### 🎮 Game Providers
- **Pragmatic Play**: 100+ games dengan RTP 85-98%
- **PG Soft**: 60+ games dengan RTP 85-98%

### 🖼️ Background Collection
- 6 background beresolusi tinggi dengan tema galaxy
- Auto-overlay untuk kontras yang lebih baik

## Cara Penggunaan

1. **Pilih Website**: Gunakan dropdown untuk memilih website
2. **Atur Jumlah Game**: Set jumlah game untuk Pragmatic Play dan PG Soft
3. **Customize Tampilan**:
   - Klik "Acak Games" untuk mengacak urutan game
   - Klik "Acak Jam" untuk mengacak waktu
   - Klik "Acak Background" untuk mengubah background
   - Klik "Acak Style" untuk mengubah style RTP
4. **Generate Image**: Klik "Generate & Download Image" untuk mengunduh gambar RTP

## Teknologi

- **Framework**: Next.js 15 dengan App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 dengan shadcn/ui
- **Image Generation**: html2canvas
- **Icons**: Lucide React
- **State Management**: React Hooks

## Struktur Proyek

```
src/
├── app/
│   ├── api/generate-rtp/     # API untuk generate RTP
│   └── page.tsx             # Halaman utama
├── components/
│   ├── Header.tsx            # Header dengan controls
│   ├── GameGrid.tsx         # Grid untuk menampilkan games
│   └── RTPPreview.tsx       # Preview dan download
├── data/
│   └── games.ts             # Data games, websites, styles
├── types/
│   └── index.ts             # TypeScript interfaces
└── lib/
    └── db.ts               # Database connection (untuk ekstensi)
```

## Instalasi

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production
npm start
```

## Dependencies

- **next**: ^15.3.5
- **react**: ^19.0.0
- **typescript**: ^5.7.2
- **tailwindcss**: ^4.0.0
- **html2canvas**: ^1.4.1
- **lucide-react**: ^0.469.0
- **@tailwindcss/line-clamp**: ^0.4.4

## Customization

### Menambah Website Baru
Edit `src/data/games.ts` dan tambahkan ke array `WEBSITES`:

```typescript
{
  id: "website-id",
  name: "WEBSITE NAME",
  logo: "https://example.com/logo.png"
}
```

### Menambah Style Baru
Edit `src/data/games.ts` dan tambahkan ke array `RTP_STYLES`:

```typescript
{
  id: "style-id",
  name: "Style Name",
  primaryColor: "#color1",
  secondaryColor: "#color2",
  backgroundColor: "#color3",
  accentColor: "#color4"
}
```

### Menambah Background Baru
Edit `src/data/games.ts` dan tambahkan ke array `BACKGROUNDS`:

```typescript
"https://example.com/background.jpg"
```

## Contoh Gambar RTP

Generated gambar akan memiliki:
- Header dengan logo website dan judul
- Tanggal dan waktu yang dipilih
- Grid games Pragmatic Play dengan RTP
- Grid games PG Soft dengan RTP
- Footer dengan link Telegram
- Background dan style yang dipilih

## License

MIT License - lihat file LICENSE untuk detail

## Support

Untuk support atau pertanyaan, silakan hubungi development team.