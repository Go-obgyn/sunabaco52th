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

  // Update stage by scrolling progress in hero section.
  function updateHeroStage() {
    const rect = hero.getBoundingClientRect();
    const totalScrollable = Math.max(rect.height - window.innerHeight, 1);
    const progress = clamp(-rect.top / totalScrollable, 0, 0.9999);
    const stageIndex = Math.min(2, Math.floor(progress * 3));
    setActiveStage(stageIndex);

    // Header readability after user moves away from top.
    header.classList.toggle('scrolled', window.scrollY > 16);
  }

  // Hide FAB while hero is in view, show after hero section.
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const heroVisible = entry.isIntersecting;
        fabWrap.classList.toggle('visible', !heroVisible);
      });
    },
    {
      threshold: 0.03,
    }
  );

  heroObserver.observe(hero);
  window.addEventListener('scroll', updateHeroStage, { passive: true });
  window.addEventListener('resize', updateHeroStage);
  updateHeroStage();
})();
