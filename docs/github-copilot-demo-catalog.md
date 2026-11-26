# GitHub Copilot Chat・App・CLI 機能別デモカタログ（2026-11-25）

## 1. カタログの読み方と共通準備

時間割のない**機能棚卸し用**の台本。[60分ハンズオン](./github-copilot-hands-on.md)とは別資料で、各行は個別に実演できる。似た機能でも操作や管理対象がクライアントごとに異なる場合は別に数える。公式資料に基づく手順案であり、実機での全項目の動作確認は行っていない。

| 対象 | デモ数 | 主な範囲 |
|---|---:|---|
| VS Code Chat・エディター | 16 | 補完、質問、計画、編集、テスト、レビュー、ログ |
| VS Code Agents ウィンドウ | 12 | 複数セッション、実行場所、比較、カスタマイズ、自動化 |
| GitHub Copilot App | 22 | 委任、Issue／PR、Projects、モデル、連携、操作拡張 |
| GitHub Copilot CLI | 22 | 対話、並列化、Git、調査、利用量、非対話実行 |
| 横断・組織運用 | 10 | セッション継続、Fusion、評価、認証、管理 |
| **合計** | **82** | 一意の製品機能数ではなく、デモ項目数 |

**条件の凡例**：**ローカル**は手元で作業するデモで、モデル推論がオフラインという意味ではない。**GitHub** は演習用リモートと権限が必要。**クラウド**は対応プラン・リポジトリ・組織ポリシー・予算を要確認。**追加設定**は拡張、接続先、設定または別の実行環境が必要。**プレビュー／実験**は公式資料でそう明記されたものに付記する。無印を GA とみなさない。**書き込み**を含む項目は使い捨ての演習環境で、外部に書き込む直前に対象と内容を確認する。

**共通題材**：このリポジトリの URL スラッグ変換サンプルを使用。`src/slug.mjs`、`test/slug.test.mjs`、`README.md`、既存テストの成功、前後空白の回帰ケースを用意する。拡張デモ用に、別途、①架空データだけのローカル Web ページとモック画像、②書き込み可能な演習用 GitHub リポジトリ・Issue・PR・CI、③必要に応じて2つ目の演習リポジトリ、接続先・検証アカウントを用意する。各デモは初期状態から始め、相互依存するものは事前の完成差分で代替できるようにする。

**実演の境界**：本番リポジトリ、顧客データ、認証情報を使わない。ローカル変更の隔離には別 worktree、権限制御には承認とサンドボックスを使う。自動化は読み取り専用の手動起動から始める。プレビュー機能や管理制限のある機能は、設定を変えられなければ公式画面または事前録画で紹介する。

**公式出典**

