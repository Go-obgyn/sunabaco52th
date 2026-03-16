// Lightweight behavior for hero stage transitions and FAB visibility.
(() => {
  const hero = document.querySelector('#hero');
  const stageImages = Array.from(document.querySelectorAll('[data-stage-image]'));
  const stageTexts = Array.from(document.querySelectorAll('[data-stage-text]'));
  const fabWrap = document.querySelector('#fab-wrap');
  const header = document.querySelector('.site-header');

  if (!hero || stageImages.length !== 3 || stageTexts.length !== 3 || !fabWrap || !header) {
    return;
  }

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function setActiveStage(stageIndex) {
    stageImages.forEach((item, index) => {
      item.classList.toggle('is-active', index === stageIndex);
    });
    stageTexts.forEach((item, index) => {
      item.classList.toggle('is-active', index === stageIndex);
    });
  }

  // Update stage by scrolling progress in hero section and toggle utility UI.
  function updateByScroll() {
    const rect = hero.getBoundingClientRect();
    const totalScrollable = Math.max(rect.height - window.innerHeight, 1);
    const progress = clamp(-rect.top / totalScrollable, 0, 0.9999);
    const stageIndex = Math.min(2, Math.floor(progress * 3));
    setActiveStage(stageIndex);

    // Header readability after user moves away from top.
    header.classList.toggle('scrolled', window.scrollY > 16);

    // FAB appears shortly after passing one viewport worth of scrolling.
    fabWrap.classList.toggle('visible', window.scrollY > window.innerHeight * 0.95);
  }

  window.addEventListener('scroll', updateByScroll, { passive: true });
  window.addEventListener('resize', updateByScroll);
  updateByScroll();
})();
