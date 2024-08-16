"use client"

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, useInView } from 'framer-motion';

const FallingRectangles = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const isInView = useInView(sceneRef, { once: false, amount: 0.5 });
  const [rectangles, setRectangles] = useState([]);

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    engineRef.current = engine;
    const runner = Runner.create();

    const canvasHeight = 400;
    const canvasWidth = 1500;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    render.afterRender = () => {
      const ctx = render.context;
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      rectangles.forEach((rectangle, index) => {
        const { x, y } = rectangle.position;
        ctx.fillStyle = 'black';
        ctx.fillText(texts[index], x, y);
      });
    };

    // Adjust ground and wall positions
    const ground = Bodies.rectangle(
      canvasWidth / 2,
      canvasHeight,
      canvasWidth,
      50,
      { isStatic: true, render: { fillStyle: 'transparent' } }
    );

    const leftWall = Bodies.rectangle(
      0,
      canvasHeight / 2,
      50,
      canvasHeight,
      { isStatic: true, render: { fillStyle: 'transparent' } }
    );

    const rightWall = Bodies.rectangle(
      canvasWidth,
      canvasHeight / 2,
      50,
      canvasHeight,
      { isStatic: true, render: { fillStyle: 'transparent' } }
    );

    World.add(engine.world, [ground, leftWall, rightWall]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    render.canvas.addEventListener('mousedown', (e) => e.preventDefault());

    World.add(engine.world, mouseConstraint);

    render.mouse = mouse;

    Runner.run(runner, engine);
    Render.run(render);

    const handleResize = () => {
      const parent = sceneRef.current?.parentElement;
      if (parent) {
        const newWidth = parent.clientWidth;
        const newHeight = parent.clientHeight;
        render.canvas.width = newWidth;
        render.canvas.height = newHeight;
        Matter.Body.setPosition(ground, Matter.Vector.create(newWidth / 2, newHeight));
        Matter.Body.setPosition(rightWall, Matter.Vector.create(newWidth, newHeight / 2));
        Matter.Body.setPosition(leftWall, Matter.Vector.create(0, newHeight / 2));
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      Render.stop(render);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const texts = ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Express'];

  useEffect(() => {
    if (isInView && engineRef.current) {
      const rectangleCount = 8;
      const newRectangles = [];

      for (let i = 0; i < rectangleCount; i++) {
        const width = Math.min(120, window.innerWidth * 0.2); // Responsive width
        const height = 60;
        const rectangle = Matter.Bodies.rectangle(
          Math.random() * (window.innerWidth - width),
          -100 - (i * 50),
          width,
          height,
          {
            render: {
              fillStyle: '#ffeb3b',
            },
            restitution: 0.3,
            friction: 0.1,
          }
        );
        newRectangles.push(rectangle);
      }

      Matter.World.add(engineRef.current.world, newRectangles);
      setRectangles(newRectangles);
    } else if (!isInView && rectangles.length > 0) {
      Matter.World.remove(engineRef.current.world, rectangles);
      setRectangles([]);
    }
  }, [isInView]);

  return (
    <motion.div
    ref={sceneRef}
    style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}
    initial={{ opacity: 0 }}
    animate={{ opacity: isInView ? 1 : 0 }}
    transition={{ duration: 0.5 }}
  />
  );
};

export default FallingRectangles;