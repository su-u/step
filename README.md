[![Node Test](https://github.com/su-u/step/actions/workflows/nodejs.yml/badge.svg)](https://github.com/su-u/step/actions/workflows/nodejs.yml)

# Step（仮称、旧chiba-lang）

## 環境用意
```bash
npm install -g yarn
yarn install
```

## インタープリタ実行TS版
```bash
ts-node .\src\cli.ts [step]
```

例：
```bash
ts-node .\src\cli.ts .\step\main.step
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

## CI
github actionsを利用したCIが動作しています。
落ちてもmergeできますが、可能な限り通してください。

## Chevrotain
- [GitHub - SAP/chevrotain: Parser Building Toolkit for JavaScript](https://github.com/SAP/chevrotain)
- [Playground](https://sap.github.io/chevrotain/playground/)
