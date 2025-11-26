import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { WEBSITES, RTP_STYLES, TIME_SLOTS, BACKGROUND_CATEGORIES } from '@/data/games';

// Input validation schema
const generateRTPSchema = z.object({
  websiteId: z.string().optional().default('galaxy77bet'),
  pragmaticCount: z.number().min(1).max(20).optional().default(8),
  pgSoftCount: z.number().min(1).max(20).optional().default(8),
  timeSlotId: z.string().optional().default('evening'),
  backgroundCategoryId: z.string().optional().default('casino'),
  backgroundIndex: z.number().min(0).optional().default(0),
  styleId: z.string().optional().default('galaxy')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = generateRTPSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: result.error.errors },
        { status: 400 }
      );
    }

    const { websiteId, pragmaticCount, pgSoftCount, timeSlotId, backgroundCategoryId, backgroundIndex, styleId } = result.data;

    // Get selected options
    const website = WEBSITES.find(w => w.id === websiteId) || WEBSITES[0];
    const timeSlot = TIME_SLOTS.find(t => t.id === timeSlotId) || TIME_SLOTS[0];
    const style = RTP_STYLES.find(s => s.id === styleId) || RTP_STYLES[0];

    // Get background from categories
    const category = BACKGROUND_CATEGORIES.find(c => c.id === backgroundCategoryId) || BACKGROUND_CATEGORIES[0];
    const background = category.backgrounds[backgroundIndex] || category.backgrounds[0];

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