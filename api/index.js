const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf8');

      const GEMINI_KEY = process.env.GEMINI_KEY || '';
        if (GEMINI_KEY) {
            html = html.replace(
                  "let GEMINI_KEY='';",
                        "let GEMINI_KEY='" + GEMINI_KEY.replace(/'/g, "\\'") + "';"
                            );
                              }

                                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                                  res.setHeader('Cache-Control', 'no-store');
                                    res.status(200).send(html);
                                    };
