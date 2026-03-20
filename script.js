// Lightweight behavior for hero stage transitions and FAB visibility.
(() => {
  const hero = document.querySelector('#hero');
  const stageImages = Array.from(document.querySelectorAll('[data-stage-image]'));
  const stageTexts = Array.from(document.querySelectorAll('[data-stage-text]'));
  const fabWrap = document.querySelector('#fab-wrap');
  const header = document.querySelector('.site-header');
  const stageCount = Math.min(stageImages.length, stageTexts.length);
  const hasHeroStages = Boolean(hero) && stageCount > 0 && stageImages.length === stageTexts.length;

  if (!hasHeroStages && !fabWrap && !header) {
    return;
  }

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function setActiveStage(stageIndex) {
    if (!hasHeroStages) {
      return;
    }

    stageImages.forEach((item, index) => {
      item.classList.toggle('is-active', index === stageIndex);
    });
    stageTexts.forEach((item, index) => {
      const isActive = index === stageIndex;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-hidden', String(!isActive));
    });
  }

  // Update stage by scrolling progress in hero section and toggle utility UI.
  function updateByScroll() {
    if (hasHeroStages) {
      const rect = hero.getBoundingClientRect();
      const totalScrollable = Math.max(rect.height - window.innerHeight, 1);
      const progress = clamp(-rect.top / totalScrollable, 0, 0.9999);
      const stageIndex = Math.min(stageCount - 1, Math.floor(progress * stageCount));
      setActiveStage(stageIndex);
    }

    // Header readability after user moves away from top.
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 16);
    }

    // FAB appears shortly after passing one viewport worth of scrolling.
    if (fabWrap) {
      fabWrap.classList.toggle('visible', window.scrollY > window.innerHeight * 0.9);
    }
  }

  window.addEventListener('scroll', updateByScroll, { passive: true });
  window.addEventListener('resize', updateByScroll);
  updateByScroll();
})();
