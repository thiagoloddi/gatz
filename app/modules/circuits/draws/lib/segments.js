export default (canvas, segments) => {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();

  segments.forEach(({ s, e }) => {
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(e.x, e.y);
  });

  ctx.stroke();
}