/* eslint no-console: off */
const { exec } = require('child_process');
const commander = require('commander');

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-t, --type <type>', 'Type of commit')
  .option('-m, --message <message>', 'Commit message')
  .parse(process.argv);

commander.parse(process.argv);

if (!commander.type || !commander.message) {
  console.log('You must enter commit type and message.');
} else {
  const pattern = /(chore|feat|docs|fix|refactor|style|test|sonar|hack|release)(:)( )(.{0,80})/;
  const message = `${commander.type}: ${commander.message}`;
  if (message.match(pattern)) {
    exec(`scripts/git/bin/commit '${message}'`, (error, stdout, stderr) => {
      if (error || stderr) {
        console.log(error);
      } else {
        console.log(stdout);
      }
    });
  } else {
    console.log('Your string must match the following pattern:');
    console.log('(chore|feat|docs|fix|refactor|style|test|sonar|hack|release)(:)( )(.{0,80})');
  }
}
