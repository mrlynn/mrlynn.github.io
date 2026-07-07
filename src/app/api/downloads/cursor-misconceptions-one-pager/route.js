import { generateCursorMisconceptionsPdfBuffer } from '../../../../lib/downloads/generateCursorMisconceptionsPdfBuffer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const buffer = await generateCursorMisconceptionsPdfBuffer();

  return new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        'attachment; filename="cursor-misconceptions-one-pager.pdf"',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
