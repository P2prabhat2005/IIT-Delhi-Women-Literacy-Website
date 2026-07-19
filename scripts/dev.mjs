import { spawn } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function runNpm(args) {
  if (process.platform !== 'win32') {
    return spawn(npmCommand, args, { stdio: 'inherit' });
  }

  return spawn(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', [npmCommand, ...args].join(' ')], {
    stdio: 'inherit',
  });
}

const processes = [
  runNpm(['--prefix', 'server', 'run', 'dev']),
  runNpm(['run', 'dev:frontend']),
];

function stopAll(signal) {
  processes.forEach((process) => {
    if (!process.killed) {
      process.kill(signal);
    }
  });
}

processes.forEach((child) => {
  child.on('exit', (code, signal) => {
    if (code && code !== 0) {
      stopAll(signal || 'SIGTERM');
      process.exit(code);
    }
  });
});

process.on('SIGINT', () => {
  stopAll('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopAll('SIGTERM');
  process.exit(0);
});
