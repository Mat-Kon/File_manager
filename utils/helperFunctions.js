const CUR_COMMANDS = [
  'ls',
  'cd',
  'pwd',
  '.exit',
  'up',
  'cat',
  'add',
  'help'
];

export const isCurCommand = ( command ) => command.split(' ').length >= 2;

export const hasCommand = (command) => {
  const curCommand = command.split(' ').length >= 2 ? command.split(' ')[0] : command;
  return CUR_COMMANDS.includes(curCommand);
};
