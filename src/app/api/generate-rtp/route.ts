import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { WEBSITES, RTP_STYLES, TIME_SLOTS, BACKGROUND_CATEGORIES } from '@/data/games';

const requestSchema = z.object({
  websiteId: z.string().default('galaxy77bet'),
  pragmaticCount: z.number().min(1).max(50).default(8),
  pgSoftCount: z.number().min(1).max(50).default(8),
  timeSlotId: z.string().default('evening'),
  backgroundCategory: z.number().default(0),
  backgroundIndex: z.number().default(0),
  styleId: z.string().default('galaxy')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = requestSchema.parse(body);

    const {
      websiteId,
      pragmaticCount,
      pgSoftCount,
      timeSlotId,
      backgroundCategory,
      backgroundIndex,
      styleId
    } = parsed;

    // Get selected options
    const website = WEBSITES.find(w => w.id === websiteId) || WEBSITES[0];
    const timeSlot = TIME_SLOTS.find(t => t.id === timeSlotId) || TIME_SLOTS[0];
    const category = BACKGROUND_CATEGORIES[backgroundCategory] || BACKGROUND_CATEGORIES[0];
    const background = category.backgrounds[backgroundIndex] || category.backgrounds[0];
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
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error in generate-rtp API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}