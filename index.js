import readline from 'readline';
import {
  dirs,
  printAvailableCommands,
  exitFileManager,
  changeDirectory,
  printWorkingDirectory,
  listFiles,
  goBackDir,
  readFile,
  createFile,
  renameFile,
  copyFile,
  moveFile
} from './fileManagerFunctions/managerFunctions.js';
import { isCurCommand, checkCommand } from './utils/helperFunctions.js';

const args = process.argv.slice(2);
const userNameArgs = args.find((arg) => arg.includes('--username')) ?? '';
const userName = userNameArgs.length ? userNameArgs.split('=')[1] : '';

if (!userName.length) {
  throw new Error('Enter your name');
}

console.log(`Welcome to the File Manager, ${userName}!\n`);
console.log(`You are currently in ${dirs.startDir}\n`);

printAvailableCommands();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  const command = input.trim();
  const isCommand = checkCommand(command);

  if (!isCommand) {
    console.log('Invalid input. Try again.');
  }

  if (command.startsWith('cd')) {
    if (isCurCommand(command)) {
      changeDirectory(command.split(' ').slice(1));
    }
  }

  if (command.startsWith('cat')) {
    if (isCurCommand(command)) {
      readFile(command.split(' ').slice(1));
    }
  }

  if (command.startsWith('add')) {
    if (isCurCommand(command)) {
      createFile(command.split(' ').slice(1));
    }
  }

  if (command.startsWith('rn')) {
    if (isCurCommand(command)) {
      renameFile(command.split(' ').slice(1));
    }
  }

  if (command.startsWith('cp')) {
    if (isCurCommand(command)) {
      copyFile(command.split(' ').slice(1));
    }
  }

  if (command.startsWith('mv')) {
    if (isCurCommand(command)) {
      moveFile(command.split(' ').slice(1));
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
    case 'help':
      return printAvailableCommands();
  }
});

rl.on('history', async () => {
  console.log(`\nYou are currently in ${dirs.curDir}\n`);
});

rl.on('close', () => {
  exitFileManager(userName);
});

process.on('SIGINT', () => {
  rl.close();
});