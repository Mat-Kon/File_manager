import readline from 'readline';
import {
  dirs,
  exitFileManager,
  changeDirectory,
  printWorkingDirectory,
  listFiles,
  goBackDir,
  readFile
} from './fileManagerFunctions/managerFunctions.js';

const args = process.argv.slice(2);
const userNameArgs = args.find((arg) => arg.includes('--username')) ?? '';
const userName = userNameArgs.length ? userNameArgs.split('=')[1] : '';

if (!userName.length) {
  throw new Error('Enter your name');
}

console.log(`Welcome to the File Manager, ${userName}!\n`);

console.log(`You are currently in ${dirs.startDir}\n`);

console.log('Available commands:');
console.log('ls - List files and directories');
console.log('cd <dir> or <dir/childDir/../..> - Change current directory');
console.log('pwd - Print current working directory');
console.log('.exit - Exit the File Manager');
console.log('up - Go upper from current directory');
console.log('cat - <fileName.format> or <dir/childDir/fileName.format>Go - read file\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const command = input.trim();

  if (command.startsWith('cd')) {
    const isCurCommand = command.split(' ').length >= 2;
    if (isCurCommand) {
      changeDirectory(command.split(' ').slice(1));
    } else {
      console.log('Invalid input. Try again.');
      return;
    }
  }

  if (command.startsWith('cat')) {
    const isCurCommand = command.split(' ').length === 2;
    if (isCurCommand) {
      readFile(command.split(' ')[1]);
    } else {
      console.log('Invalid input. Try again.');
      return;
    }
  }

  switch (command) {
    case 'ls':
      return listFiles();
    case 'pwd':
      return printWorkingDirectory();
    case '.exit':
      return exitFileManager(userName);
    case 'up':
      return goBackDir();
    // default:
  }
});

// rl.on('history', async () => {
//   console.log(`\nYou are currently in ${dirs.curDir}\n`);
// });

rl.on('close', () => {
  exitFileManager(userName);
});

process.on('SIGINT', () => {
  rl.close();
});