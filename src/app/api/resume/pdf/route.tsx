import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { getResumeContent } from '@/lib/resume-data'
import { ResumePDF } from '@/lib/resume-pdf'

export async function GET() {
  const content = await getResumeContent()
  const pdfBuffer = await renderToBuffer(<ResumePDF content={content} />)

  return new NextResponse(pdfBuffer as unknown as ReadableStream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="cv-sebastian-velasco.pdf"`,
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
