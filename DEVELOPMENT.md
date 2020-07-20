# 開発始め方
```
yarn install
```
or
```
npm install
```

# コンパイル
typescriptをコンパイル（トランスパイル）してから実行する必要がある。

typescriptのコンパイル
```
yarn run tsc
```

# 実行
コンパイルしたjavascriptを実行する。
```
node .\build\index.js .\chb\example1.chb
```

# テスト
```
yarn run test
```

pegjsを変更した場合はsnapshotテストの更新が必要

```
yarn run test-u
```