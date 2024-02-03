import {
  readdir,
  stat,
  access,
  constants,
  writeFile,
  rename,
  unlink
} from 'node:fs/promises';
import  { pipeline } from 'node:stream/promises';
import fs from 'fs';
import  path from 'path';
import { isExist, checkCurArgs } from '../utils/helperFunctions.js';
import { dirs } from '../utils/globalVariables.js';


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

const readFile = async (pathToFile) => {
  const resolvePath = path.resolve(dirs.curDir, pathToFile.join(' '));
  await isExist(resolvePath);

  const readStream = fs.createReadStream(resolvePath, { encoding: 'utf8' });

  readStream.on('data', chunk => {
      console.log(chunk);
  });

  readStream.on('error', err => {
      console.error('Operation failed');
  });
  return;
};

const createFile = async (fileName) => {
  const pathToFile = path.resolve(dirs.curDir, fileName.join(' '));

  try {
    await access(pathToFile, constants.F_OK);
    throw new Error('Operation failed');
  } catch(error) {
    if (error.code === 'ENOENT') {
      try {
        await writeFile(pathToFile, '');
        console.log(`File "${fileName}" is create`);
      } catch (writeError) {
        console.error(writeError.message);
      }
    } else {
      console.log(error.message);
    }
  }
};

const renameFile = async (args) => {
  checkCurArgs(args);

  const pathToFile = path.resolve(dirs.curDir, args[0]);
  const __dirname = path.dirname(pathToFile);
  const pathToNewFile = path.resolve(__dirname, args[1]);

  try {
    await isExist(pathToFile);
    await access(pathToNewFile, constants.F_OK);
		throw new Error('Operation failed');
  } catch(error) {
    if (error.code === 'ENOENT') {
      try {
        await rename(pathToFile, pathToNewFile);
        console.log(`File is rename to ${args[1]}`)
      } catch (writeError) {
        console.error(writeError.message);
      }
    } else {
      console.log(error.message);
    }
  }
};

const copyFile = async (args) => {
  checkCurArgs(args);

  const pathToFile = path.resolve(dirs.curDir, args[0]);
  const fileName = path.basename(pathToFile);
  const pathToNewFile = path.resolve(dirs.curDir, args[1], fileName);

  try {
    await isExist(pathToFile);
    await access(pathToNewFile, constants.F_OK);
    throw new Error('Operation failed');
  } catch(error) {
    if (error.code === 'ENOENT') {
      try {
        await pipeline(
          fs.createReadStream(pathToFile),
          fs.createWriteStream(pathToNewFile)
        );
        console.log(`File ${fileName} is copied to ${path.resolve(dirs.curDir, args[1])}`);
      } catch (copyError) {
        console.error(copyError.message);
      }
    } else {
      console.log(`File ${fileName} is exist in ${path.resolve(dirs.curDir, args[1])}`);
      throw new Error(error.message);
    }
  }
};

const moveFile = async (args) => {
  checkCurArgs(args);

  const pathToFile = path.resolve(dirs.curDir, args[0]);
  const fileName = path.basename(pathToFile);

  try {
    await copyFile(args);
    await unlink(pathToFile);
    console.log(`File ${fileName} is move to ${path.resolve(dirs.curDir, args[1])}`)
  } catch {
    console.error('Operation failed');
  }
};

const removeFile = async (pathToFile) => {
  const resolvePath = path.resolve(dirs.curDir, pathToFile.join(' '));
  const fileName = path.basename(resolvePath);

  try {
    await isExist(resolvePath);
    await unlink(resolvePath);
    console.log(`File ${fileName} is remove`);
  } catch {
    console.error('Operation failed');
  }
};

export {
  listFiles,
  readFile,
  createFile,
  renameFile,
  copyFile,
  moveFile,
  removeFile
}