// Shared formatting library for the "Ultimate Software Engineer Roadmap" book series.
// Provides a premium, colorful, book-style look: cover page, clickable TOC,
// colored callout boxes, syntax-style code blocks, comparison tables, cheat sheets.
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  Header, Footer, AlignmentType, LevelFormat, ExternalHyperlink, InternalHyperlink,
  Bookmark, TabStopType, TabStopPosition, TableOfContents, HeadingLevel,
  BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak,
} = require("docx");
const fs = require("fs");

// ---- Palette -------------------------------------------------------------
const C = {
  navy: "1F3A5F",      // primary headings
  blue: "2E75B6",      // accents / rules
  teal: "0E7C7B",
  green: "1E8449",
  amber: "B7791F",
  red: "C0392B",
  purple: "6C3483",
  grayText: "44474B",
  codeBg: "F4F6F8",
  codeText: "1A2733",
  white: "FFFFFF",
  light: "EAF1F8",
};

// Callout themes: label, fill, bar color, emoji icon
const CALLOUTS = {
  definition: { label: "DEFINITION", fill: "EAF1F8", bar: C.blue, icon: "\u{1F4D8}" },
  why:        { label: "WHY IT EXISTS", fill: "F0ECF7", bar: C.purple, icon: "\u{1F4A1}" },
  analogy:    { label: "REAL-WORLD ANALOGY", fill: "FFF6E5", bar: C.amber, icon: "\u{1F30D}" },
  tip:        { label: "SENIOR ENGINEER TIP", fill: "E9F7EF", bar: C.green, icon: "\u{1F9E0}" },
  best:       { label: "BEST PRACTICE", fill: "E9F7EF", bar: C.green, icon: "✅" },
  mistake:    { label: "COMMON MISTAKE", fill: "FDEDEC", bar: C.red, icon: "⚠️" },
  interview:  { label: "INTERVIEW NOTE", fill: "FEF9E7", bar: C.amber, icon: "\u{1F3AF}" },
  note:       { label: "NOTE", fill: "F4F6F8", bar: C.grayText, icon: "\u{1F4DD}" },
  perf:       { label: "PERFORMANCE", fill: "EAF6F6", bar: C.teal, icon: "⚡" },
};

const PAGE = { width: 12240, height: 15840 };
const CONTENT_W = 9360; // 12240 - 2*1440

// ---- Inline run helpers --------------------------------------------------
function runs(parts) {
  // parts: string | {t, b, i, color, code, size}
  if (typeof parts === "string") parts = [parts];
  return parts.map((p) => {
    if (typeof p === "string") return new TextRun({ text: p });
    return new TextRun({
      text: p.t,
      bold: p.b || false,
      italics: p.i || false,
      color: p.color,
      size: p.size,
      font: p.code ? "Consolas" : undefined,
      shading: p.code ? { fill: "ECEFF1", type: ShadingType.CLEAR } : undefined,
    });
  });
}

function P(parts, opts = {}) {
  return new Paragraph({
    children: runs(parts),
    spacing: { after: opts.after ?? 120, before: opts.before ?? 0, line: 276 },
    alignment: opts.align,
    ...opts.extra,
  });
}

// ---- Headings ------------------------------------------------------------
function H1(text, bookmarkId) {
  const children = bookmarkId
    ? [new Bookmark({ id: bookmarkId, children: runs([{ t: text, b: true }]) })]
    : runs([{ t: text, b: true }]);
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children, pageBreakBefore: true });
}
function H2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: runs([{ t: text, b: true }]) });
}
function H3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, children: runs([{ t: text, b: true }]) });
}

// ---- Lists ---------------------------------------------------------------
function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    children: runs(text),
    spacing: { after: 60, line: 264 },
  });
}
function num(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "numbers", level },
    children: runs(text),
    spacing: { after: 60, line: 264 },
  });
}

// ---- Callout box (single-cell shaded table with left color bar) ----------
function callout(type, lines) {
  const theme = CALLOUTS[type] || CALLOUTS.note;
  const body = [];
  body.push(new Paragraph({
    spacing: { after: 60 },
    children: runs([{ t: `${theme.icon}  ${theme.label}`, b: true, color: theme.bar }]),
  }));
  (Array.isArray(lines) ? lines : [lines]).forEach((ln) => {
    body.push(new Paragraph({ spacing: { after: 40, line: 264 }, children: runs(ln) }));
  });
  const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { fill: theme.fill, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 120, left: 200, right: 160 },
        borders: {
          top: noBorder, bottom: noBorder, right: noBorder,
          left: { style: BorderStyle.SINGLE, size: 24, color: theme.bar },
        },
        children: body,
      })],
    })],
  });
}

