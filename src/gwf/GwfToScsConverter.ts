import { spawn } from "child_process";

export const gwfToScs = (gwfXml: string, dataCallback: (scsText: string) => any, errorCallback: (errorText: string) => any) => {
  const pythonProcess = spawn(`python`, [__dirname+`/python_scripts/gwf_to_scs.py`], { stdio: [`pipe`, `pipe`, `pipe`] });
  pythonProcess.stdout.on(`data`, (data) => {
    dataCallback(data.toString());
  });

  pythonProcess.stderr.on(`data`, (data) => {
    errorCallback(data.toString());
  });

  pythonProcess.stdin.setDefaultEncoding(`utf-8`);
  pythonProcess.stdin.write(gwfXml);
  pythonProcess.stdin.end();
};

export const gwfToScsAsync = (gwfXml: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn(`python3`, [__dirname+`/python_scripts/gwf_to_scs.py`], { stdio: [`pipe`, `pipe`, `pipe`] });
    let scsText = ``;

    pythonProcess.stdout.on(`data`, (data) => {
      scsText += data.toString();
    });

    pythonProcess.stderr.on(`data`, (data) => {
      reject(data.toString());
    });

    pythonProcess.on(`close`, (code) => {
      if (code === 0) {
        resolve(scsText);
      } else {
        reject(`Python process exited with code ${code}`);
      }
    });

    pythonProcess.stdin.setDefaultEncoding(`utf-8`);
    pythonProcess.stdin.write(gwfXml);
    pythonProcess.stdin.end();
  });
};
