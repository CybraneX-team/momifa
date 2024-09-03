"use client"
import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, useInView } from 'framer-motion';
import { fillLogic } from './filllogice';

function handleScroll(canvas) {
  let scrollTimeout;
  return () => {
    if (canvas) {
      canvas.style.pointerEvents = "none";
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (canvas) {
          canvas.style.pointerEvents = "auto";
        }
      }, 200);
    }
  };
}

const FloatingBox = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const mouseConstraintRef = useRef(null);
  const [rectangles, setRectangles] = useState([]);
  const [hasRectanglesFallen, setHasRectanglesFallen] = useState(false);

  const isInView = useInView(sceneRef, { once: false, amount: 0.5 });

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;
    const Events = Matter.Events;

    const engine = Engine.create();
    engineRef.current = engine;
    const runner = Runner.create();
    runnerRef.current = runner;

    const canvasHeight = 700;
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

    const canvas = render.canvas;
    if (canvas) {
      canvas.style.pointerEvents = 'auto';

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

      const topWall = Bodies.rectangle(0, 0, canvasWidth, 0, {
        isStatic: true,
        render: { fillStyle: 'red' },
      });

      World.add(engine.world, [ground, leftWall, rightWall, topWall]);

      const mouse = Mouse.create(canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.5,
          render: {
            visible: false,
          },
        },
      });

      mouseConstraintRef.current = mouseConstraint;
      World.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      Runner.run(runner, engine);
      Render.run(render);

      const texts = [
        'Premium Quality',
        'Classic Fit',
        'Iconic Styles',
        'Casual Chic',
        'Comfort Wear',
        'Soft Cotton',
        'Trendy Designs',
        'Everyday Essentials',
        'Wardrobe Staples!',
        'Luxury Polos!',
        'Signature Tees',
        'Timeless Look',
        'Smart Casual',
        'Modern Elegance',
        'Refined Casual',
        'Polished Look'
      ];

      if (isInView) {
        const isMobile = window.innerWidth <= 768; 
        const rectangleCount = isMobile ? 8 : 16; 
        const width = isMobile ? 130 : 150; 
        const height = 60; 
        const newRectangles = [];

        for (let i = 0; i < rectangleCount; i++) {
          let fillColor = fillLogic(i);

          const rectangle = Matter.Bodies.rectangle(
            Math.random() * (window.innerWidth - width),
            -100 - i * 50,
            width,
            height,
            {
              render: {
                fillStyle: fillColor,
              },
              chamfer: { radius: 30 },
              restitution: 0.3,
              friction: 0.1,
            }
          );
          newRectangles.push(rectangle);
        }

        Matter.World.add(engineRef.current.world, newRectangles);
        setRectangles(newRectangles);

        const profileImage = new Image();
        profileImage.src = '../../../media/peoples.png';

        Matter.Events.on(render, 'afterRender', () => {
          const ctx = render.context;
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          newRectangles.forEach((rectangle, index) => {
            const { x, y } = rectangle.position;
            const angle = rectangle.angle;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);

            ctx.fillStyle = rectangle.render.fillStyle === '#8330C2' ? 'white' : 'black';
            ctx.fillText(texts[index], 0, 0);
            ctx.restore();
          });
          ctx.font = '80px bolder josh';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          const textX = canvasWidth / 2;
          const textY = 20;
        
          ctx.fillText('Trusted by', textX, textY);
          ctx.fillText('10000+ Buyers', textX, textY + 70);
        });
      }

      const scrollHandler = handleScroll(canvas);
      canvas.addEventListener("wheel", scrollHandler);

      // Add touch event listeners for mobile devices
      canvas.addEventListener("touchstart", scrollHandler, { passive: true });
      canvas.addEventListener("touchmove", scrollHandler, { passive: true });

      const handleResize = () => {
        const parent = sceneRef.current?.parentElement;
        if (parent) {
          const newWidth = parent.clientWidth;
          const newHeight = parent.clientHeight;
          canvas.width = newWidth;
          canvas.height = newHeight;
          Matter.Body.setPosition(ground, Matter.Vector.create(newWidth / 2, newHeight));
          Matter.Body.setPosition(rightWall, Matter.Vector.create(newWidth, newHeight / 2));
          Matter.Body.setPosition(leftWall, Matter.Vector.create(0, newHeight / 2));
          Matter.Body.setPosition(topWall, Matter.Vector.create(0, 0));
        }
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        Render.stop(render);
        World.clear(engine.world);
        Engine.clear(engine);

        if (canvas) {
          canvas.remove();
        }

        canvas.style.pointerEvents = '';
        window.removeEventListener('resize', handleResize);

        if (mouseConstraintRef.current) {
          World.remove(engine.world, mouseConstraintRef.current);
          mouseConstraintRef.current = null;
        }

        if (canvas) {
          canvas.removeEventListener("wheel", scrollHandler);
          canvas.removeEventListener("touchstart", scrollHandler);
          canvas.removeEventListener("touchmove", scrollHandler);
        }
      };
    }
  }, [isInView]);

  useEffect(() => {
    let prevScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const scrollDiff = currentScrollY - prevScrollY;

      rectangles.forEach((rectangle) => {
        Matter.Body.translate(rectangle, { x: 0, y: scrollDiff * 0.1 });
      });

      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [rectangles]);

  useEffect(() => {
    const canvas = sceneRef.current?.querySelector('canvas');

    const handleInteractionStart = () => {
      if (canvas) {
        canvas.style.pointerEvents = 'auto';
        canvas.style.position = "relative"
        canvas.style.zIndex = "9999"
      }
    };

    const handleInteractionEnd = () => {
      if (canvas) {
        canvas.style.pointerEvents = 'none';
      }
    };

    const handleScrollStart = () => {
      if (canvas) {
        canvas.style.pointerEvents = 'none';
      }
    };

    window.addEventListener('mousedown', handleInteractionStart);
    window.addEventListener('mouseup', handleInteractionEnd);
    window.addEventListener('touchstart', handleInteractionStart);
    window.addEventListener('touchend', handleInteractionEnd);
    window.addEventListener('scroll', handleScrollStart);

    return () => {
      window.removeEventListener('mousedown', handleInteractionStart);
      window.removeEventListener('mouseup', handleInteractionEnd);
      window.removeEventListener('touchstart', handleInteractionStart);
      window.removeEventListener('touchend', handleInteractionEnd);
      window.removeEventListener('scroll', handleScrollStart);
    };
  }, []);

  return (
    <motion.div
      ref={sceneRef}
      style={{
        width: '100%',
        height: '100%',
        cursor: "grab",  
        zIndex: "9999",
        outline: "2px solid blue",
        position: 'relative',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1.5 }}
    />
  );
};
export default FloatingBox;
