# 「わたし」の節の写真

ここに置いた画像を src/data/site.ts の PROFILE_PHOTOS から参照する。

- パスの書き方: `/watashi/photos/<ファイル名>`（homepage が /watashi のため）
- 1 枚目が主題として大きく出る（PC 68vh / スマホ 52vh、object-cover）ので横位置が向く
- 2 枚目以降は 2 カラム（46vh）。縦横どちらでもよい
- 枚数が奇数のとき、最後の 1 枚は横幅いっぱいになる
