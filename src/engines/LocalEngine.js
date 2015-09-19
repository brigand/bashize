import {spawn} from 'child_process';
import Promise from 'bluebird';
import streamToPromise from 'stream-to-promise';

export default class LocalEngine {
  async connect(){}
  close(){}

  async run(command, args, stdinContent){
    var cp = spawn(command, args, {
      stdio: 'pipe'
    });
    if (stdinContent) {
      cp.stdin.write(stdinContent);
    }
    cp.stdin.end();

    var res = {
      stdout: streamToPromise(cp.stdout),
      stderr: streamToPromise(cp.stderr),
    };

    res.exitCode = new Promise((resolve) => {
      cp.on('exit', (code) => {
        resolve(code);
      });
    });

    return res;
  }
}
