import { NextRequest, NextResponse } from 'next/server';
import { WEBSITES, RTP_STYLES, TIME_SLOTS, BACKGROUNDS } from '@/data/games';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      websiteId = 'galaxy77bet',
      pragmaticCount = 8,
      pgSoftCount = 8,
      timeSlotId = 'evening',
      backgroundId = 0,
      styleId = 'galaxy'
    } = body;

    // Get selected options
    const website = WEBSITES.find(w => w.id === websiteId) || WEBSITES[0];
    const timeSlot = TIME_SLOTS.find(t => t.id === timeSlotId) || TIME_SLOTS[0];
    const background = BACKGROUNDS[backgroundId] || BACKGROUNDS[0];
    const style = RTP_STYLES.find(s => s.id === styleId) || RTP_STYLES[0];

    return NextResponse.json({
      success: true,
      data: {
        website,
        pragmaticCount,
        pgSoftCount,
        timeSlot,
        background,
        style
      }
    });
  } catch (error) {
    console.error('Error in generate-rtp API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}