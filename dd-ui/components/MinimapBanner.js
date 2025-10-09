(function () {
  function init() {
    const canvas = document.querySelector('.minimap canvas');
    if (!canvas || canvas.dataset.bound === 'true') return;
    canvas.dataset.bound = 'true';
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    ctx.fillStyle = '#1a1f2b';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#3EA5E3';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, 160);
    ctx.lineTo(80, 120);
    ctx.lineTo(140, 150);
    ctx.lineTo(200, 90);
    ctx.stroke();

    ctx.fillStyle = '#4BA36D';
    ctx.beginPath();
    ctx.arc(160, 60, 28, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#C8A24A';
    ctx.font = '16px Cinzel, serif';
    ctx.fillText('Stormwatch', 60, 40);
  }

  document.addEventListener('dd:hydrate', init);
  document.addEventListener('DOMContentLoaded', init);
})();
