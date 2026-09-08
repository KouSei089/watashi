import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Palette } from '../../data/palettes';

/** 実際に描く解像度。これを CSS で画面いっぱいに引き伸ばす */
const W = 168;
const H = 100;
/** 描き替えの間隔。滑らかさより負荷の軽さを取る */
const FRAME_MS = 55;

const PAPER: [number, number, number] = [246, 246, 244];

const hash = (x: number, y: number) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

/** 値ノイズ。格子点の乱数を smoothstep で補間する */
const noise = (x: number, y: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
};

/** 重ねた値ノイズ。粗い波の上に細かい波が乗る */
const fbm = (x: number, y: number, octaves: number) => {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i += 1) {
    sum += noise(x * freq, y * freq) * amp;
    amp *= 0.5;
    freq *= 2.1;
  }
  return sum;
};

const toRgb = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

/**
 * ページの背景。
 *
 * 参考にした andmade.jp も canvas で描いている。about は色の滲み、
 * contact は光の当たった立体の面。どちらも土台は同じで、
 * 陰影を付けるかどうかの差でしかない。
 *
 * ここでは値ノイズを 3 枚重ね、その結果でサンプル位置そのものを
 * ずらしている（ドメインワープ）。同心円状の滲みではなく、
 * 折り返しながら流れる波の形になるのはこのため。
 * さらにその高さの場から法線を求めて斜め上から光を当てている。
 * 稜線が光り、谷が沈むことで立体に見える。
 *
 * 高さは一度 Float32Array に貯めてから隣の値と比べて法線を出す。
 * 画素ごとにノイズを引き直すと 3 倍の計算量になる。
 *
 * 実際に描くのは 168x100 の 1 枚だけで、それを CSS で画面いっぱいに
 * 引き伸ばす。拡大時の補間とぼかしで滑らかになる。
 * ただしぼかしを強くしすぎると稜線ごと潰れて大きな染みに見えるので、
 * 解像度とぼかしは釣り合わせる必要がある。
 */
const PageBackground: React.FC<{ palette: Palette; contrast?: number }> = ({
  palette,
  contrast = 0.75,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = W;
    canvas.height = H;

    const ramp = palette.map(toRgb);
    const image = ctx.createImageData(W, H);
    const data = image.data;
    const height = new Float32Array(W * H);

    const draw = (t: number) => {
      // 高さの場を作る
      for (let py = 0; py < H; py += 1) {
        for (let px = 0; px < W; px += 1) {
          const x = (px / W) * 4.2;
          const y = (py / H) * 2.6;
          const wx = fbm(x + t * 0.055, y, 2);
          const wy = fbm(x + 5.2, y + t * 0.042, 2);
          height[py * W + px] = fbm(x + wx * 1.9, y + wy * 1.9, 3);
        }
      }

      // 法線を出して光を当てる
      for (let py = 0; py < H; py += 1) {
        for (let px = 0; px < W; px += 1) {
          const i = py * W + px;
          const n = height[i];

          const l = height[i - (px > 0 ? 1 : 0)];
          const r = height[i + (px < W - 1 ? 1 : 0)];
          const u = height[i - (py > 0 ? W : 0)];
          const d = height[i + (py < H - 1 ? W : 0)];

          // 斜め上（左上）からの光。稜線が光り、谷が沈む。
          // 影だけは浅くする。この面の上に本文が乗るので、
          // 暗く沈みすぎると文字が読みにくくなる。
          const raw = ((l - r) * 0.6 + (u - d) * 0.8) * 11 * contrast;
          const shade = raw > 0 ? raw : raw * 0.5;

          const pos = Math.min(0.9999, Math.max(0, (n - 0.15) / 0.7)) * (ramp.length - 1);
          const i0 = Math.floor(pos);
          const f = pos - i0;
          const c0 = ramp[i0];
          const c1 = ramp[Math.min(ramp.length - 1, i0 + 1)];

          // 端は紙の色へ抜く。色の面が矩形に見えないように
          const fade = Math.min(1, Math.max(0, (n - 0.26) * 2.6));

          const o = i * 4;
          for (let k = 0; k < 3; k += 1) {
            const mixed = c0[k] + (c1[k] - c0[k]) * f;
            const lit = mixed * (1 + shade);
            const v = PAPER[k] + (lit - PAPER[k]) * fade;
            data[o + k] = v < 0 ? 0 : v > 255 ? 255 : v;
          }
          data[o + 3] = 255;
        }
      }

      ctx.putImageData(image, 0, 0);
    };

    if (reduceMotion) {
      draw(0);
      return;
    }

    let frame = 0;
    let last = 0;
    let time = 0;
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      // 画面が見えていないあいだは進めない
      if (document.hidden) return;
      time += 0.06;
      draw(time);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [palette, contrast, reduceMotion]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          // 拡大時のぼけを利用する。画素の階段はぼかしで消える
          filter: 'blur(13px) saturate(1.06)',
          transform: 'scale(1.14)',
          // 下端は紙の色へ抜き、境目を作らずに本文へ渡す
          maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
        }}
      />

      {/* 粒子。のっぺりした面に紙のざらつきを足す */}
      <span className="absolute inset-0 page-grain" />
    </div>
  );
};

export default PageBackground;
