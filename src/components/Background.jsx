import { useEffect, useRef } from "preact/hooks";

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let then = Date.now();
    let hue = 0;

    const noise = () => {
      const noiseCanvas = document.createElement("canvas");
      noiseCanvas.width = 100;
      noiseCanvas.height = 100;
      const noiseCtx = noiseCanvas.getContext("2d");
      const imageData = noiseCtx.createImageData(100, 100);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 50;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 20;
      }
      noiseCtx.putImageData(imageData, 0, 0);
      return noiseCanvas;
    };

    const noisePattern = ctx.createPattern(noise(), "repeat");

    const render = () => {
      const now = Date.now();
      const delta = (now - then) / 1000;
      then = now;

      hue += delta * 10;

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, `hsl(${hue}, 50%, 20%)`);
      gradient.addColorStop(1, `hsl(${hue + 60}, 50%, 5%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = noisePattern;
      ctx.fillRect(0, 0, width, height);

      requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default Background;
