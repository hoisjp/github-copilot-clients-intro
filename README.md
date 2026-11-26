# GitHub Copilot クライアント入門

VS Code、GitHub Copilot App、GitHub Copilot CLI の使い分けを体験するハンズオンです。[ハンズオンガイド](docs/github-copilot-hands-on.md)に沿って進めてください。

各クライアントの機能を個別に試したい場合は、[機能別デモカタログ（82件）](docs/github-copilot-demo-catalog.md)を参照してください。

## 事前準備

Git と Node.js 22 以降を用意し、このリポジトリを手元に取得します。依存パッケージのインストールは不要です。各クライアントの準備とサインインは[ハンズオンガイドの事前準備](docs/github-copilot-hands-on.md#2-事前準備)を参照してください。

```sh
git clone https://github.com/hoisjp/github-copilot-clients-intro.git
cd github-copilot-clients-intro
node --test
```

## サンプルと課題

[`src/slug.mjs`](src/slug.mjs) の `slug` は見出しを小文字の URL 用文字列に変換します。既存の仕様は [`test/slug.test.mjs`](test/slug.test.mjs) で確認できます。

```sh
node --input-type=module -e "import { slug } from './src/slug.mjs'; console.log(slug('Hello World'))"
```

この例は `hello-world` を出力します。CLI 実習の課題は、既存の動作を維持しながら前後の空白を除去し、`'  Hello World  '` でも `hello-world` を返すようにすることです。初期状態では `-hello-world-` が返ります。回帰テストを追加し、修正前後で `node --test` を実行してください。
