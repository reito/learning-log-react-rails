📌 目的
shared-utils/ は、React・Railsの各テーマ間で共通して使えるスクリプト・設定ファイル・関数群を格納するためのディレクトリです。

🧰 収録予定のユーティリティ例（現時点で可能なもの）
日付フォーマット関数

API共通ラッパー

カスタムHook（React用）

バリデーションルール

各種共通設定（例：CORS対応・dotenv共通定義）

📌 使用例
tsx

import { formatDate } from "../../shared-utils/formatDate.ts";
⚠️ 運用ルール
単一テーマに依存しない処理のみ配置

なるべく軽量・汎用的に

大きくなったら分離・整理を検討