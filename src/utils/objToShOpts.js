export default function objToShOpts(opts, positional){
  var args = [];

  Object.keys(opts).forEach((key) => {
    var value = opts[key];
    if (key.length === 1) {
      opts.push(`-${key}`);
    }
    else {
      opts.push(`--${key}`);
    }

    if (typeof value === 'boolean') {}
    else if (typeof value === 'string' || typeof value === 'number') {
      opts.push(value);
    }
    else if (typeof value === 'array') {
      opts.push(...value);
    }
  });

  var needsSeperator = positional.some((value) => value[0] === '-');

  if (needsSeperator) {
    args.push('--');
  }

  args.push(...positional);

  return args;
}

function objectToEqualsStrings(obj){
  return Object.keys(obj).map((key) => {
    return key + '=' + obj[key];
  });
}