// ---- Code block ----------------------------------------------------------
function code(lines, lang = "") {
  const arr = Array.isArray(lines) ? lines : lines.split("\n");
  const body = [];
  if (lang) body.push(new Paragraph({
    spacing: { after: 40 },
    children: runs([{ t: lang.toUpperCase(), b: true, color: C.blue, size: 16 }]),
  }));
  arr.forEach((ln) => {
    body.push(new Paragraph({
      spacing: { after: 0, line: 240 },
      children: [new TextRun({ text: ln === "" ? " " : ln, font: "Consolas", size: 18, color: C.codeText })],
    }));
  });
  const b = { style: BorderStyle.SINGLE, size: 4, color: "D5DBE1" };
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: CONTENT_W, type: WidthType.DXA },
        shading: { fill: C.codeBg, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 160, right: 120 },
        borders: { top: b, bottom: b, left: b, right: b },
        children: body,
      })],
    })],
  });
}

// ---- Generic table (header row + body rows) ------------------------------
function table(headers, rows, widths) {
  const n = headers.length;
  const colW = widths || Array(n).fill(Math.floor(CONTENT_W / n));
  // adjust last col to sum exactly
  const sum = colW.reduce((a, b) => a + b, 0);
  colW[colW.length - 1] += CONTENT_W - sum;
  const border = { style: BorderStyle.SINGLE, size: 2, color: "C3CCD5" };
  const borders = { top: border, bottom: border, left: border, right: border };
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      width: { size: colW[i], type: WidthType.DXA },
      shading: { fill: C.navy, type: ShadingType.CLEAR },
      margins: { top: 70, bottom: 70, left: 110, right: 110 },
      borders,
      verticalAlign: VerticalAlign.CENTER,
      children: [new Paragraph({ children: runs([{ t: h, b: true, color: C.white }]) })],
    })),
  });
  const bodyRows = rows.map((r, ri) => new TableRow({
    children: r.map((cell, ci) => new TableCell({
      width: { size: colW[ci], type: WidthType.DXA },
      shading: { fill: ri % 2 ? "F2F5F8" : "FFFFFF", type: ShadingType.CLEAR },
      margins: { top: 60, bottom: 60, left: 110, right: 110 },
      borders,
      children: [new Paragraph({ children: runs(cell), spacing: { line: 252 } })],
    })),
  }));
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: colW,
    rows: [headerRow, ...bodyRows],
  });
}

// ---- Section divider rule ------------------------------------------------
function rule(color = C.blue) {
  return new Paragraph({
    spacing: { before: 60, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color, space: 1 } },
    children: [new TextRun({ text: "" })],
  });
}

// A small colored "chip" heading used to mark the per-topic closers
function chip(text, color = C.teal) {
  return new Paragraph({
    spacing: { before: 160, after: 80 },
    shading: { fill: color, type: ShadingType.CLEAR },
    children: [new TextRun({ text: `  ${text}  `, bold: true, color: C.white, size: 22 })],
  });
}

// ---- Document styles + numbering -----------------------------------------
function makeDoc(sections) {
  return new Document({
    creator: "Claude — Ultimate SE Roadmap",
    title: "Ultimate Software Engineer Roadmap",
    styles: {
      default: { document: { run: { font: "Calibri", size: 22, color: C.codeText } } },
      paragraphStyles: [
        { id: "Title", name: "Title", basedOn: "Normal", next: "Normal",
          run: { size: 64, bold: true, color: C.navy, font: "Calibri" },
          paragraph: { spacing: { after: 120 }, alignment: AlignmentType.CENTER } },
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 36, bold: true, color: C.navy, font: "Calibri" },
          paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 0,
            border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: C.blue, space: 6 } } } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 28, bold: true, color: C.blue, font: "Calibri" },
          paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
        { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 24, bold: true, color: C.teal, font: "Calibri" },
          paragraph: { spacing: { before: 140, after: 80 }, outlineLevel: 2 } },
      ],
    },
    numbering: {
      config: [
        { reference: "bullets", levels: [
          { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 540, hanging: 280 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1040, hanging: 280 } } } },
        ] },
        { reference: "numbers", levels: [
          { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 540, hanging: 300 } } } },
        ] },
      ],
    },
    sections,
  });
}

function pageProps(titleForHeader) {
  return {
    page: { size: PAGE, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
    headers: { default: new Header({ children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "C3CCD5", space: 4 } },
      children: runs([{ t: titleForHeader, i: true, color: C.grayText, size: 16 }]),
    })] }) },
    footers: { default: new Footer({ children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { top: { style: BorderStyle.SINGLE, size: 6, color: "C3CCD5", space: 4 } },
      children: [
        new TextRun({ text: "Ultimate Software Engineer Roadmap   •   Page ", color: C.grayText, size: 16 }),
        new TextRun({ children: [PageNumber.CURRENT], color: C.grayText, size: 16 }),
      ],
    })] }) },
  };
}

function save(doc, path) {
  return Packer.toBuffer(doc).then((buf) => fs.writeFileSync(path, buf));
}

module.exports = {
  C, CALLOUTS, PAGE, CONTENT_W,
  runs, P, H1, H2, H3, bullet, num, callout, code, table, rule, chip,
  makeDoc, pageProps, save,
  Paragraph, TextRun, PageBreak, AlignmentType, TableOfContents, HeadingLevel,
  InternalHyperlink, Bookmark, ShadingType, BorderStyle,
};
