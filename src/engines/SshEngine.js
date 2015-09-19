import {Client} from 'ssh2';
import Promise from 'bluebird';
import streamToPromise from 'stream-to-promise';
import {quote} from 'shell-quote';

export default class LocalEngine {
  async connect({host, port, username, privateKey}){
    var client = this.client = new Client();
    var promise = new Promise((resolve, reject) => {
      client.on('ready', () => {
        resolve();
      });
    });
    client.connect({
      host, port, username, privateKey,
    });

    return await promise;
  }

  close(){
    this.client.close();
  }

  async run(command, args=[], stdinContent=""){
    var promise = new Promise((resolve, reject) => {
      this.client.shell((err, stream) => {
        if (err) {
          return reject(err);
        }

        var res = {
          stdout: streamToPromise(stream),
          stderr: streamToPromise(stream.stderr),
        };

        stream.write(quote([command].concat(args) + '\n');
        if (stdinContent) {
          stream.write(stdinContent);
        }
        stream.end();

        resolve(res);
      });
    });

    return await promise;
  }
}
