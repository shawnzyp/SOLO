(function () {
  document.querySelectorAll('.button-demo .btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.setAttribute('data-animate', 'press');
      window.setTimeout(() => btn.removeAttribute('data-animate'), 200);
    });
  });
})();
