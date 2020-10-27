![Node Test](https://github.com/sudalab/chiba-lang/workflows/Node%20Test/badge.svg)

# chiba-lang（仮称）

Chiba-langはプログラミング言語である．

## コンセプト

Scratchなどの記号を並べるタイプの環境でプログラミングを学んだ子供が，次の段階として文字ベースのプログラミング言語を学ぶ際に躓くことが考えられる．

1. 文字ベースのプログラミング言語には，初心者には説明しづらい部分が存在している．（C言語のinclude文，Java言語のpublic static voidなど）
1. 英単語が多用されているが，単語の意味が分からないと理解しづらいメソッド名などが存在している．
1. 上記2つにより，パット見てわからない箇所は理解不要と捉えてしまい，深く考えないようになってしまう．
1. タイピングに慣れていないので，スペルミスが多発する．
1. 様々な記号が混在しているとタイプに時間が取られてしまう．
1. 上記2つにより，プログラミングとタイピングを同一視してしまう恐れがある．
1. 巷のアプリケーションと比べて，見劣りするものしか作れない．
1. 既存の言語だと、Scratchと異なり一方通行でプログラムを追っていくことが難しい。

基本方針として，初心者に対して説明しづらい箇所を作らない（「おまじない」の撲滅），SHIFTキーを伴う記号の利用を抑える，そこそこのアプリケーションを作成可能などを盛り込んだ言語及び環境を構築することを目的とする．

書式などについては，[wiki](https://github.com/sudalab/chiba-lang/wiki)を御覧ください．

## ファイルの説明

以下のファイルが同梱されています．

ファイル名 | 内容
-|-
syntax.pegjs | 言語定義ファイル
syntax.js | 言語定義ファイルと，コマンドラインで与えられたサンプルファイルを読み込んで，ASTを出力する
syntax2.js | 変数への代入，代入した数値の取り出しなどが実行可能
syntax3.js | Objectクラスがあるものとして実行
example1.chb | サンプルファイル1：代入
example2.chb | 演算のテスト
example3.chb | 文字列のテスト
example4.chb | オブジェクトの比較のテスト

## syntax.jsを動かすための準備

ASTを出力するためには，node.jsとnpmコマンドのインストールが必要です．
お使いのOSに合うよう，インストールしてからお使いください．

```
$ npm install
$ node syntax.js example1.chb
```


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