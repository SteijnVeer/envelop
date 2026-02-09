import { execSync } from 'child_process';
import { copyFileSync, cpSync, rmSync } from 'fs';

rmSync('dist', { recursive: true, force: true });

cpSync('public', 'dist', { recursive: true });
copyFileSync(`pages/404.html`, `dist/404.html`);

for (const [page, path] of Object.entries({
  landing: '',
  open: 'open/',
  write: 'schrijf/',
})) {
  execSync(`cd pages/${page} && tsc -b && vite build`, { stdio: 'inherit' });
  cpSync(`pages/${page}/dist/assets`, `dist/${path}assets`, { recursive: true });
  copyFileSync(`pages/${page}/dist/index.html`, `dist/${path}index.html`);
  rmSync(`pages/${page}/dist`, { recursive: true, force: true });
}

console.log('\nBuild completed successfully.\n');
