import readline from 'readline';
import {
  exitFileManager,
  printWorkingDirectory,
  changeDirectory,
  listFiles,
  goBackDir
} from './utils/helpersFunctions.js';

const args = process.argv.slice(2);
const userNameArgs = args.find((arg) => arg.includes('--username'));
const userName = userNameArgs.split('=')[1];

let curDir = process.cwd();

console.log(`Welcome to the File Manager, ${userName}!\n`);

console.log(`You are currently in ${curDir}\n`);

console.log('Available commands:');
console.log('ls - List files and directories');
console.log('cd <directory> - Change current directory');
console.log('pwd - Print current working directory');
console.log('.exit - Exit the File Manager\n');
console.log('up - Go upper from current directory\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const command = input.trim();

  switch (command) {
    case 'ls':
      return listFiles();
    case 'pwd':
      return printWorkingDirectory();
    case '.exit':
      return exitFileManager(userName);
    case 'up':
      return goBackDir();
    default:
      if (command.startsWith('cd')) {
        const isCurCommand = command.split(' ').length >= 2;
        if (isCurCommand) {
          changeDirectory(command.split(' ')[1]);
        } else {
          console.log('Invalid input. Try again.');
          break;
        }
      } else {
        console.log('Invalid input. Try again.');
        break;
      }
  }
});

rl.on('history', () => {
  printWorkingDirectory();
});

rl.on('close', () => {
  exitFileManager(userName);
});

process.on('SIGINT', () => {
  rl.close();
});