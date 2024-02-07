import { dirs } from '../utils/globalVariables.js';
import  path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { isExist } from '../utils/helperFunctions.js';

export const calculateHash = async (filePath) => {
  const pathToFile = path.resolve(dirs.curDir, filePath.join(' '));
  const hash = crypto.createHash('SHA256');

  isExist(pathToFile);

  const fileReadStream = fs.createReadStream(pathToFile);

  fileReadStream.on('data', (data) => {
    hash.update(data);
  });

  fileReadStream.on('end', () => {
      const hashResult = hash.digest('hex');
      console.log(`Hash: ${hashResult}`);
  });

  fileReadStream.on('error', () => {
    return;
  });
};