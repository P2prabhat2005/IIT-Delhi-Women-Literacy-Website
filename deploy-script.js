const { execSync } = require('child_process');
const fs = require('fs');

try {
  let output = '';
  output += 'Running npm run build...\n';
  output += execSync('npm run build', { encoding: 'utf8' });
  
  output += '\nStaging files...\n';
  output += execSync('git add src/utils/apiClient.js server/middleware/security.js server/config/env.js server/services/authService.js', { encoding: 'utf8' });

  output += '\nCommitting files...\n';
  output += execSync('git commit -m "fix(auth): resolve vercel 404s, dynamic cors, url malformation, and admin seeding"', { encoding: 'utf8' });

  output += '\nPushing to origin main...\n';
  output += execSync('git push origin main', { encoding: 'utf8' });

  const hash = execSync('git rev-parse HEAD').toString().trim();
  output += '\nSUCCESS_HASH=' + hash;
  
  fs.writeFileSync('deploy-output.txt', output);
} catch (error) {
  fs.writeFileSync('deploy-output.txt', error.stdout + '\n' + error.stderr + '\n' + error.message);
}