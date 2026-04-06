const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('test-results')) {
  fs.mkdirSync('test-results', { recursive: true });
}

const env = {
  ...process.env,
  CI: 'true',
  JEST_JUNIT_OUTPUT_DIR: path.resolve('test-results'),
  JEST_JUNIT_OUTPUT_NAME: 'junit.xml',
  JEST_JUNIT_CLASSNAME: '{classname}',
  JEST_JUNIT_TITLE: '{title}',
};

const reactScripts = process.platform === 'win32'
  ? '.\\node_modules\\.bin\\react-scripts'
  : './node_modules/.bin/react-scripts';

// Pass jest-junit as a custom reporter via REACT_APP_ trick won't work,
// so we use --testResultsProcessor instead — CRA allows this via env
env.REACT_APP_ENV = 'ci';

const cmd = `${reactScripts} test --watchAll=false --ci --coverage --testResultsProcessor=jest-junit`;

try {
  execSync(cmd, { stdio: 'inherit', env });
} catch (e) {
  process.exit(1);
}