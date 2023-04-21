import * as shell from 'shelljs';
import * as fs from 'fs';

shell.rm('-rf', 'dist');

const { scripts, devDependencies, jest, ...restPJson } = JSON.parse(
  fs.readFileSync('package.json', { encoding: 'utf8' })
);

shell.mkdir('dist');

fs.writeFileSync('dist/package.json', JSON.stringify(restPJson, undefined, 2), {
  encoding: 'utf8',
});
