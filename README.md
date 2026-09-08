# watashi - izumi haruya

個人のポートフォリオと読書日記をまとめた Web サイトです。

## サイトURL
https://kousei089.github.io/watashi/

## 構成

章ごとに独立したページを持ちます。

| パス | 章 | 中身 |
| --- | --- | --- |
| `/watashi` | 表紙 | 名前・テーマ・できごとの目盛り・目次 |
| `/watashi/about` | わたし | プロフィール、すきなものの目盛り、写真 |
| `/watashi/history` | これまでのわたし | 縦の時間軸に並べた年表 |
| `/watashi/diary` | 読書の日記 | 105件の索引と、書いた日の目盛り |
| `/watashi/contact` | おといあわせ | 連絡先と所在 |
| `/watashi/travel` | 旅の記録 | 日本地図（**現在どこからもリンクしていない**） |

章の定義は `src/data/sections.ts` の 1 か所にまとめてあり、
ナビ・表紙の目次・奥付・ルーティングがすべてそこを見ています。

## 設計の考え方

**図法はひとつだけ。** 「値を、実際の位置に打つ」という作図を、
章ごとに違うデータで繰り返しています。装飾ではなく、図そのものが情報です。

- 表紙 — 16 のできごとを、その年の位置に（`TickRule`）
- これまでのわたし — 年を、経過した長さぶんの間隔で。できごとの無い年も 1 行取る
- 読書の日記 — 105 件を、書いた日の位置に。軸の下に月と年の刻み

**書体は二層。** 見出しと名前は明朝（Zen Old Mincho）、本文とラベルは
ゴシック（Inter + Zen Kaku Gothic New）。欧文の Inter に和文グリフは無いので、
日本語は自動的に Zen Kaku Gothic New に落ちます。

**背景。** 大きくぼかした色の面を 4 枚重ね、それぞれ別の道筋で漂わせています
（`PageBackground`）。章ごとに色が変わり、配置は共通です（`src/data/palettes.ts`）。
canvas にノイズを描いて陰影を付ける実装も試しましたが、艶のある質感になり、
このサイトのマットな持ち味と合わなかったため戻しています。

**スクロール。** Lenis による慣性スクロール（`src/lib/lenis.tsx`）。
生の `window.addEventListener('scroll')` は使わず、Lenis の `scroll` に相乗りします。

**prefers-reduced-motion** を尊重します。有効な場合は Lenis も背景の動きも
自前のカーソルも止まり、OS のカーソルに任せます。

## 技術スタック
- React / react-router-dom / TypeScript
- Tailwind CSS
- Framer Motion
- Lenis（慣性スクロール）
- d3（`/watashi/travel` の日本地図のみ）
- GitHub Pages (`gh-pages`)

## 開発

```bash
npm install
npm start      # http://localhost:3000/watashi
npm run build
```

`package.json` の `overrides` で `react-scripts` の typescript peer を上書きしています。
これが無いと `--legacy-peer-deps` が必要になり、ajv の解決が壊れてビルドできません。

## データの持ち方

- `src/data/eyecatchData.ts` — 読書日記の一覧（**手作業で更新**）
- `src/data/timeline.ts` — 年表
- `src/data/profile.ts` — 「わたし」の文章
- `src/data/site.ts` — 写真、外部リンク、連絡先
- `src/data/palettes.ts` — 章ごとの背景色

読書日記の一覧は手で管理しているため、note の実際の記事数とずれます
（2026年9月時点で、掲載 105 件に対し note には 216 件）。

note の画像は 1280x669 で配信されますが、格子では 191px 幅で見せるため、
`?width=` を付けた `srcset` を渡してブラウザに選ばせています。
そのまま貼ると 105 枚で 13.4MB になります。

## デプロイ

1. 作業用ブランチで `add`, `commit`, `push`
2. GitHub 上で Pull Request を作成し `master` へマージ
3. ローカルの `master` で `npm run deploy`
4. 反映まで数分待つ

`public/404.html` は GitHub Pages が SPA のルーティングを知らないための受け皿です。
`/watashi/diary` などへの直リンクやリロードを `index.html` に引き戻しています。
**削除しないでください。**
