const observerOptions = { rootMargin: '200px', treshold: 1.0 };

export const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onloadMoreBtnClick();
    }
  });
}, observerOptions);
