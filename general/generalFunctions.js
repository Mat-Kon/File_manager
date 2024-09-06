const printWelcomeMessages = (userName, dirPath) => {
  console.log(`Welcome to the File Manager, ${userName}!\n`);
  console.log(`You are currently in ${dirPath}\n`);
};

const printAvailableCommands = () => {
  console.log('Available commands:');
  console.log('help - print available commands');
  console.log('ls - List files and directories');
  console.log('cd <dir> or <path_to_directory> - Change current directory');
  console.log('pwd - Print current working directory');
  console.log('.exit - Exit the File Manager');
  console.log('up - Go upper from current directory');
  console.log('cat - <fileName.format> or <path_to_file> - Read file');
  console.log('add - <fileName.format> - Create empty file in current working directory');
  console.log('rn - <path_to_file> <new_fileName.format> - Rename file');
  console.log('cp - <path_to_file> <path_to_directory> - Copy file');
  console.log('mv - <path_to_file> <path_to_directory> - Move file');
  console.log('hash - <fileName.format> or <path_to_file> - Calculate hash for file and print');
  console.log('compress - <path_to_file> <path_to_directory> - Compress file');
  console.log('decompress - <path_to_file> <path_to_new_file> - Decompress file');
  console.log('os - Print operating system info:\n--EOL\n--cpus\n--homedir\n--username\n--architecture\n');
  console.log('Example <path_to_file> - childDir/../fileName.format');
  console.log('Example <path_to_directory> - childDir/../\n');
};

const exitFileManager = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
};

export {
  printWelcomeMessages,
  printAvailableCommands,
  exitFileManager
}