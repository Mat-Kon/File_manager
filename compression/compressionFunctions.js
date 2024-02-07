import { checkCurArgs, isExist } from "../utils/helperFunctions.js";
import { dirs } from '../utils/globalVariables.js';
import path from 'path';
import fs from 'fs';
import { access, constants } from 'node:fs/promises';
import zlib from 'zlib';

const compressionFile = async (args) => {
  const isCurArgs = checkCurArgs(args);

  if (isCurArgs) {
    const originFile = path.resolve(dirs.curDir, args[0]);
    const fileName = path.basename(originFile);
    const fileFormat = path.extname(fileName);
    const compressFileName = fileName.replace(fileFormat, '.qz');
    const compressFile = path.resolve(dirs.curDir, args[1], compressFileName);

    await isExist(originFile);

    const readStream = fs.createReadStream(originFile);
    const gzip = zlib.createGzip();
    const writeCompressFile = fs.createWriteStream(compressFile);

    try {
      await access(compressFile, constants.F_OK);
      throw new Error('Operation failed');
    } catch(error) {
      if (error.code === 'ENOENT') {
        try {
          readStream.pipe(gzip).on('data', (chunk) => {
            writeCompressFile.write(chunk);
          });

          readStream.on('end', () => console.log(`File ${fileName} compressed to ${compressFile}`));

          readStream.on('error', () => {
            return;
          });
        } catch(error) {
          console.log(error.message);
        }
      } else {
        console.log(error.message);
      }
    }
  }
};

const decompressionFile = async (args) => {
  const isCurArgs = checkCurArgs(args);

  if (isCurArgs) {
    const compressFile = path.resolve(dirs.curDir, args[0]);
    const decompressFile = path.resolve(dirs.curDir, args[1]);

    await isExist(compressFile);

    const readStream = fs.createReadStream(compressFile);
    const gunzip = zlib.createGunzip();
    const writeCompressFile = fs.createWriteStream(decompressFile);

    try {
      await access(decompressFile, constants.F_OK);
      throw new Error('Operation failed');
    } catch(error) {
      if (error.code === 'ENOENT') {
        try {
          readStream.pipe(gunzip).on('data', (chunk) => {
            writeCompressFile.write(chunk);
          });

          readStream.on('end', () => console.log(`File decompressed!`));

          readStream.on('error', () => {
            return;
          });
        } catch(error) {
          console.log(error.message);
        }
      } else {
        console.log(error.message);
      }
    }
  }
};

export { compressionFile, decompressionFile }