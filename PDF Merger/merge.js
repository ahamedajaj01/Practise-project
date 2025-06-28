const PDFMerger = require('pdf-merger-js').default;
const path = require('path');

async function mergePdfs(pdf1, pdf2) {
  const merger = new PDFMerger();

  await merger.add(pdf1);
  await merger.add(pdf2);

  // Save into the /public directory
  const filename = Date.now().toString();
  await merger.save(path.join(__dirname, 'public', `${filename}.pdf`));
  return filename;
}

module.exports = { mergePdfs };
