import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';

const PhysikSektion = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        // Matter.js Setup
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;

        const engine = Engine.create();
        engineRef.current = engine;
        const world = engine.world;

        const width = sceneRef.current.clientWidth;
        const height = 400;

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
                background: 'transparent',
                pixelRatio: window.devicePixelRatio,
            }
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Boden & Wände
        const ground = Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, render: { visible: false } });
        const leftWall = Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, render: { visible: false } });
        const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, render: { visible: false } });

        Composite.add(world, [ground, leftWall, rightWall]);

        // Bausteine-Daten
        const bausteine = [
            { text: "PKV", color: "#0253ee" },
            { text: "Dienstunfähigkeit", color: "#020A39" },
            { text: "Beihilfe", color: "#0B154D" },
            { text: "Haftpflicht", color: "#FFBE36" },
            { text: "Vorsorge", color: "#0476D8" },
            { text: "Anwartschaft", color: "#0253ee" },
            { text: "Ehrlichkeit", color: "#020A39" },
            { text: "Unabhängigkeit", color: "#0B154D" }
        ];

        // Erstelle physische Objekte für die Texte
        const bodies = bausteine.map((b, i) => {
            const x = Math.random() * (width - 100) + 50;
            const y = -100 - (i * 50);

            return Bodies.rectangle(x, y, 160, 50, {
                chamfer: { radius: 15 },
                restitution: 0.6,
                friction: 0.1,
                render: {
                    fillStyle: b.color,
                    strokeStyle: '#ffffff20',
                    lineWidth: 2,
                },
                label: b.text
            });
        });

        Composite.add(world, bodies);

        // Maus-Interaktion
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        Composite.add(world, mouseConstraint);
        render.mouse = mouse;

        // Custom Rendering für die Texte auf den Bodies
        Matter.Events.on(render, 'afterRender', () => {
            const context = render.context;
            context.font = "bold 14px Inter, sans-serif";
            context.textAlign = "center";
            context.textBaseline = "middle";

            bodies.forEach((body, i) => {
                const { x, y } = body.position;
                const angle = body.angle;

                context.save();
                context.translate(x, y);
                context.rotate(angle);
                // Kontrast-Farbe bestimmen
                context.fillStyle = bausteine[i].text === "Haftpflicht" ? "#020A39" : "#ffffff";
                context.fillText(bausteine[i].text, 0, 0);
                context.restore();
            });
        });

        // Cleanup
        return () => {
            Render.stop(render);
            Engine.clear(engine);
            render.canvas.remove();
            render.textures = {};
        };
    }, []);

    return (
        <section className="py-20 bg-hintergrund-alt relative overflow-hidden border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
                    <div>
                        <span className="text-marke-primaer text-sm font-bold tracking-widest uppercase mb-3 block">Sicherheit zum Greifen</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-text-haupt leading-tight">
                            Deine Absicherung ist<br />
                            <span className="text-marke-primaer">kein Zufallsprodukt</span>
                        </h2>
                        <p className="text-text-neben text-lg font-light mb-8 max-w-xl">
                            Wir setzen deine Versicherungsbausteine so zusammen, dass sie ein stabiles Fundament bilden. Probiere es aus: Du kannst die Elemente rechts einfach mit der Maus bewegen und neu ordnen!
                        </p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 text-xs font-bold text-text-neben"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Interaktive Physik-Simulation aktiviert
                        </motion.div>
                    </div>

                    <div className="relative group">
                        <div
                            ref={sceneRef}
                            className="w-full h-[400px] bg-white/50 backdrop-blur-sm rounded-[2rem] border-2 border-dashed border-gray-200 cursor-grab active:cursor-grabbing overflow-hidden shadow-inner"
                        />
                        {/* Overlay Anleitung */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
                            <div className="bg-marke-sekundaer/90 text-white px-6 py-3 rounded-full text-sm font-bold backdrop-blur-md">
                                Maus nutzen zum Bewegen ☝️
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PhysikSektion;
