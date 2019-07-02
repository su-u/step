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

## Scratchと1対1で対応する言語？

Scratchで得た体験をベースに、文字ベースのプログラミングを行おうとすると、「猫はどこから出すの？」「ニャーと鳴かせるにはどうすれば良いの？」「緑の旗はどこ？」などの疑問が生じる。
ここで、猫を出すというのは猫オブジェクトを作成することであり、classベースのオブジェクト指向言語であればすでに備わっている。
次に、ニャーと鳴かせるためには、そのような動作をするメソッドを用意しておき、利用者からはそのメソッドを使うことになる。
緑の旗は、実は結構厄介である。
と言うのも、「緑の旗」というイベントを共有する機能が、ほとんどの言語に備わっていないからである。
作成した全ての猫オブジェクトやこうもりオブジェクトの「緑の旗」メソッドを呼び出してあげることは、main以外のメソッドで作成されたオブジェクトを考慮すると、現実的ではない。

そこで、Chiba-langでは、Actor ModelやMessage Passing、Goroutine+channelなどの考え方をベースにしてイベント（仮称）を簡単に取り扱えるように導入する。
具体的なサンプルコードを以下に示す。
まだ文法が固まっていないので、雰囲気だけ読んで欲しい。
この中で"GreenFlag"は、そういう名前のイベントであり、イベントは１つのオブジェクトだけに送信されるのではなく、全体に送信される。

```
Cat.new -> myNeko     // 代入は左から右でもOK
myNeko.on "GreenFlag" do     // onはイベント処理のためのメソッドで、その直後のdo～endまでを実行する
  myNeko.x <- 200     // 代入は右から左でもOK。
  myNeko.y <- 200     // かつ<-を使用する。
end
```

例えばGo言語で以下のように通信をするプログラムがある。
コメントは須田が付加したものである。
出典：[第3回 ハロー、goroutine！](https://www.atmarkit.co.jp/fcoding/articles/go/03/go03a.html)

```go
package main

var ch = make(chan string) // chというchannnel（通信路）を作る

func g(str string) {  // メソッドgの定義
      println(str);
      ch <- "printed";  // chに"printed"を送る
}
func main() {
      go g("hello, gorutine!");
      <- ch;  // chに何か送られるまで待つ
}
```

これをchiba-langで書くと以下のようになる（予定である）。
先のchiba-langの文法と矛盾している箇所があるので、そのうち整合性を取っていく。

```
"test" -> Event.new -> ch  // "test"というイベントを作成し、chに代入する
// new Event "test" -> ch  と書いてもOK

g <- (str) => do  // 記号が多くて、パッと見で何を定義しているか分かりづらいので変更予定
  str -> console  // strを表示
  "printed" -> ch
end

g "hello, chiba-lang" gメソッドを実行する。
// "hello, chiba-lang" -> g  と書いてもOK
ch  // chに何か送られるまで待つ
```

## ボタンをクリックしたら猫を動かすサンプル

```
Button.new -> myButton    // ボタンの定義
"button1" -> Event.new -> ch    // イベント伝達のためのチャンネル定義
myButton.on "click" do  // clickイベントの記述
  "dummy" -> ch    // chにイベントを送信．"dummy"は送信内容だが，今回は何でも良い．
end

Cat.new -> myNeko  // 猫の定義
myNeko.on "button1" do  // "button1"というイベントが送られた際の処理を定義
  myNeko.moveX 3    // 右に3進める
end

on "button1" do  // "button1"というイベントが送られた際の処理を定義
  "押されたよ" -> console  // "押されたよ”を表示
end

// あれ？猫のイベント処理の定義のところって，行頭の「myNeko」不要？
// イベントの記述が，送信・受信共にイケてないので変えたい
```

