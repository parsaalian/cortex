/* eslint no-console: off */
const { exec } = require('child_process');
const commander = require('commander');

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-ts', '--types', 'Help for commit types')
  .option('-t, --type <type>', 'Type of commit')
  .option('-m, --message <message>', 'Commit message')
  .parse(process.argv);

commander.parse(process.argv);

console.log(commander.types);

if (commander.types) {
  console.log(' - feat (new feature)');
  console.log(' - fix (bug fix)');
  console.log(' - docs (changes to documentation)');
  console.log(' - style (formatting, missing semi colons, etc; no code change)');
  console.log(' - refactor (refactoring production code)');
  console.log(' - test (adding missing tests, refactoring tests; no production code change)');
  console.log(' - chore (updating grunt tasks etc; no production code change)');
} else if (!commander.type || !commander.message) {
  console.log('You must enter commit type and message.');
} else {
  const pattern = /(chore|feat|docs|fix|refactor|style|test)(:)( )(.{0,80})/;
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
