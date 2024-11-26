// コンテナ要素とスライド要素を取得
const wrapper = document.querySelector(".js-wrapper");
const slides = document.querySelector(".js-scroll");
const textContent = document.querySelector(".text-cotent");

// テキストコンテンツの実際の幅を計算（要素の全体幅）
const textWidth = textContent.scrollWidth;
// ビューポートの幅を取得
const viewportWidth = window.innerWidth;

// 横スクロールアニメーションの設定
gsap.to(slides, {
  x: -(textWidth - viewportWidth) / 1.5,
  ease: "none",
  scrollTrigger: {
    trigger: wrapper,
    pin: true,
    scrub: 1,
    start: "top top",
    end: "+=100%",
    anticipatePin: 1,
    invalidateOnRefresh: true,
    markers: true,
    // リサイズ時の再計算
    onRefresh: () => {
      const newTextWidth = textContent.offsetWidth;
      const newViewportWidth = window.innerWidth;
      const newScrollEndPosition = newTextWidth - newViewportWidth;
      self.end = `+=${newScrollEndPosition}`;
    },
  },
});
