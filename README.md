# SUNABA CAFE

SUNABA CAFE の静的 1 ページサイトです。HTML / CSS / Vanilla JavaScript だけで構成されていて、ビルドは不要です。

## 起動方法

repo ルートで次を実行します。

```bash
python -m http.server 8000
```

ブラウザで次を開きます。

- `http://127.0.0.1:8000/`
- `http://localhost:8000/`

## 確認観点

- Desktop: `1366px` 幅で hero の切り替え、header の `scrolled` 状態、FAB の表示を確認する
- Mobile: `375px` 幅で横スクロールが出ないこと、hero / menu / access / Instagram のレイアウトが崩れないことを確認する
- Keyboard: skip link が動作し、Instagram の準備中表示にフォーカスできないことを確認する
- Accessibility: hero では表示中のコピー 1 件だけが公開されることを確認する
- Motion: `prefers-reduced-motion` で過度なアニメーションが抑制されることを確認する

## ディレクトリの役割

- `images/`: ページ内で参照する画像アセット
- `output/playwright/`: ブラウザ確認で保存したスクリーンショット
- `.playwright-cli/`: Playwright CLI のログやスナップショット

## 運用メモ

- 電話番号は未確定のため、`tel:` リンクにはしない
- Instagram QR はダミー画像のままでよいが、外部アカウント URL は未設定
- Google Maps JavaScript API は使わず、埋め込み iframe と外部リンクで案内する
