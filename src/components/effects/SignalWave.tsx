"use client";

import { useEffect, useRef } from "react";

type SignalWaveProps = {
  intensity?: number;
};

export default function SignalWave({ intensity = 0.25 }: SignalWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const render = (time: number) => {
      if (!context) return;
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);
      context.strokeStyle = "rgba(78, 205, 196, 0.18)";
      context.lineWidth = 1.2;

      for (let wave = 0; wave < 4; wave += 1) {
        context.beginPath();
        for (let x = 0; x <= width; x += 24) {
          const progress = (x / width) * Math.PI * 2;
          const offset = (time / 1400 + wave) * 0.7;
          const y =
            height * 0.3 +
            Math.sin(progress + offset) * height * 0.04 * intensity +
            wave * 26;
          context.lineTo(x, y);
        }
        context.stroke();
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-60"
      aria-hidden="true"
    />
  );
}
