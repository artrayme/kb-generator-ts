import { spawn } from "child_process";

export const gwfToScs = (gwfXml: string, dataCallback: (scsText: string) => any, errorCallback: (errorText: string) => any) => {
  const pythonProcess = spawn(`python`, [__dirname+`/python_scripts/gwf_to_scs.py`], { stdio: [`pipe`, `pipe`, `pipe`] });
  pythonProcess.stdout.on(`data`, (data) => {
    dataCallback(data.toString());
  });

  pythonProcess.stderr.on(`data`, (data) => {
    errorCallback(data.toString());
  });

  pythonProcess.stdin.setDefaultEncoding("utf-8");
  pythonProcess.stdin.write(gwfXml);
  pythonProcess.stdin.end();
  pythonProcess.on(`close`, (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

