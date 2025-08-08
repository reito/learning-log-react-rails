📌 目的
このリポジトリは、React・Railsを用いたフルスタック開発のスキル向上を目的とした練習ログ。
それぞれの技術に特化したテーマでアプリを小さく作りながら、実装経験と理解を深めるための場とする。

📁 構成（簡易）

learning-log-react-rails/
├── react-only/         # Reactに特化したテーマ
├── rails-only/         # Railsに特化したテーマ
├── fullstack/          # React×Railsの連携テーマ
└── shared-utils/       # 共通スクリプトや設定
⚙️ 技術スタック
React（Vite or CRA）

Rails（APIモード中心）

Docker（テーマによって導入）

DB: PostgreSQL または SQLite

✍️ テーマ追加ルール
theme-<学習目的> 形式でディレクトリ作成

テーマ内には必ず README.md を配置

不完全でもいいので随時追加・記録

ブラッシュアップしたら独立リポジトリにしてもOK

##手順
プロジェクトを作る
yarn create 〇〇 vite . --template react-ts


## よくあるエラーと対策

### Yarn 4 (Berry) のPnPでTypeScriptの型解決が壊れる
現象: `.pnp.cjs` がある状態で、TSの型が見つからずエラー連発。

**解決（推奨）: PnPを無効化して node_modules 方式にする**
1. `.yarnrc.yml` に `nodeLinker: node-modules enableGlobalCache: true ` を設定
2. rm -f .pnp.* && rm -rf .yarn && yarnを実行して既存PnP関連ファイルを削除し依存関係を再インストール
3. tsconfig.app.jsonの`"erasableSyntaxOnly": true,`を削除

