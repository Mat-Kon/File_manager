import { access, constants } from 'node:fs/promises';

const CUR_COMMANDS = [
  'ls',
  'cd',
  'pwd',
  '.exit',
  'up',
  'cat',
  'add',
  'help',
  'rn',
  'cp',
  'mv',
  'rm',
  'os'
];

export const isCurCommand = ( command ) => {
  if (command.split(' ').length >= 2) {
    return true;
  } else {
    console.log('Invalid input. Try again.');
  }
};

export const checkCommand = (command) => {
  const curCommand = command.split(' ').length >= 2 ? command.split(' ')[0] : command;
  return CUR_COMMANDS.includes(curCommand);
};

export const isExist = async (path) => {
  try {
    await access(path, constants.F_OK);
  } catch(error) {
    if (error.code === 'ENOENT') {
      console.log('Operation failed');
      console.log(`${path} is not found`);
    } else {
      console.log('Operation failed');
      console.log(error.message);
    }
  }
};

export const checkCurArgs = (args) => {
  const isCurLength = args.length === 2;

  if (args.length === 1) {
    console.log('Operation failed');
    console.log('Need two arguments');
    return false;
  }

  if (!isCurLength) {
    console.log('Operation failed');
    console.log('There should be no spaces in the file name or folder name!');
    return false;
  }

  return true;
}

