import { readdir, stat, access, constants } from 'node:fs/promises';
import  path from 'path';

// const rootDir = 

let curDir = process.cwd();

const listFiles = async () => {
  try {
    const files = await readdir(curDir);
    const tableFiles = await Promise.all(files.map(async (file) => {
      const pathToFile = path.join(curDir, file);
      const statFile = await stat(pathToFile);
      return {
        name: file,
        type: statFile.isDirectory() ? 'directory' : 'file',
      }
    }));

    if (!tableFiles.length) {
      console.log('The directory is empty');
      return;
    }

    const sortTable = tableFiles.sort((a) => {
      if (a.type === 'directory') {
        return -1;
      } else {
        return 1;
      }
    });

    console.table(sortTable);
  } catch (error) {
    console.error('Operation failed');
  }
};

const changeDirectory = async (newDir) => {
  const targetDir = path.resolve(curDir, newDir);

  try {
    await access(targetDir, constants.F_OK);
    const isDir = (await stat(targetDir)).isDirectory();
    if (isDir) {
      curDir = targetDir;
      console.log(`Changed directory to ${curDir}\n`);
    }

  } catch(error) {
    console.log('Operation failed')
  }
};

const goBackDir = () => {
  const parentDir = path.resolve(curDir, '..');

  if (parentDir !== curDir && !parentDir.startsWith(path.resolve('/'))) {
    curDir = parentDir;
    console.log(`You are currently in ${curDir}`);
    return
  }
};

const printWorkingDirectory = () => {
  console.log(`\nYou are currently in ${curDir}\n`);
};

const exitFileManager = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
};

export {
  exitFileManager,
  printWorkingDirectory,
  changeDirectory,
  listFiles,
  goBackDir
}