const { execSync } = require('child_process');
const fs = require('fs');

if (!fs.existsSync('test-results')) {
  fs.mkdirSync('test-results');
}

const env = {
  ...process.env,
  CI: 'true',
  JEST_JUNIT_OUTPUT_DIR: 'test-results',
  JEST_JUNIT_OUTPUT_NAME: 'junit.xml',
};

// Use npx to resolve react-scripts from local node_modules
const cmd = process.platform === 'win32'
  ? '.\\node_modules\\.bin\\react-scripts test --watchAll=false --ci --coverage'
  : './node_modules/.bin/react-scripts test --watchAll=false --ci --coverage';

try {
  execSync(cmd, { stdio: 'inherit', env });
} catch (e) {
  process.exit(1);
}