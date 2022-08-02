import { useTheme } from '@/context/ThemeContext';
import { useRef, useEffect } from 'react';

const BackgroundCanvas = ({ top, left, height, width }) => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw(ctx);
    };
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = width ?? window.innerWidth;
    canvas.height = height ?? window.innerHeight;
    ctx.shadowColor = theme.primary;
    ctx.shadowBlur = 15;
    canvas.style.backgroundColor = theme.background;
    canvas.style.transition = 'background-color 0.3s';
    draw(ctx);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: top ? top : 0,
        left: left ? left : 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    ></canvas>
  );
};

export default BackgroundCanvas;

const createTriangle = (ctx, pos, sidelen) => {
  ctx.beginPath();
  ctx.moveTo(...pos);
  ctx.fillStyle = 'blueviolet';
  ctx.lineTo(pos[0] + sidelen / 2, pos[1] - sidelen * Math.sin(Math.PI / 3));
  ctx.lineTo(pos[0] + sidelen, pos[1]);
  ctx.lineTo(...pos);
  ctx.closePath();
  ctx.fill();
};

const createSierpinskiTriangle = (ctx, pos, sidelen, depth) => {
  const innerTriangleSidelen = sidelen / 2;
  const innerTrianglesPositions = [
    pos,
    [pos[0] + innerTriangleSidelen, pos[1]],
    [
      pos[0] + innerTriangleSidelen / 2,
      pos[1] - Math.sin(Math.PI / 3) * innerTriangleSidelen,
    ],
  ];

  if (depth == 0) {
    innerTrianglesPositions.forEach((trianglePosition) => {
      createTriangle(ctx, trianglePosition, innerTriangleSidelen);
    });
  } else {
    innerTrianglesPositions.forEach((trianglePosition) => {
      createSierpinskiTriangle(
        ctx,
        trianglePosition,
        innerTriangleSidelen,
        depth - 1
      );
    });
  }
};

const draw = (ctx) => {
  const x0 = 0;
  const y0 = window.innerHeight - 10;
  const side = window.innerWidth / 2;
  const iter = 6;
  createSierpinskiTriangle(ctx, [x0, y0], side, iter);
  createSierpinskiTriangle(ctx, [x0 + side, y0], side, iter);
  createSierpinskiTriangle(
    ctx,
    [x0 + side - side / 4, y0 - side / 2 + 40],
    side / 2,
    iter
  );
};
