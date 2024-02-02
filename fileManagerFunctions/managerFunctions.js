import { readdir, stat, access, constants } from 'node:fs/promises';
import fs from 'fs';
import  path from 'path';
import os from 'os';

export const ROOT_DIR = os.homedir();
export const dirs = {
  startDir: ROOT_DIR,
  curDir: ROOT_DIR
}

const listFiles = async () => {
  const absolutePath = path.resolve(dirs.curDir);
  try {
    const files = await readdir(absolutePath);
    const tableFiles = await Promise.all(files.map(async (file) => {
      const pathToFile = path.resolve(absolutePath, file);
      try {
        await access(pathToFile, constants.F_OK);
        const statFile = await stat(pathToFile);

        return {
          name: file,
          type: statFile.isDirectory() ? 'directory' : 'file',
        }
      } catch {
        return {
          name: file,
          type: 'no such',
        }
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
  const targetDir = path.resolve(dirs.curDir, newDir.join(' '));

  try {
    await access(targetDir, constants.F_OK);
    const isDir = (await stat(targetDir)).isDirectory();
    if (isDir) {
      dirs.curDir = targetDir;
      console.log(`Changed directory to ${dirs.curDir}\n`);
    }

  } catch(error) {
    console.log('Operation failed')
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

const exitFileManager = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
};

const printWorkingDirectory = () => {
  console.log(`\nYou are currently in ${dirs.curDir}\n`);
};

const readFile = async (pathToFile) => {
  const resolvePath = path.resolve(dirs.curDir, pathToFile);
  const readStream = fs.createReadStream(resolvePath, { encoding: 'utf8' });

  readStream.on('data', chunk => {
      console.log(chunk);
  });

  readStream.on('error', err => {
      console.error(`An error occurred: ${err.message}`);
  });
}

export {
  exitFileManager,
  changeDirectory,
  listFiles,
  goBackDir,
  readFile,
  printWorkingDirectory
}