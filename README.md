[![Node Test](https://github.com/su-u/step/actions/workflows/nodejs.yml/badge.svg)]

# Step（仮称）

# chevrotain版

## 環境用意
```bash
npm install -g yarn
yarn install
```

## インタープリタ実行TS版
```bash
ts-node .\src\cli.ts [chb]
```

例：
```bash
ts-node .\src\cli.ts .\chb\main.chb
```

## テスト実行
```bash
yarn run test
```

# Web版
```bash
yarn run build
yarn run server
```

# CI
github actionsを利用したCIが動作しています。
落ちてもmergeできますが、可能な限り通してください。