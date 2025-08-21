import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const SpiralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const resizeObserver = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      onResize();
    });
    resizeObserver.observe(canvas);

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      // Background gradient
      const grd = ctx.createLinearGradient(0, 0, w, h);
      grd.addColorStop(0, 'rgba(0,62,128,0.10)');
      grd.addColorStop(1, 'rgba(255,94,0,0.10)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // Spiral lines
      ctx.lineWidth = 1.25;
      for (let i = 0; i < 180; i++) {
        const angle = 0.12 * i + t * 0.015;
        const radius = 0.75 * i;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const nx = cx + Math.cos(angle + 0.25) * (radius + 6);
        const ny = cy + Math.sin(angle + 0.25) * (radius + 6);

        const alpha = Math.min(1, i / 180);
        ctx.strokeStyle = `rgba(0, 102, 204, ${0.08 + alpha * 0.12})`; // brand-blue-ish
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
      }

      // Orbiting dots
      for (let j = 0; j < 14; j++) {
        const a = t * 0.02 + (Math.PI * 2 * j) / 14;
        const r = Math.min(w, h) * 0.28 + Math.sin(t * 0.01 + j) * 10;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        ctx.fillStyle = 'rgba(255, 140, 0, 0.25)'; // brand-orange-ish
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      t++;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/60 to-white/20" />
    </div>
  );
};

const Login: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-white">
      <SpiralBackground />
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          <div className="mb-6 text-center">
            <img src="/uploads/chemifex-logo.png" alt="CHEMIFLEX" className="h-12 mx-auto" />
            <h1 className="mt-3 text-2xl font-bold text-brand-blue">Welcome back</h1>
            <p className="text-gray-600 text-sm">Sign in to manage products, inventory, and customers.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue/60"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue/60"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center bg-brand-blue hover:brightness-110 text-white font-semibold px-4 py-2.5 rounded-lg"
            >
              Sign In
            </button>
            <div className="flex items-center justify-between text-sm">
              <Link to="/" className="text-brand-blue hover:underline">Back to home</Link>
              <a href="#" className="text-gray-600 hover:underline">Forgot password?</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
