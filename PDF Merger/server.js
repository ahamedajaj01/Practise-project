const express = require('express');
const path = require('path');
const multer = require('multer');
const { mergePdfs } = require('./merge');

const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 8000;

// Serve static files from /public
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/template/index.html'));
});

app.post('/merge', upload.array('pdfFiles'), async (req, res) => {
  console.log(req.files);
  const filename =  await mergePdfs(
    path.join(__dirname, 'uploads', req.files[0].filename),
    path.join(__dirname, 'uploads', req.files[1].filename)
  );
  res.redirect(`http://localhost:8000/public/${filename}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
