const parseConsoleText = (text, sandbox, env) => {
  text = text.trim();
  const command = textToArgs(text);

  const commandName = command[0],
    args = command.slice(1);

  if (!sandbox.hasOwnProperty(commandName)) {
    env.printLog({
      type: 'error',
      text: `Can't find command ${commandName}`
    });
  } else {
    const result = sandbox[commandName].fn(env, ...args);
    env.ctx.update('props.action', result);
  }
};

// text to command. [cmdName, ...args]
const textToArgs = (text) => {
  const command = [];

  let pre = '';
  let needClose = false,
    needEscape = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (needEscape) {
      pre += ch;
      needEscape = false;
    } else if (ch === '\\') {
      needEscape = true;
    } else if (ch === '"') {
      if (needClose) { // find the close one
        if (pre.length) {
          command.push(pre);
        }
        pre = '';
      }
      needClose = !needClose;
    } else if (!needClose && /\s/.test(ch)) { // find a seperator
      if (pre.length) {
        command.push(pre);
      }
      pre = '';
    } else {
      pre += ch;
    }
  }

  if (pre.length) {
    command.push(pre);
  }

  return command;
};

// TODO loging

module.exports = {
  parseConsoleText,
  textToArgs
};
