import os from 'os';
import path from 'path';

export const ROOT_DIR = path.resolve(os.homedir(), '/');
export const dirs = {
  startDir: os.homedir(),
  curDir: os.homedir()
}