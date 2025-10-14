"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const TOTAL_IMAGES = 17;
const COOLDOWN_MS = 2000;
const ACTIVE_TILES_DESKTOP = 8;
const ACTIVE_TILES_MOBILE = 4;

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

function buildTile(i: number, src: string, isLeft: boolean) {
  const widthVW = rand(12, 18);
  const heightVW = rand(9, 13);
  const offsetVW = rand(5, 15);
  const topVH = rand(8, 12);
  const rotate = rand(-10, 10);
  const duration = rand(8, 14);
  const delay = rand(0, 6);
  const sway = rand(-10, 10);
  const z = Math.floor(rand(1, 5));

  return {
    id: `tile-${i}-${src}`,
    src,
    isLeft,
    offsetVW,
    topVH,
    widthVW,
    heightVW,
    rotate,
    z,
    duration,
    delay,
    sway,
    lastSwap: Date.now(),
  };
}

function pickNextImage(currentSrc: string) {
  const idx = parseInt(currentSrc.match(/\d+/)?.[0] || "0", 10);
  let next = idx;
  while (next === idx) next = Math.ceil(rand(1, TOTAL_IMAGES));
  return `/photos/${next}.jpeg`;
}

export default function Hero() {
  const [tiles, setTiles] = useState<any[]>([]);
  const [activeTiles, setActiveTiles] = useState(ACTIVE_TILES_DESKTOP);
  const centerRef = useRef<HTMLDivElement>(null);
  const [safe, setSafe] = useState({ min: 38, max: 62 });
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const updateTiles = () => {
      setActiveTiles(window.innerWidth < 768 ? ACTIVE_TILES_MOBILE : ACTIVE_TILES_DESKTOP);
    };
    updateTiles();
    window.addEventListener("resize", updateTiles);
    return () => window.removeEventListener("resize", updateTiles);
  }, []);

  useEffect(() => {
    const el = document.getElementById("hero-root");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      const el = centerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const min = (rect.left / vw) * 100 - 2;
      const max = (rect.right / vw) * 100 + 2;
      setSafe({ min, max });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const arr: any[] = [];
    for (let i = 0; i < activeTiles; i++) {
      const isLeft = i < activeTiles / 2;
      const src = `/photos/${Math.ceil(rand(1, TOTAL_IMAGES))}.jpeg`;
      arr.push(buildTile(i, src, isLeft));
    }
    setTiles(arr);
  }, [activeTiles]);

  function handleAnimationIteration(idx: number) {
    setTiles((prev) =>
      prev.map((t, i) => {
        if (i !== idx) return t;
        const now = Date.now();
        if (now - t.lastSwap < COOLDOWN_MS) return t;
        const nextSrc = pickNextImage(t.src);
        const base = buildTile(i, nextSrc, t.isLeft);
        return { ...t, ...base, src: nextSrc, lastSwap: now , animationKey: `${nextSrc}-${now}`,};
      })
    );
  }

  return (
    <section
      id="hero-root"
      className="relative flex items-center justify-center h-[100svh] overflow-hidden bg-gradient-to-b from-[#06091a] via-[#221f42] to-[#183769]"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[60vh] w-[60vw] rounded-full bg-black/25 blur-3xl" />
      </div>

      {inView && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {tiles
            .filter((t) => {
              const leftEdgeVW = t.isLeft ? t.offsetVW : 100 - t.offsetVW - t.widthVW;
              const rightEdgeVW = leftEdgeVW + t.widthVW;
              return rightEdgeVW < safe.min || leftEdgeVW > safe.max;
            })
            .map((t, idx) => {
              const style: React.CSSProperties & Record<string, string | number> = {
                top: `${t.topVH}vh`,
                ...(t.isLeft ? { left: `${t.offsetVW}vw` } : { right: `${t.offsetVW}vw` }),
                width: `${t.widthVW}vw`,
                height: `${t.heightVW}vw`,
                transform: `rotate(${t.rotate}deg) translateX(${t.sway}px)`,
                zIndex: t.z,
                animationDuration: `${t.duration}s`,
                animationDelay: `${t.delay}s`,
              };

              return (
                <div
                  key={t.animationKey || t.id}
                  className="absolute animate-fall-through rounded-[2rem] overflow-hidden shadow-2xl"
                  style={style}
                  onAnimationIteration={() => handleAnimationIteration(idx)}
                >
                  <div className="tile relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl">
                    <Image
                      src={t.src}
                      alt=""
                      fill
                      priority={idx < 2}
                      className="object-contain rounded-[2rem]"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-b from-black/0 via-black/0 to-black/10" />
                  </div>
                </div>
              );
            })}
        </div>
      )}

      <div ref={centerRef} className="relative z-10 text-center px-6 pt-16">
        <h1 className="text-6xl font-extrabold tracking-tight text-white leading-tight">
          Know <span className="text-blue-300">who</span> spoke —<br /> instantly.
        </h1>
        <p className="mt-4 text-white/80 text-lg max-w-md mx-auto">
          Identify speakers across meetings, lectures, and calls — automatically.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <a className="px-5 py-3 rounded-md bg-white text-black font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-transparent">
            Start free
          </a>
          <a className="px-5 py-3 rounded-md border border-white/60 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-transparent">
            Learn more
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm animate-pulse">
        Scroll
      </div>
    </section>
  );
}