- [Build with AI in VS Code](https://code.visualstudio.com/docs/agents/overview)
- [GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app)
- [Getting started with GitHub Copilot CLI](https://docs.github.com/en/copilot/get-started/cli-quickstart)
- [About cloud and local sandboxes for GitHub Copilot](https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes)

## 2. VS Code Chat・エディター：開いているコードを起点にする

| ID・機能 | 条件 | 操作 → 見せる結果 |
|---|---|---|
| V01 インライン補完 | ローカル | テスト内で新しい `test` の先頭を入力 → 薄い候補を読み、採用するか判断する。Chat を開く必要はない。 |
| V02 Next Edit Suggestions | ローカル | デモ用関数に引数を足す → ガターの候補から呼び出し側の関連編集へ移動し、採用前に確認する。 |
| V03 Quick Chat | ローカル | Quick Chat を開き、`trim` と空白置換の順序を質問 → 一時的な会話で答えを得る。 |
| V04 エディターの Inline Chat | ローカル | 小さな関数を選択し「変数名だけ分かりやすく」と依頼 → その場の差分を確認する。 |
| V05 ターミナルの Inline Chat | ローカル | 統合ターミナルで特定のテストだけを実行する方法を質問 → 提案コマンドを読んでから手動で実行する。 |
| V06 Chat のコンテキスト指定 | ローカル | ファイルや選択範囲を **Add Context** で添え、保証する仕様を質問 → 回答を実際のテスト行と照合する。 |
| V07 複数ファイルの読解 | ローカル | 実装とテストを添え、入口・処理・出力を説明させる → コードを変更せず呼び出しの流れを確認する。 |
| V08 画像を添付 | 対応モデル | モック画像を Chat に添え、画面要素と不明点を書き出させる → 画像から分かることと推測を比較する。 |
| V09 Plan | ローカル | **Plan** エージェントに前後空白の修正計画を依頼 → 処理順序・影響範囲・回帰テストが入り、まだコードが変わっていないことを見る。 |
| V10 編集とテスト実行 | ローカル | 承認した計画に沿って回帰テストと実装を変更させる → 差分と `node --test` の結果を照合する。 |
| V11 実行中の方向修正 | ローカル | 作業中に「README は変更しない」と追加で指示 → 作業範囲が狭まったか確認する。停止と既実施の変更取り消しは別。 |
| V12 差分レビュー | ローカル | 変更ファイルを開き、必要な編集だけを取り込む → 意図しない変更が残っていないことを Git 差分で確認する。 |
| V13 チェックポイント | 対応セッション | 使い捨てのセッションで変更を2段階に分け、チェックポイントを復元 → ファイルと会話の戻り方を確認する。外部操作を巻き戻す機能ではない。 |
| V14 テスト失敗・デバッガー | ローカル | 回帰テストを失敗させ、呼び出し引数と出力を Chat で説明させる → ブレークポイントで実値と説明を照合する。 |
| V15 セッション一覧 | ローカル | Chat 内で **Show Sessions** を表示して過去の会話を再選択 → 一覧・会話の表示を切り替える。別ウィンドウとは区別する。 |
| V16 Agent Logs | ローカル | デモセッションの Agent Logs を開く → ファイル探索、ツール、指示の読み込みなどの順序を見る。実データを含むトレースは投影しない。 |

**公式出典**

- [Inline suggestions from GitHub Copilot in VS Code](https://code.visualstudio.com/docs/editing/ai-powered-suggestions)
- [Inline chat and Quick Chat](https://code.visualstudio.com/docs/chat/inline-chat)
- [Use chat in VS Code](https://code.visualstudio.com/docs/chat/chat-overview)
- [Use the Chat view](https://code.visualstudio.com/docs/agents/run/chat-view)
- [Review AI-generated code edits](https://code.visualstudio.com/docs/agents/run/review-code-edits)
- [Manage agent sessions in VS Code](https://code.visualstudio.com/docs/agents/run/sessions/manage-sessions)

## 3. VS Code Agents ウィンドウ：セッションを俯瞰する

前身の Visual Studio Code Agents は **2026-04-08、1.115 で Insiders 限定プレビュー**。現在の Agents ウィンドウは **2026-05-13、1.120 で Stable 版にもプレビュー提供**された。Chat ビュー内のセッション一覧や独立製品の GitHub Copilot App とは別。

| ID・機能 | 条件 | 操作 → 見せる結果 |
|---|---|---|
| W01 起動と画面構成 | ローカル | タイトルバーの **Open in Agents** または **Chat: Open Agents Window** で開く → セッション一覧、会話、**Files／Changes** の位置を示す。 |
| W02 エディターと同じセッション | 対応する Copilot セッション | Chat で質問した後、Agents の一覧から既存セッションを開き、**Open in Editor** で戻る → 履歴を引き継ぎ、新規会話ではないと示す。 |
| W03 並列セッション | ローカル | **New Session** でテスト追加と README 改善を独立した **New Worktree** に委任 → 一方をレビュー中も他方の進捗を追える。 |
| W04 Changes と作業場所 | ローカル | 2つのセッションを切り替えて **Changes** とターミナルを開く → 選択中の worktree の差分と実行場所に切り替わる。 |
| W05 Inbox Mode | 実験・追加設定 | 対応設定を有効にし、質問待ちと完了済みのセッションを用意 → 要対応が優先表示されることを確認する。 |
| W06 クラウドセッション | クラウド | 新規セッションの実行場所で Cloud、演習リポジトリを選んで README を要約 → 作業先が手元の checkout ではないことを示す。 |
| W07 リモートエージェント | 追加設定 | 承認済みの SSH または Dev Tunnel ホストを選んでテストを実行 → 実行先が別ホストで、再接続後も履歴を見られることを確認する。 |
| W08 モデル／ハーネス比較 | プレビュー・対応設定 | **Compare Models** で同じ課題を2候補に実行 → 独立した提案を比較し、必要なら Judge の理由と Synthesize の統合結果を別々に確認する。 |
| W09 Customizations | ローカル・項目別に要設定 | **Customizations** で指示、スキル、プラグイン、MCP の出所を表示 → リポジトリ設定とユーザー設定を区別する。 |
| W10 ローカル Automations | 追加設定 | README の要約を自動化として保存して手動実行 → 出力を確認し、スケジュールは無効のままにする。 |
| W11 ビジュアル応答 | 追加設定・機能別に実験 | 架空のテスト結果を図示するよう依頼し、対応する HTML プレビューまたはネイティブ表示を選ぶ → 外部公開せず画面内で確認する。 |
| W12 組み込みブラウザー | ローカル・機能設定を確認 | デモ用 `localhost` を VS Code のブラウザーツールで開き、リンク先を確認 → 操作結果と画面を確認する。既存の Chrome／Edge を使う Browser Use とは別。 |

**公式出典**

- [Use the Agents window](https://code.visualstudio.com/docs/agents/run/agents-window)
- [Visual Studio Code 1.115](https://code.visualstudio.com/updates/v1_115)
- [Visual Studio Code 1.120](https://code.visualstudio.com/updates/v1_120)
- [Visual Studio Code 1.127](https://code.visualstudio.com/updates/v1_127)
- [Visual Studio Code 1.146](https://code.visualstudio.com/updates/v1_146)
- [Visual Studio Code 1.147](https://code.visualstudio.com/updates/v1_147)
- [Compare model results](https://code.visualstudio.com/docs/agents/run/compare-models)
- [Build with AI in VS Code](https://code.visualstudio.com/docs/agents/overview)

## 4. GitHub Copilot App：作業の委任からレビューまで

順序は [日本語版 GitHub Docs の左メニュー](https://docs.github.com/ja/copilot/how-tos/github-copilot-app) に準拠（2026-11-25 確認）。既存デモに対応する項目のみ掲載し、各章内の表示順でデモ ID を付ける。

| ID・機能 | 条件 | 操作 → 見せる結果 |
|---|---|---|
| **[GitHub Copilot アプリをカスタマイズする](https://docs.github.com/ja/copilot/how-tos/github-copilot-app/customize-github-copilot-app)** | | |
| A01 MCP・コネクター・プラグイン | 追加設定 | **Customize** で各種類を表示し、承認済みの読み取り専用接続先から架空の仕様を参照 → 呼んだツールと出典を確認する。 |
| **[エージェント セッション](https://docs.github.com/ja/copilot/how-tos/github-copilot-app/agent-sessions)** | | |
| A02 ローカルフォルダー接続 | ローカル | **Open local folder** で演習 clone を追加 → App にリポジトリとセッションの入口が表示される。 |
| A03 リポジトリの検索・clone | GitHub | **Add GitHub repository** で演習リポジトリを選ぶ → 対象とローカルの作業場所を確認する。 |
| A04 Interactive | ローカル | 「空文字のテストだけ追加」と依頼して必要な操作だけを承認 → 実装を変えずにテストが通る。 |
| A05 Plan | ローカル | 「変更前に作業計画を出して」と依頼 → ステップと確認条件をレビューしてから実行に進む。 |
| A06 Autopilot | 専用のローカル環境 | 使い捨て worktree で小さな README 変更を委任 → Interactive と介入の違いを見せ、変更先と結果を確認する。包括許可は追加しない。 |
| A07 Worktree と並行作業 | ローカル | **New worktree** を2つ作り、テストと文書を別々に依頼 → 元の checkout と両セッションの差分を見比べる。 |
| A08 `/fleet` | ローカル | README の例と既存テストの網羅範囲を別担当で調べるよう依頼 → 独立セッションを手動で立てる場合と、親エージェントが配分する場合を比較する。 |
| **[モデルを選択する](https://docs.github.com/ja/copilot/how-tos/github-copilot-app/choose-a-model)** | | |
| A09 モデル選択 | 対応モデル | モデルピッカーで標準の選択肢を確認し、利用可能なモデルを切り替えて同じ質問を比較する。BYOK の操作は後段の「LLM モデルを追加する」で扱う。 |
| **[プロジェクト](https://docs.github.com/ja/copilot/how-tos/github-copilot-app/working-with-projects)** | | |
| A10 Projects | パブリックプレビュー | **Projects** で2つの演習リポジトリと架空の仕様書を追加し、リリース準備の課題を依頼 → **Overview** でセッションと要対応項目を確認する。 |
| **[ブラウザーの使用](https://docs.github.com/ja/copilot/how-tos/github-copilot-app/browser-use)** | | |
| A11 Browser Use | パブリックプレビュー・追加設定 | 対応する Chrome／Edge 拡張と App の設定を用意し、ローカルのデモページの見出しを読み取らせる → 分離されたタブグループとアクセス許可を確認する。 |
| **[コンピューターの使用](https://docs.github.com/ja/copilot/how-tos/github-copilot-app/computer-use)** | | |
| A12 Computer Use | パブリックプレビュー・macOS／Windows | OS とアプリの許可を確認し、架空テキストを表示したエディターを読み取らせる → アプリ単位の承認を示し、ファイル保存はしない。 |
| **[キャンバス拡張機能](https://docs.github.com/ja/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)** | | |
| A13 Canvas | 追加設定 | **Customize** の Canvas から承認済みのものを選び、架空の作業項目を表示 → 会話での依頼と操作できる表示の違いを見せる。 |
| **[Issue とプル要求の管理](https://docs.github.com/ja/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests)** | | |
| A14 `My Work` | GitHub | 演習 Issue とレビュー依頼を一覧で絞る → リポジトリをまたいで手を付けるべき仕事を確認する。 |
| A15 Issue から開始 | GitHub | 演習 Issue を開き **New session** → 要件を再入力せず Issue を起点に差分を作れることを示す。 |
| A16 PR を作成 | GitHub・書き込み | レビュー済みの差分から演習用 PR を作る → 対象ブランチと PR 本文を人が確認する。 |
| A17 PR の差分・CI・レビュー | GitHub | 既存 PR の概要と **Files changed** を開く → CI の成功・失敗とレビュー依頼を確認する。 |
| A18 レビュー指摘の対応 | GitHub・書き込みは任意 | 演習 PR の文書指摘から **Fix** で修正をセッションに委任 → 指摘と修正差分を照合し、必要なら反映する。 |
| A19 Agent Merge | GitHub・権限、デモでは有効化しない | 演習 PR の設定画面で、レビュー・CI の修正や条件成立時のマージ項目を確認 → 必須チェックや保護ルールとどう組み合わさるかを説明する。 |
| **[Azure DevOps 作業を管理する](https://docs.github.com/ja/copilot/how-tos/github-copilot-app/manage-azure-devops-work)** | | |
| A20 Azure DevOps／GHES | 追加アカウント、Azure DevOps はパブリックプレビュー | **Settings → Accounts** で承認済みの検証環境を追加し、既存 PR を開く → GitHub.com 以外の接続先を示す。両者のリポジトリでクラウドセッションは使えない。 |
| **[オートメーション](https://docs.github.com/ja/copilot/how-tos/github-copilot-app/using-automations)** | | |
| A21 Automations | 追加設定、クラウドは別条件 | README の変更点を要約する読み取り専用ルールを作り、手動実行 → トリガー、実行履歴、ローカル／クラウド、Personal／Shared の違いを示す。イベントやスケジュールは有効化しない。 |
| **[LLM モデルを追加する](https://docs.github.com/ja/copilot/how-tos/github-copilot-app/add-llm-models)** | | |
| BYOK（A09 の続き） | 承認済みの検証用モデル | 外部プロバイダーのモデルを追加し、同じ質問を実行 → 利用可能モデルと課金主体を区別する。キーは画面に出さない。 |
| **[ディープ リンクで開く](https://docs.github.com/ja/copilot/how-tos/github-copilot-app/open-with-deep-links)** | | |
| A22 ディープリンク | App インストール済み | 演習 Issue 向けの `ghapp://` リンクまたは CLI の `copilot app` を開く → リンクが対象画面を開くだけで、新規プロンプトは確認・送信するまで走らないことを説明する。 |

**公式出典**

- [GitHub Copilot app](https://docs.github.com/ja/copilot/how-tos/github-copilot-app)（日本語版左メニューの順序）
- [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Managing issues and pull requests with the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests)
- [Working with projects in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-projects)
- [Using automations in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/using-automations)
- [Customizing the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app)
- [Using deep links to open the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/open-with-deep-links)
- [GitHub Copilot app, Universe releases](https://github.blog/changelog/2026-10-28-github-copilot-app-universe-releases/)
- [GitHub Copilot app, Microsoft Ignite releases](https://github.blog/changelog/2026-11-17-github-copilot-app-microsoft-ignite-releases/)

## 5. GitHub Copilot CLI：ターミナルで再現・計画・検証する

`copilot` はシェルで、`/` で始まるコマンドは Copilot の対話内で入力する。コマンド名やオプションは利用中の版の `/help` と `copilot help` でも確認する。

順序は [日本語版 GitHub Docs の左メニュー](https://docs.github.com/ja/copilot/how-tos/copilot-cli) に準拠（2026-11-25 確認）。既存デモに対応する項目のみ掲載し、各章内の表示順でデモ ID を付ける。

| ID・機能 | 条件 | 操作 → 見せる結果 |
|---|---|---|
| **セットアップ › [Copilot CLI を認証する](https://docs.github.com/ja/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli)** | | |
| C01 起動と認証 | ローカル | `copilot --version`、`copilot`、必要なら `/login` → バージョン、アカウント、信頼する演習フォルダーを確認する。 |
| **セットアップ › [Copilot CLI の構成](https://docs.github.com/ja/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli)** | | |
| C02 サンドボックス | 対応 OS／組織設定 | `/sandbox status` と `/sandbox policy` を表示 → ローカル worktree の分離と、ファイル・ネットワークの権限制御を区別する。 |
| **使用 › [概要](https://docs.github.com/ja/copilot/how-tos/copilot-cli/use-copilot-cli/overview)** | | |
| C03 ファイル参照 | ローカル | `@src/slug.mjs` を添えて変換順序を質問 → 添付先と回答の根拠を照合する。 |
| C04 Shell 入力 | ローカル | `!` でシェル入力に切り替え `node --test` を実行 → 自分で実行する操作と、エージェントに実行を委ねる操作を区別する。 |
| C05 Plan | ローカル | `Shift+Tab` で Plan に切り替え、回帰テスト先行の手順を依頼 → 実装前に計画を確認する。 |
| C06 確認と差分 | ローカル | `/diff` を開き、別シェルで `git diff` と `node --test` を実行 → 要約ではなく実際の差分とテストで判定する。 |
| C07 `/context` と `/compact` | ローカル | 数ファイルを読ませて `/context` を表示し、必要なら `/compact` → 文脈の内訳と要約前後を比較する。 |
| C08 CLI からクラウド起動 | クラウド・CLI の機能設定を確認 | `copilot --cloud` で演習用リポジトリの作業を開始し、README を要約 → コマンドの実行先が GitHub 側であることを確認する。利用版が実験機能の有効化を要求する場合は、許可された検証環境でのみ行う。 |
| **使用 › [ツールを許可する](https://docs.github.com/ja/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools)** | | |
| C09 実行・個別承認 | ローカル | 前後空白の最小修正を依頼し、書き込み先とテストコマンドを確認 → 必要な操作だけ許可して失敗→成功を見る。 |
| **使用 › [モデルを選択する](https://docs.github.com/ja/copilot/how-tos/copilot-cli/use-copilot-cli/choose-a-model)** | | |
| C10 `/model` | 対応モデル | `/model` で利用可能なモデルと推論レベルを表示し、同じ小問を比較 → 選択肢は契約・ポリシー依存と説明する。 |
| **使用 › [複数のセッションを使用する](https://docs.github.com/ja/copilot/how-tos/copilot-cli/use-copilot-cli/work-with-multiple-sessions)** | | |
| C11 セッションの再開 | ローカル | `/exit` で閉じ、`copilot --resume` で開き直す → プロンプトと回答が復元される。 |
| C12 複数セッション | ローカル | `/new` で独立した文書確認を始め、Sessions で元の作業へ戻る → 会話とタスク状態を見分ける。 |
| C13 `/worktree` | ローカル | クリーンな checkout から `/worktree demo-readme` で別の作業コピーを作り、そこで README を編集 → `git worktree list` でパスを見比べ、元の checkout に新しい差分がないことを確認する。 |
| **使用 › [Copilot CLI で調べる](https://docs.github.com/ja/copilot/how-tos/copilot-cli/use-copilot-cli/research-with-copilot-cli)** | | |
| C14 `/research` | 対応版・接続先を確認 | 公開の Node.js テストランナー資料と演習コードを比較する課題を依頼 → 出典付きレポートを開き、原典と照合する。 |
| **使用 › [エージェントを操縦する](https://docs.github.com/ja/copilot/how-tos/copilot-cli/use-copilot-cli/steer-agents)** | | |
| C15 後続プロンプトのキュー | 対応版・ローカル | 処理中に `Ctrl+Q` でフォローアップをキューへ → pending 表示と、実行前に個別取消できることを示す。 |
| **使用 › [Agentic のコード レビュー](https://docs.github.com/ja/copilot/how-tos/copilot-cli/use-copilot-cli/agentic-code-review)** | | |
| C16 `/review` | ローカル | 演習用の差分を作り、互換性と不足テストに絞ってレビューを依頼 → 指摘が根拠となる行に対応するかを確認する。 |
| **使用 › [プル要求を管理する](https://docs.github.com/ja/copilot/how-tos/copilot-cli/use-copilot-cli/manage-pull-requests)** | | |
| C17 `/pr` | GitHub | 演習 PR を参照して概要と CI を確認 → 対話から PR を扱えることを示す。書き込みをしない閲覧デモとする。 |
| **使用 › [タスクの完了を高速化する](https://docs.github.com/ja/copilot/how-tos/copilot-cli/use-copilot-cli/speed-up-task-completion)** | | |
| C18 `/fleet` と `/tasks` | ローカル | `/fleet` で文書とテストの独立した読み取り調査を依頼 → `/tasks` で子タスクの分担と結果を確認する。 |
| **使用 › [セッション データを使用する](https://docs.github.com/ja/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle)** | | |
| C19 `/usage` と `/chronicle` | ローカル・履歴 | `/usage` でセッションの利用量、`/chronicle` で自分のデモ履歴を確認 → 利用状況と履歴分析の違いを示す。 |
| **自動化 › [CLI をプログラムで実行する](https://docs.github.com/ja/copilot/how-tos/copilot-cli/automate-copilot-cli/run-cli-programmatically)** | | |
| C20 非対話実行 | ローカル・CLI 1.0.115 以降を使用 | `copilot --available-tools= -p 'Explain the difference between unit and integration tests in two bullet points.'` を実行 → 対話画面なしで短い応答を得る。ツールなしの例で、CI への導入・認証は別作業とする。 |
| **カスタマイズ › [概要](https://docs.github.com/ja/copilot/how-tos/copilot-cli/customize-copilot/overview)** | | |
| C21 カスタマイズの棚卸し | 追加設定 | `/instructions`、`/skills`、`/agent`、`/mcp`、`/settings` を開く → 指示・手順・役割・接続・設定の違いを示す。プラグインや hook は承認済み教材だけを使用する。 |
| **カスタマイズ › [カスタム命令を追加する](https://docs.github.com/ja/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)** | | |
| C22 カスタム指示 | ローカル・書き込み | 演習 clone に限り `copilot init` を実行し、生成された `.github/copilot-instructions.md` を読む → テストコマンドなど、全員で共有する規則を確認する。 |

**公式出典**

- [GitHub Copilot CLI](https://docs.github.com/ja/copilot/how-tos/copilot-cli)（日本語版左メニューの順序）
- [Use GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli)
- [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [Delegating and parallelizing work with agents](https://docs.github.com/copilot/concepts/agents/copilot-cli/fleet)
- [Overview of customizing GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/overview)
- [Allowing and denying tool use](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools)
- [Running GitHub Copilot CLI programmatically](https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/run-cli-programmatically)
- [GitHub Copilot CLI programmatic reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-programmatic-reference)
- [1.0.115（GitHub Copilot CLI Releases）](https://github.com/github/copilot-cli/releases/tag/v1.0.115)

## 6. 横断・組織運用：違いが見える追加デモ

| ID・機能 | 条件 | 操作 → 見せる結果 |
|---|---|---|
| X01 クラウドセッションの引き継ぎ | クラウド | App から **Cloud** で README の要約を開始し、同一アカウントの VS Code Agents と CLI の **Sessions** で開く → 追記が同じ履歴に入り、各クライアントで再実行していないことを確認する。 |
| X02 ローカル／リモート／クラウドの比較 | 追加環境・クラウド | 同じ `node --version` を3環境で確認 → 接続先、ファイルの所在、ローカルまたはリモートホストが停止した場合の違いを示す。 |
| X03 Copilot Fusion | 対応モデル・ポリシー | 3つのクライアントのモデルピッカーで Fusion を確認し、1つで Standard の小課題を実行 → 固定モデルの選択とは異なる点と利用量の見方を示す。 |
| X04 リポジトリ指示の共有 | ローカル | `.github/copilot-instructions.md` に演習用テストコマンドを書き、対応クライアントの新規セッションで質問 → 規則が反映されるか出典と出力を照合する。 |
| X05 専門作業のカスタマイズ | 追加設定 | スラッグの回帰テスト手順をスキルにし、変更を行わないレビュー役をカスタムエージェントにする → スキルは再利用手順、エージェントは役割として使い分ける。 |
| X06 GitHub Copilot Evals | パブリックプレビュー・拡張／プラグイン | 演習用スキルに「変更せず、回帰条件を3つ出す」という評価を作る → 承認して実行し、改善前後を同じ判定で比較する。 |
| X07 承認・サンドボックス・管理ポリシー | 追加設定・管理者 | デモの承認画面と管理された設定を見比べる → ユーザー承認、ファイル／ネットワーク制御、組織が固定する設定を区別する。 |
| X08 Entra サインイン | パブリックプレビュー、CLI 1.0.113 以降、Windows／macOS | 承認済み検証テナントで対象のログイン経路を表示 → OIDC の Enterprise Managed Users 向け SSO と、条件を満たす Microsoft 365 Copilot 経路が別であることを示す。 |
| X09 Copilot code review と人のレビュー | GitHub・対象プラン／権限 | 演習 PR で Copilot のレビューと人の判断を比較 → App の会話による修正、コードレビュー機能による指摘、Agent Merge による処理を分けて説明する。 |
| X10 プラン・利用量・予算 | 管理者・デモデータ | デモ組織または事前収録で、AI 使用量とクラウド実行環境の利用明細を確認 → 契約上のアクセス、実際の使用量、上限・予算を別々に判断する。 |

**公式出典**

- [Work from anywhere with a new, connected Copilot cloud experience](https://github.blog/changelog/2026-10-28-work-from-anywhere-with-a-new-connected-copilot-cloud-experience/)
- [Build with AI in VS Code](https://code.visualstudio.com/docs/agents/overview)
- [Route and orchestrate models with GitHub Copilot Fusion](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/)
- [Customize GitHub Copilot for your team](https://github.blog/changelog/2026-11-18-customize-github-copilot-for-your-team/)
- [GitHub Copilot Evals is now in public preview](https://github.blog/changelog/2026-11-17-github-copilot-evals-is-now-in-public-preview/)
- [GitHub Copilot CLI adds Microsoft Entra sign-in as a preview](https://github.blog/changelog/2026-11-17-github-copilot-cli-adds-microsoft-entra-sign-in-as-a-preview/)
- [Using GitHub Copilot code review on GitHub](https://docs.github.com/copilot/how-tos/copilot-on-github/use-copilot-agents/copilot-code-review)
- [Agent Merge watches and fixes pull requests in the cloud](https://github.blog/changelog/2026-10-28-agent-merge-watches-and-fixes-pull-requests-in-the-cloud/)
- [GitHub Enterprise now includes access to GitHub Copilot](https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot/)
