import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileType = file.type
    const fileName = file.name
    const buffer = Buffer.from(await file.arrayBuffer())

    let extractedText = ''

    // Route to appropriate parser
    if (fileType === 'application/pdf') {
      const pdfParse = (await import('pdf-parse')).default
      const data = await pdfParse(buffer)
      extractedText = data.text
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      fileType === 'application/vnd.ms-excel'
    ) {
      const XLSX = await import('xlsx')
      const workbook = XLSX.read(buffer, { type: 'buffer' })
      const sheets = workbook.SheetNames.map((name) => ({
        sheet: name,
        data: XLSX.utils.sheet_to_json(workbook.Sheets[name]),
      }))
      extractedText = JSON.stringify(sheets, null, 2)
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer })
      extractedText = result.value
    } else if (fileType.startsWith('image/')) {
      // OCR via Tesseract.js
      const Tesseract = await import('tesseract.js')
      const { data: { text } } = await Tesseract.recognize(buffer, 'eng')
      extractedText = text
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 415 })
    }

    // Send to AI for analysis
    const aiSummary = await analyzeWithAI(extractedText, fileName)

    return NextResponse.json({
      success: true,
      fileName,
      fileType,
      extractedText: extractedText.slice(0, 5000), // preview
      aiSummary,
    })
  } catch (error) {
    console.error('Document parse error:', error)
    return NextResponse.json({ error: 'Failed to parse document' }, { status: 500 })
  }
}

async function analyzeWithAI(text: string, fileName: string): Promise<string> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const message = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are an expert CA (Chartered Accountant). Analyze the following financial document named "${fileName}" and extract:
1. Document type (Form 16, bank statement, salary slip, ITR, investment statement, etc.)
2. Key financial figures (income, tax deducted, investments, deductions)
3. Tax year / financial year
4. Any red flags or important notes
5. Recommended action items

Document content:
${text.slice(0, 8000)}

Provide a structured, concise summary.`,
      },
    ],
  })

  return (message.content[0] as { type: string; text: string }).text
}
