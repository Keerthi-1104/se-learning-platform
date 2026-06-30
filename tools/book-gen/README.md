# Book generators

Each `volumeN.js` builds the corresponding `.docx` book in `docs/books/`.

```bash
cd tools/book-gen
npm install docx
node volume1.js
```

`lib.js` is the shared formatting library (cover, TOC, callouts, code blocks, tables).
