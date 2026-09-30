const fs = require('fs');
let content = fs.readFileSync('src/auth.ts', 'utf8');

content = content.replace(/pages: \{\s*signIn: '\/login',\s*\},/, '');
fs.writeFileSync('src/auth.ts', content);
