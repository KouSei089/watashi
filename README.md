# watashi - izumi haruya

個人のポートフォリオ・読書日記・旅の記録などをまとめたWebアプリケーションです。
スクロールそのものを主役に据えた、1ページ構成のサイトです。

## サイトURL
https://kousei089.github.io/watashi/

## 構成

導入からフッターまでが 1 本のスクロールにつながっています。

| 章 | アンカー | 中身 |
| --- | --- | --- |
| 導入 | — | スクロールに連れて主題の像のぼけが晴れる |
| わたし | `#profile` | プロフィール |
| これまでのわたし | `#history` | 横スクロールの年表（GSAP ScrollTrigger で pin） |
| 読書の日記 | `#book-diary` | 読書記録のグリッド |

`/watashi/travel` に日本地図の「旅の記録」が別ページとして残っています
（現在ナビゲーションからは外しています）。

## スクロール設計

- **Lenis** — 慣性スクロール。`src/lib/lenis.tsx` の `LenisProvider` が唯一の
  インスタンスを持ち、`useScrollTo()` から章移動に使う。
  生の `window.addEventListener('scroll')` は使わず、Lenis の `scroll` に相乗りする。
- **年表の時間軸** — カードの横位置を「順番」ではなく「年の隔たり」で決めている。
  空いた年は間延びし、できごとが重なった年は密集する。
- **読書グリッド** — スクロールの速さに応じて格子がわずかに傾く（最大 1.2 度）。
- **章立てインジケータ** — 右端の縦の目盛りで現在地を示す。
- **prefers-reduced-motion** — OS 側で視差効果を減らす設定なら、Lenis も pin も
  傾きも無効化し、年表は縦並びのリストになる。

## 技術スタック
- **Frontend**: React / react-router-dom / TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP + ScrollTrigger
- **Smooth Scroll**: Lenis
- **Deployment**: GitHub Pages (`gh-pages`)

## 開発

```bash
npm install
npm start      # http://localhost:3000/watashi
npm run build
```

`package.json` の `overrides` で `react-scripts` の typescript peer を上書きしています。
これが無いと `--legacy-peer-deps` が必要になり、ajv の解決が壊れてビルドできません。

## デプロイ手順
1. 作業用ブランチで変更内容を `add`, `commit`, `push` する。
2. GitHub上でPull Requestを作成し、`master`ブランチへマージする。
3. ローカルの `master` にて `npm run deploy` を実行する。
   （内部で `npm run build` が実行され、自動的に `gh-pages` ブランチへプッシュされます）
4. 反映されるまで数分待ちます。

`public/404.html` は GitHub Pages が SPA のルーティングを知らないための受け皿です。
`/watashi/travel` などへの直リンクやリロードを `index.html` に引き戻しています。削除しないでください。
