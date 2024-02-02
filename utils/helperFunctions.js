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
  'rn'
];

export const isCurCommand = ( command ) => {
  if (command.split(' ').length >= 2) {
    return true;
  } else {
    console.log('Invalid input. Try again.');
  }
};

export const hasCommand = (command) => {
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
