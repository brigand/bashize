import LocalEngine from './engines/LocalEngine';
import objToShOpts from './utils/objToShOpts';

export async function make$(engine){
  var connected = false;
  var $ = function(...args){
    return command(...args);
  };

  async function command(name, opts, positional, stdin){
    if (!connected) {
      await engine.connect();
      connected = true;
    }

    var args = objToShOpts(opts, positional);

    engine.run(name, args);
  }

  // (where) -> Promise<Array<string>>
  $.ls = async (where) => {
    var {stdout} = await command('ls', {}, [where]);
    return (await stdout).split('\n');
  };
}

var localEngine = new LocalEngine();
export default make$(localEngine);
