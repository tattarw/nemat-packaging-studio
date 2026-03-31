const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const GEMINI_KEY = process.env.GEMINI_KEY || '';
const indexPath = path.join(__dirname, 'index.html');

// Read HTML once at startup
let htmlTemplate = fs.readFileSync(indexPath, 'utf8');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    // Inject the API key from environment variable at runtime
    const html = htmlTemplate.replace(
      "let GEMINI_KEY='';",
      "let GEMINI_KEY='" + GEMINI_KEY.replace(/'/g, "\\'") + "';"
    );
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } else {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Nemat Packaging Studio running on port ${PORT}`);
  console.log(`Gemini API key: ${GEMINI_KEY ? 'configured (' + GEMINI_KEY.slice(0, 8) + '...)' : 'NOT SET — add GEMINI_KEY env var'}`);
});
