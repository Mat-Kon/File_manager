import os from 'os';


const printEOL = () => {
  console.log(`End-Of-Line (EOL): ${os.EOL}`);
};

const printCPUS = () => {
  const cpus = os.cpus();

  console.log(`Total CPUs: ${cpus.length}`);
  const cpusTable =  cpus.map((cpu, index) => {
    const cpuInfo = {
      CPU: index + 1,
      Model: cpu.model.trim(),
      GHz: cpu.speed
    };
    return cpuInfo;
  });
  console.table(cpusTable);
};

const printHomeDir = () => {
  console.log(`Home Directory: ${os.homedir()}`);
};

const printUserName = () => {
  console.log(`Current User Name: ${os.userInfo().username}`);
};

const printArch = () => {
  console.log(`CPU Architecture: ${process.arch}`);
};

const osArgs = {
  eol: printEOL,
  cpus: printCPUS,
  homedir: printHomeDir,
  username: printUserName,
  architecture: printArch,
};


const performOSOperation = (arg) => {
  const isArg = arg.length === 1 && arg.join('').includes('--');

  if (isArg) {
    const argKey = arg.join('').replace('--', '').toLowerCase();

    if (isCurArg(argKey)) {
      return osArgs[argKey]();
    } else {
      console.log('Operation failed');
      console.log(`Argument ${arg} is invalid`);
      console.log(`Arguments list:\n--EOL\n--cpus\n--homedir\n--username\n--architecture`);
    }

  } else {
    console.log('Operation failed');
    console.log(`Argument ${arg} is not correct\nExample argument: --argumentName`);
  }
};

const isCurArg = (arg) => {
  for (let key in osArgs) {
    if (key === arg) {
      return true;
    }
  }
  return false;
};

export { performOSOperation }