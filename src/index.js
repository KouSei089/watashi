import React from 'react';
// 1. 'react-dom' ではなく 'react-dom/client' からインポート
import { createRoot } from 'react-dom/client';
import App from './App';
import "./css/index.css";

// 2. root 要素を取得
const container = document.getElementById('root');

// 3. createRoot を使用してレンダリング
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);