// スランブル文字
const characters = 'qwertyuiop@[asdfghjkl;:]zxcvbnm,./_';
const scrambleElements = document.querySelectorAll('.scramble-text');
const maxIterations = 10;

// スクラブル文字のアニメーション関数
// (element, finalText, iteration)　→ (スクランブルしたい文字が書かれている場所, 最終的に表示したい文字, 何回目の変更かを数える数字)
function scrambleText(element, finalText, iteration) {
  // iteration / maxIterations → 全体の進行状況(0〜1)
  const progress = Math.min(iteration / maxIterations, 1);
  const text = finalText
    .split('')
    .map((char, index) => {
      // index / finalText.length → 各文字の相対的な位置
      if (progress > index / finalText.length) {
        return char;
      }
      return characters[Math.floor(Math.random() * characters.length)];
    })
    .join('');

  element.innerText = text;

  if (iteration < maxIterations) {
    setTimeout(() => scrambleText(element, finalText, iteration + 1), 60);
  }
}

//スクロールに応じてスランブルテキストが発火する
scrambleElements.forEach((element) => {
  const finalText = element.dataset.finalText;

  gsap.set(element, {
    autoAlpha: 0,
  });

  gsap
    .timeline({
      scrollTrigger: {
        // 現在の要素に最も近い '.title-wrap' 要素を選択的に取得
        trigger: element.closest('.title-wrap'),
        start: 'top bottom',
        // markers: true,
        onEnter: () => {
          scrambleText(element, finalText, 0);
        },
      },
    })
    .to(element, {
      autoAlpha: 1,
      duration: 0.5,
    });
});

// ホバーした時、1回のみスクランブルアニメーションが発火する
scrambleElements.forEach((element) => {
  element.addEventListener('mouseover', () => {
    let isAnimating = false;
    // isAnimatingがfalseのときにのみ実行
    if (!isAnimating) {
      isAnimating = true;
      const finalText = element.dataset.finalText;
      scrambleText(element, finalText, 0);
    }
  });
});
