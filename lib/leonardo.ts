/**
 * Leonardo.ai API Integration
 * Generates Christmas-themed images for the countdown scene
 */

export interface GenerateImageRequest {
  prompt: string
  negativePrompt?: string
  width?: number
  height?: number
  numImages?: number
}

export interface GeneratedImage {
  id: string
  url: string
  width: number
  height: number
}

const LEONARDO_API_BASE = 'https://cloud.leonardo.ai/api/rest/v1'

/**
 * Generate a Christmas-themed image using Leonardo.ai
 */
export async function generateChristmasImage(
  elementType: string
): Promise<GeneratedImage | null> {
  const apiKey = process.env.LEONARDO_API_KEY

  if (!apiKey) {
    console.warn('Leonardo API key not found. Using fallback.')
    return null
  }

  try {
    // Step 1: Create a generation
    const prompt = getChristmasPrompt(elementType)
    
    const generateResponse = await fetch(`${LEONARDO_API_BASE}/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        negative_prompt: 'scary, dark, gloomy, violent, sad, ugly, distorted',
        modelId: 'aa77f04e-3eec-4034-9c07-d0f619684628', // Leonardo Diffusion XL
        width: 512,
        height: 512,
        num_images: 1,
        guidance_scale: 7,
        sd_version: 'SDXL_1_0',
        presetStyle: 'CINEMATIC',
      }),
    })

    if (!generateResponse.ok) {
      throw new Error(`Leonardo API error: ${generateResponse.status}`)
    }

    const generateData = await generateResponse.json()
    const generationId = generateData.sdGenerationJob.generationId

    // Step 2: Poll for completion
    let attempts = 0
    const maxAttempts = 30 // 30 seconds max wait

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second

      const statusResponse = await fetch(
        `${LEONARDO_API_BASE}/generations/${generationId}`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      )

      if (!statusResponse.ok) {
        throw new Error(`Status check error: ${statusResponse.status}`)
      }

      const statusData = await statusResponse.json()

      if (statusData.generations_by_pk.status === 'COMPLETE') {
        const image = statusData.generations_by_pk.generated_images[0]
        return {
          id: image.id,
          url: image.url,
          width: 512,
          height: 512,
        }
      }

      if (statusData.generations_by_pk.status === 'FAILED') {
        throw new Error('Generation failed')
      }

      attempts++
    }

    throw new Error('Generation timeout')
  } catch (error) {
    console.error('Error generating image:', error)
    return null
  }
}

/**
 * Get a Christmas-themed prompt based on element type
 */
function getChristmasPrompt(elementType: string): string {
  const prompts: Record<string, string> = {
    tree: 'Beautiful decorated Christmas tree with colorful ornaments, twinkling lights, star on top, magical sparkles, festive, joyful, children\'s illustration style, bright colors, high quality',
    santa: 'Jolly Santa Claus with big smile, red suit, white beard, carrying presents, magical sparkles, friendly, cheerful, children\'s illustration style, bright colors, high quality',
    snowman: 'Happy snowman with carrot nose, coal eyes, red scarf, top hat, snowflakes falling, winter wonderland, joyful, children\'s illustration style, bright colors, high quality',
    reindeer: 'Cute reindeer with red nose, antlers, Christmas bells, magical sparkles, friendly expression, flying through sky, children\'s illustration style, bright colors, high quality',
    gift: 'Beautifully wrapped Christmas present with big bow, colorful wrapping paper, ribbons, magical sparkles, festive, children\'s illustration style, bright colors, high quality',
    elf: 'Cheerful Christmas elf with pointy hat, green outfit, helping with toys, big smile, magical workshop, children\'s illustration style, bright colors, high quality',
    candy: 'Giant candy cane, peppermint swirl, red and white stripes, magical sparkles, delicious looking, festive, children\'s illustration style, bright colors, high quality',
    star: 'Bright shining Christmas star, golden glow, magical sparkles, twinkling lights, festive, children\'s illustration style, bright colors, high quality',
    bells: 'Shiny Christmas bells with red bows, golden color, ringing with musical notes, magical sparkles, festive, children\'s illustration style, bright colors, high quality',
    stocking: 'Colorful Christmas stocking filled with gifts and candy, hung by fireplace, cozy, festive, children\'s illustration style, bright colors, high quality',
    gingerbread: 'Adorable gingerbread man with icing smile, candy buttons, waving, magical sparkles, delicious looking, children\'s illustration style, bright colors, high quality',
    sleigh: 'Santa\'s sleigh filled with presents, golden runners, magical sparkles, flying through starry night sky, children\'s illustration style, bright colors, high quality',
  }

  const elementTypes = Object.keys(prompts)
  const randomType = elementTypes[Math.floor(Math.random() * elementTypes.length)]
  
  return prompts[randomType] || prompts.tree
}

/**
 * Get a list of Christmas element types
 */
export function getRandomChristmasElementType(): string {
  const types = [
    'tree', 'santa', 'snowman', 'reindeer', 'gift', 'elf',
    'candy', 'star', 'bells', 'stocking', 'gingerbread', 'sleigh'
  ]
  return types[Math.floor(Math.random() * types.length)]
}

