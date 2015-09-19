# status: non-working

bashize is a automation library that works the same locally and remotely.

It can be used for any kind of shell automation, but was created with build
tools and deployment in mind. For best results use with babel and async/await.

```js
import $, {makeSshClient} from 'bashize';
async function main(){
  var privateKey = await $.read('~/.ssh/id_rsa');
  var ssh = await makeSshClient({
    hostname: '1.2.3.4',
    username: 'ubuntu',
    privateKey: privateKey,
  });

  await ssh.mkdirp('/var/app');
  await ssh.cd('/var/app');
  await ssh.upload('index.html')
}
```
