import {
  readFileSync,
  writeFileSync,
  copyFileSync,
  rmSync,
  existsSync
  // biome-ignore lint/nursery/noNodejsModules:
} from 'node:fs'

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))

packageJson.devDependencies = {
  ...packageJson.devDependencies,
  '@biomejs/biome': '1.7.2',
  '@typescript-eslint/eslint-plugin': '^7.17.0',
  '@typescript-eslint/parser': '^7.17.0',
  eslint: '^8.57.0',
  'eslint-plugin-react': '^7.35.0',
  stylelint: '^16.7.0',
  'stylelint-config-standard': '^36.0.1',
  typescript: '<5.4.0'
}

packageJson.scripts = {
  ...packageJson.scripts,
  format: 'biome format --write src',
  lint: 'biome lint src & eslint ./src/* & stylelint "src/**/*.css"',
  'lint:fix': [
    'biome lint --apply src',
    'eslint ./src/* --fix',
    'stylelint "src/**/*.css" --fix'
  ].join(' & ')
}

packageJson.stylelint = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended']
}

writeFileSync('package.json', JSON.stringify(packageJson, null, 2))

for (const config of ['.eslintrc.json', 'biome.json']) {
  if (existsSync(`scripts/${config}`)) {
    copyFileSync(`scripts/${config}`, config)
    rmSync(`scripts/${config}`)
  }
}

// biome-ignore lint/nursery/noConsole:
console.info('Run npm i, pnpm i or yarn i')
