// ランダムな0から255の整数を生成する関数
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ランダムなカラーコードを生成する関数
export function getRandomColorCode() {
  const r = getRandomInt(0, 255);
  const g = getRandomInt(0, 255);
  const b = getRandomInt(0, 255);

  const colorCode = "#" + r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0");

  return colorCode;
}

export function isValidColorCode(input: string) {
  // 正しいカラーコードの正規表現
  const colorCodeRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  return colorCodeRegex.test(input);
}
