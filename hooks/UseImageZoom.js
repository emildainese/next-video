import { useState, useEffect } from 'react';

// No !
export const useImageZoom = (imgRef) => {
  let scale = 1;
  const [panning, setPanning] = useState(false);
  const [pointX, setPointX] = useState(0);
  const [pointY, setPointY] = useState(0);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const setTransform = () => {
    imgRef.current.style.transform =
      'translate(' + pointX + 'px, ' + pointY + 'px) scale(' + scale + ')';
  };

  imgRef.current.onmousedown = (e) => {
    e.preventDefault();
    setStart({ x: e.clientX - pointX, y: e.clientY - pointY });
    setPanning(true);
  };

  imgRef.current.onmouseup = (e) => {
    setPanning(false);
  };

  imgRef.current.onmousemove = (e) => {
    e.preventDefault();
    if (!panning) {
      return;
    }
    setPointX(e.clientX - start.x);
    setPointY(e.clientY - start.y);
    setTransform();
  };

  imgRef.current.onwheel = (e) => {
    e.preventDefault();
    const xs = (e.clientX - pointX) / scale;
    const ys = (e.clientY - pointY) / scale;
    const delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
    delta > 0 ? (scale *= 1.2) : (scale /= 1.2);
    setPointX(e.clientX - xs * scale);
    setPointY(e.clientY - ys * scale);
    setTransform();
  };
};
