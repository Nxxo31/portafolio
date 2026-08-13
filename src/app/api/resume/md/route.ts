import { NextResponse } from 'next/server'
import { getResumeContent, buildMarkdownResume } from '@/lib/resume-data'

export async function GET() {
  const content = await getResumeContent()
  const md = buildMarkdownResume(content)

  return new NextResponse(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `inline; filename="cv-sebastian-velasco.md"`,
      'Cache-Control': 'no-store, max-age=0',
    },
  })
}
