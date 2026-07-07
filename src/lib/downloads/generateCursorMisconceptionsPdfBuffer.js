import PDFDocument from 'pdfkit';
import { CURSOR_MISCONCEPTIONS_PDF } from './cursorMisconceptionsData';

const colors = {
  bg: '#14120e',
  surface: '#1f1b16',
  surfaceAlt: '#302c26',
  primary: '#d9622b',
  secondary: '#c79a3a',
  text: '#f3efe7',
  muted: '#a69e90',
  line: '#4a453c',
  white: '#faf8f3',
};

function drawRoundedRect(doc, x, y, width, height, radius, fill) {
  doc.save();
  doc.roundedRect(x, y, width, height, radius).fill(fill);
  doc.restore();
}

function drawCellText(doc, text, x, y, width, options = {}) {
  const {
    font = 'Helvetica',
    size = 8,
    color = colors.text,
    lineGap = 1,
  } = options;

  doc
    .font(font)
    .fontSize(size)
    .fillColor(color)
    .text(text, x, y, {
      width,
      lineGap,
      align: 'left',
    });
}

export function generateCursorMisconceptionsPdfBuffer() {
  const data = CURSOR_MISCONCEPTIONS_PDF;

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'LETTER',
      layout: 'landscape',
      margins: { top: 28, bottom: 24, left: 32, right: 32 },
      info: {
        Title: data.title,
        Author: data.author,
        Subject: 'Cursor myths vs reality one-pager',
        Keywords: 'Cursor, AI, Agent Mode, misconceptions',
      },
    });

    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const contentWidth = pageWidth - 64;

    doc.rect(0, 0, pageWidth, pageHeight).fill(colors.bg);

    let y = 28;

    doc
      .font('Helvetica-Bold')
      .fontSize(7)
      .fillColor(colors.secondary)
      .text('MYTH VS. REALITY', 32, y, { characterSpacing: 1.2 });

    y += 14;
    doc
      .font('Helvetica-Bold')
      .fontSize(22)
      .fillColor(colors.white)
      .text(data.title, 32, y, { width: contentWidth * 0.62, lineGap: 2 });

    doc
      .font('Helvetica')
      .fontSize(9)
      .fillColor(colors.muted)
      .text(data.subtitle, 32, y + 30, { width: contentWidth * 0.62 });

    doc
      .font('Helvetica-Bold')
      .fontSize(9)
      .fillColor(colors.white)
      .text(data.author, pageWidth - 32 - 180, y, { width: 180, align: 'right' });

    doc
      .font('Helvetica')
      .fontSize(7.5)
      .fillColor(colors.muted)
      .text('AI Adoption Engineer · Cursor', pageWidth - 32 - 180, y + 14, {
        width: 180,
        align: 'right',
      })
      .text(data.siteUrl, pageWidth - 32 - 180, y + 26, {
        width: 180,
        align: 'right',
      });

    y += 58;
    doc.moveTo(32, y).lineTo(pageWidth - 32, y).strokeColor(colors.line).stroke();
    y += 12;

    const cardWidth = (contentWidth - 10) / 2;
    const cardHeight = 42;

    drawRoundedRect(doc, 32, y, cardWidth, cardHeight, 6, colors.surface);
    doc
      .rect(32, y, 3, cardHeight)
      .fill(colors.primary);
    drawCellText(doc, 'THE GAP', 42, y + 8, cardWidth - 16, {
      font: 'Helvetica-Bold',
      size: 7,
      color: colors.secondary,
    });
    drawCellText(
      doc,
      'If your mental model of Cursor is a year old, it probably describes a different product. Tab completion was the entry point - not the ceiling.',
      42,
      y + 18,
      cardWidth - 16,
      { size: 7.5, color: colors.text }
    );

    drawRoundedRect(doc, 32 + cardWidth + 10, y, cardWidth, cardHeight, 6, colors.surface);
    doc
      .rect(32 + cardWidth + 10, y, 3, cardHeight)
      .fill(colors.primary);
    drawCellText(doc, 'ONE EXPERIMENT', 42 + cardWidth + 10, y + 8, cardWidth - 16, {
      font: 'Helvetica-Bold',
      size: 7,
      color: colors.secondary,
    });
    drawCellText(doc, data.experiment, 42 + cardWidth + 10, y + 18, cardWidth - 16, {
      size: 7.5,
      color: colors.text,
    });

    y += cardHeight + 10;

    drawRoundedRect(doc, 32, y, contentWidth, 18, 4, colors.surfaceAlt);
    const colX = {
      num: 38,
      myth: 68,
      reality: 250,
      remember: 500,
    };
    const colW = {
      myth: 170,
      reality: 240,
      remember: 230,
    };

    doc.font('Helvetica-Bold').fontSize(6.5).fillColor(colors.secondary);
    doc.text('#', colX.num, y + 5);
    doc.text('WHAT PEOPLE ASSUME', colX.myth, y + 5);
    doc.text('WHAT\'S ACTUALLY TRUE', colX.reality, y + 5);
    doc.text('ONE LINE TO REMEMBER', colX.remember, y + 5);

    y += 22;

    data.myths.forEach((item) => {
      const rowHeight = 34;
      drawRoundedRect(doc, 32, y, contentWidth, rowHeight, 4, colors.surface);

      doc
        .font('Helvetica-Bold')
        .fontSize(11)
        .fillColor(colors.primary)
        .text(item.number, colX.num, y + 8);

      drawCellText(doc, item.myth, colX.myth, y + 6, colW.myth, {
        font: 'Helvetica-Bold',
        size: 7.5,
        color: colors.white,
        lineGap: 0,
      });
      drawCellText(doc, item.reality, colX.reality, y + 6, colW.reality, {
        size: 7.5,
        color: colors.text,
        lineGap: 0,
      });
      drawCellText(doc, item.remember, colX.remember, y + 6, colW.remember, {
        font: 'Helvetica-Oblique',
        size: 7.2,
        color: colors.muted,
        lineGap: 0,
      });

      y += rowHeight + 3;
    });

    const footerY = pageHeight - 44;
    doc.moveTo(32, footerY).lineTo(pageWidth - 32, footerY).strokeColor(colors.line).stroke();

    doc
      .font('Helvetica-Bold')
      .fontSize(8)
      .fillColor(colors.white)
      .text('Full article, setup guides, and the 5-minute experiment', 32, footerY + 10);

    doc
      .font('Helvetica')
      .fontSize(7.5)
      .fillColor(colors.primary)
      .text(data.articleUrl, 32, footerY + 22, { link: data.articleUrl })
      .text(`${data.meetUrl}  ·  ${data.linkedInUrl}`, 32, footerY + 32, {
        link: data.meetUrl,
      });

    const badgeWidth = 220;
    const badgeX = pageWidth - 32 - badgeWidth;
    drawRoundedRect(doc, badgeX, footerY + 8, badgeWidth, 22, 4, colors.primary);
    doc
      .font('Helvetica-Bold')
      .fontSize(7.5)
      .fillColor(colors.white)
      .text('mlynn.org/blog/cursor-misconceptions', badgeX, footerY + 14, {
        width: badgeWidth,
        align: 'center',
        link: data.articleUrl,
      });

    doc.end();
  });
}
