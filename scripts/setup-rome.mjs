import {
  readFileSync,
  writeFileSync,
  existsSync,
  rmSync,
  copyFileSync
} from 'node:fs'

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
const devDependencies = { rome: '^12.1.3' }

for (const [name, version] of Object.entries(packageJson.devDependencies)) {
  if (name !== '@biomejs/biome') {
    devDependencies[name] = version
  }
}

packageJson.devDependencies = devDependencies

packageJson.scripts = {
  ...packageJson.scripts,
  format: 'rome format --write src',
  lint: 'rome check src & eslint ./src/* & stylelint "src/**/*.css"',
  'lint:fix': [
    'rome check --apply src',
    'eslint ./src/* --fix',
    'stylelint "src/**/*.css" --fix'
  ].join(' & ')
}

writeFileSync('package.json', JSON.stringify(packageJson, null, 2))

if (existsSync('scripts/rome.json')) {
  copyFileSync('scripts/rome.json', 'rome.json')
  rmSync('scripts/rome.json')

  if (existsSync('biome.json')) {
    copyFileSync('biome.json', 'scripts/biome.json')
    rmSync('biome.json')
  }
}

console.info('Run npm i, pnpm i or yarn i')
