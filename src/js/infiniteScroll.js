export function setInfiniteScroll(onScrollLoadding) {
  const observerOptions = { rootMargin: '100px', treshold: 1.0 };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onScrollLoadding();
      }
    });
  }, observerOptions);

  observer.observe(document.querySelector('.scroll-guard'));
}
