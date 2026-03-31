# watashi - izumi haruya

個人のポートフォリオ・読書日記・旅の記録などをまとめたWebアプリケーションです。
心地よいスクロール体験と、シームレスな画面遷移によるリッチなUXを特徴としています。

## サイトURL
https://kousei089.github.io/watashi/

## 主な機能と技術スタック
- **Frontend Framework**: React (react-router-dom)
- **Styling**: Tailwind CSS
- **Animations**: 
  - **Framer Motion**: シームレスなページ遷移（AnimatePresence）、美しいマイクロインタラクション
  - **GSAP & ScrollTrigger**: スクロールと完全連動したパフォーマンスの高い横スクロールタイムライン
- **Smooth Scroll**: Lenis
- **Deployment**: GitHub Pages (`gh-pages`)

## デプロイ手順
1. 作業用ブランチで変更内容を `add`, `commit`, `push` する。
2. GitHub上でPull Requestを作成し、`master`（または`main`）ブランチへマージする。
3. ローカルの `master`（または`main`）にて `npm run deploy` を実行する。（内部で `npm run build` が実行され、自動的に `gh-pages` ブランチへとプッシュされます）
4. 反映されるまで数分待ちます。
