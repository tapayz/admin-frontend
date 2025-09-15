"use client";
import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

type Props = { className?: string };

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  graphics: PIXI.Graphics;
}

function PaymentBg({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // PIXI Application 생성
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x000000,
      backgroundAlpha: 0,
      antialias: true,
    });

    appRef.current = app;
    containerRef.current.appendChild(app.view as any);

    // 보라색 계열 색상
    const nodeColor = 0x8b68d1;

    // 30개의 노드 생성
    const nodes: Node[] = Array.from({ length: 30 }, () => {
      const graphics = new PIXI.Graphics();
      graphics.beginFill(nodeColor);
      graphics.drawCircle(0, 0, 5);
      graphics.endFill();

      const node: Node = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        graphics,
      };

      graphics.x = node.x;
      graphics.y = node.y;
      app.stage.addChild(graphics);

      return node;
    });

    nodesRef.current = nodes;

    // 라인 그래픽스들 생성
    const lineGraphics: PIXI.Graphics[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      const lineGraphic = new PIXI.Graphics();
      lineGraphic.alpha = 0.5;
      app.stage.addChild(lineGraphic);
      lineGraphics.push(lineGraphic);
    }

    // 애니메이션 함수
    const animate = () => {
      // 노드 위치 업데이트
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // 화면 경계에서 반사
        if (node.x < 0 || node.x > window.innerWidth) node.vx *= -1;
        if (node.y < 0 || node.y > window.innerHeight) node.vy *= -1;

        // 그래픽 위치 업데이트
        node.graphics.x = node.x;
        node.graphics.y = node.y;
      });

      // 라인 다시 그리기
      lineGraphics.forEach((lineGraphic, i) => {
        const startNode = nodes[i];
        const endNode = nodes[i + 1];

        lineGraphic.clear();
        lineGraphic.lineStyle(1, nodeColor, 0.5);
        lineGraphic.moveTo(startNode.x, startNode.y);
        lineGraphic.lineTo(endNode.x, endNode.y);
      });
    };

    // Ticker에 애니메이션 함수 추가
    app.ticker.add(animate);

    // 화면 리사이즈 핸들러
    const handleResize = () => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 클린업 함수
    return () => {
      window.removeEventListener("resize", handleResize);
      app.ticker.remove(animate);
      app.destroy(true);
      if (containerRef.current && app.view) {
        containerRef.current.removeChild(app.view as any);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-screen h-screen absolute ${className || ""}`}
    />
  );
}

export default PaymentBg;
