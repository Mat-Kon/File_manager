import { dirs, ROOT_DIR } from '../utils/globalVariables.js';
import { stat } from 'node:fs/promises';
import  path from 'path';
import { isExist } from '../utils/helperFunctions.js';

const changeDirectory = async (newDir) => {
  const targetDir = path.resolve(dirs.curDir, newDir.join(' '));
  try {
    await isExist(targetDir);
    const isDir = (await stat(targetDir)).isDirectory();
    if (isDir) {
      dirs.curDir = targetDir;
      console.log(`Changed directory to ${dirs.curDir}\n`);
    }
  } catch {
    console.log('Operation failed');
  }
};

const goBackDir = () => {
  const parentDir = path.resolve(dirs.curDir, '..');

  if (dirs.curDir === ROOT_DIR) {
    console.error('Operation failed');
    return;
  }

  if (parentDir) {
    dirs.curDir = parentDir;
    return;
  }
};

const printWorkingDirectory = () => {
  console.log(`\nYou are currently in ${dirs.curDir}\n`);
};

export { changeDirectory, goBackDir, printWorkingDirectory }