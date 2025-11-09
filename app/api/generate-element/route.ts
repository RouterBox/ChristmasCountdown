import { NextRequest, NextResponse } from 'next/server'
import { generateChristmasImage, getRandomChristmasElementType } from '@/lib/leonardo'

export async function POST(request: NextRequest) {
  try {
    const { elementType } = await request.json()
    
    const type = elementType || getRandomChristmasElementType()
    const image = await generateChristmasImage(type)

    if (!image) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      )
    }

    return NextResponse.json({ image })
  } catch (error) {
    console.error('Error in generate-element API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

