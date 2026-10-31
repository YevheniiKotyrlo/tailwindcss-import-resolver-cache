// A long-lived process, such as a dev server, compiles a stylesheet whose @import names a file that does not exist yet,
// then compiles it again right after the file is written, and once more 4.5 seconds later.
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { compile } from '@tailwindcss/node';

const base = mkdtempSync(path.join(tmpdir(), 'tailwind-import-'));
mkdirSync(base, { recursive: true });
const stylesheet = '@import "./accent.css";\n';

const attempt = async (label) => {
  try {
    await compile(stylesheet, { base, onDependency: () => {} });
    console.log(`${label}: resolved`);
  } catch (error) {
    console.log(`${label}: ${error.message.split('\n')[0]}`);
  }
};

await attempt('before accent.css exists');
writeFileSync(path.join(base, 'accent.css'), '.accent { color: red; }\n');
await attempt('right after writing accent.css');
await new Promise((resolve) => setTimeout(resolve, 4500));
await attempt('4.5 s after writing accent.css');
