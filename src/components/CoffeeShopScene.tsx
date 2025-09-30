'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const CoffeeShopScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x614032);
    sceneRef.current = scene;

    const aspectRatio = window.innerWidth / window.innerHeight;
    const cameraWidth = 150;
    const cameraHeight = cameraWidth / aspectRatio;

    const camera = new THREE.OrthographicCamera(
      cameraWidth / -2,
      cameraWidth / 2,
      cameraHeight / 2,
      cameraHeight / -2,
      0,
      1000
    );
    camera.position.set(200, 200, 200);
    camera.lookAt(0, 10, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Import OrbitControls dynamically
    import('three/examples/jsm/controls/OrbitControls.js').then((module) => {
      const { OrbitControls } = module;
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

      // Ambient light
      const ambientLight = new THREE.AmbientLight(0x404040, 1);
      ambientLight.position.set(0, 0, 0);
      scene.add(ambientLight);

      camera.position.z = 5;

      // Create room function
      function createRoom() {
        const room = new THREE.Group();

        const loader = new THREE.TextureLoader();
        const floorTexture = loader.load('https://i.imgur.com/xxUIbgv.jpg');
        const windowTexture = loader.load('https://i.imgur.com/oUgNt36.png');

        const groundGeometry = new THREE.BoxGeometry(50, 50, 2);
        const groundMaterial = new THREE.MeshStandardMaterial({
          roughness: 0.7,
          metalness: 0.3,
        });
        groundMaterial.map = floorTexture;
        groundMaterial.receiveShadow = true;
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.position.set(0, -5, 0);
        ground.rotation.x = Math.PI / 2;
        room.add(ground);

        const wallMaterial = new THREE.MeshStandardMaterial({
          roughness: 0.8,
          metalness: 0.3,
        });

        wallMaterial.color = new THREE.Color(0x2b2002);
        wallMaterial.receiveShadow = true;
        const wall1 = new THREE.Mesh(groundGeometry, wallMaterial);
        wall1.rotation.y = -Math.PI / 2;
        wall1.position.y = 21;
        wall1.position.x = -24;
        room.add(wall1);

        const wall2 = new THREE.Mesh(groundGeometry, wallMaterial);
        wall2.position.y = 21;
        wall2.position.z = -24;
        room.add(wall2);

        const geometry2 = new THREE.BoxGeometry(25, 15, 0.2);
        const material2 = new THREE.MeshStandardMaterial({
          map: windowTexture
        });
        const window = new THREE.Mesh(geometry2, material2);
        window.position.set(5, 18, -22.5);
        room.add(window);

        const rectLight = new THREE.RectAreaLight(0xffffff, 50, 10, 15);
        rectLight.position.set(8, -5, -15.5);
        rectLight.lookAt(0, 0, 0);
        scene.add(rectLight);

        const geometry3 = new THREE.BoxGeometry(28, 1, 5);
        const material3 = new THREE.MeshStandardMaterial();
        material3.color = new THREE.Color(0xa38658);
        material3.metalness = 0.8;
        material3.roughness = 0.2;
        const windowBottom = new THREE.Mesh(geometry3, material3);
        windowBottom.position.set(5, 10, -21);
        windowBottom.receiveShadow = true;
        room.add(windowBottom);

        // Fairy lights functions
        function createFairyLights1() {
          const fairyLights = new THREE.Group();
          const lightColor = 0xed8c74;
          const lightIntensity = 20;
          const numLights = 23;
          let z = -20;
          const y = [45, 44, 43, 42, 41, 40, 40, 40, 41, 42, 43, 44, 45, 45, 44, 43, 42, 41, 40, 40, 40, 41, 42, 43, 44, 45];
          let x = -22.5;

          for (let i = 0; i < numLights; i++) {
            const fairyLight = new THREE.Group();

            const light = new THREE.PointLight(lightColor, lightIntensity, 8, 2);
            light.power = 800;
            fairyLight.add(light);

            const glowingMaterial = new THREE.MeshStandardMaterial({
              color: lightColor,
              emissive: lightColor,
              emissiveIntensity: 5,
            });

            const glowingBulb = new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 32), glowingMaterial);
            fairyLight.add(glowingBulb);

            fairyLight.position.set(x, y[i], z);
            z += 2;
            fairyLights.add(fairyLight);
          }

          return fairyLights;
        }

        function createFairyLights2() {
          const fairyLights = new THREE.Group();
          const lightColor = 0xed8c74;
          const lightIntensity = 20;
          const numLights = 25;
          let x = -24;
          const y = [45, 44, 43, 42, 41, 40, 40, 40, 41, 42, 43, 44, 45, 45, 44, 43, 42, 41, 40, 40, 40, 41, 42, 43, 44, 45];
          let z = -22.5;

          for (let i = 0; i < numLights; i++) {
            const fairyLight = new THREE.Group();

            const light = new THREE.PointLight(lightColor, lightIntensity, 8, 2);
            light.power = 800;
            fairyLight.add(light);

            const glowingMaterial = new THREE.MeshStandardMaterial({
              color: lightColor,
              emissive: lightColor,
              emissiveIntensity: 5,
            });

            const glowingBulb = new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 32), glowingMaterial);
            fairyLight.add(glowingBulb);

            fairyLight.position.set(x, y[i], z);
            x += 2;
            fairyLights.add(fairyLight);
          }

          return fairyLights;
        }

        const fairyLights1 = createFairyLights1();
        room.add(fairyLights1);

        const fairyLights2 = createFairyLights2();
        room.add(fairyLights2);

        // Counter function
        function createCounter() {
          const counter = new THREE.Group();

          const geometry1 = new THREE.BoxGeometry(8, 10, 25);
          const material1 = new THREE.MeshStandardMaterial({
            color: 0xdc936d,
            metalness: 0.6,
            roughness: 0.5
          });
          const table = new THREE.Mesh(geometry1, material1);
          table.position.set(-10, 0, 12);
          table.castShadow = true;
          counter.add(table);

          const material2 = new THREE.MeshStandardMaterial({
            color: 0x7a5646,
            metalness: 0.6,
            roughness: 0.5
          });

          const handle1 = new THREE.Mesh(new THREE.BoxGeometry(8, 2, 2), material2);
          handle1.position.set(-10, 6.75, 24);
          counter.add(handle1);

          const handle2 = new THREE.Mesh(new THREE.BoxGeometry(8, 2, 2), material2);
          handle2.position.set(-10, 6.75, 0);
          counter.add(handle2);

          const handle3 = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 25), material2);
          handle3.position.set(-6.5, 6.75, 12);
          counter.add(handle3);

          const length = 6, width = 4;

          const shape = new THREE.Shape();
          shape.moveTo(0, 0);
          shape.lineTo(0, width);
          shape.lineTo(length, width);
          shape.lineTo(length, 0);
          shape.lineTo(0, 0);

          const extrudeSettings = {
            steps: 1,
            depth: 0.4,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 5,
            bevelOffset: -4,
            bevelSegments: 4
          };

          const geometry2 = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          const material3 = new THREE.MeshStandardMaterial({
            color: 0x302d2b,
            metalness: 0.6,
            roughness: 0.4
          });
          const monitor = new THREE.Mesh(geometry2, material3);
          monitor.position.set(-11, 7.5, 21);
          monitor.rotation.y = Math.PI / 2;
          counter.add(monitor);

          const monitorStand = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 3), material3);
          monitorStand.position.set(-10, 6.75, 18);
          counter.add(monitorStand);

          const screen = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 6), new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 5,
            metalness: 0.6,
            roughness: 0.5
          }));
          screen.position.set(-11.55, 9.5, 18);
          counter.add(screen);

          const screenLight = new THREE.PointLight(0xffffff, 1, 50, 0);
          screenLight.position.set(-12, 10, 18);
          counter.add(screenLight);

          return counter;
        }

        const counter = createCounter();
        room.add(counter);

        // Light function
        function createLight() {
          const light = new THREE.Group();

          const geometry1 = new THREE.CylinderGeometry(2, 1.75, 2.5);
          const base = new THREE.Mesh(geometry1, wallMaterial);
          base.position.set(-23, 35, 0);
          base.rotation.z = Math.PI / 2;
          light.add(base);

          const geometry2 = new THREE.SphereGeometry(1);
          const material1 = new THREE.MeshStandardMaterial({
            color: 0Xffffff,
            emissive: 0Xffffff,
            emissiveIntensity: 5,
          });
          const bulb = new THREE.Mesh(geometry2, material1);
          bulb.position.set(-21.5, 35, 0);
          light.add(bulb);

          const bulbLight = new THREE.PointLight(0Xffffff, 30, 8, 2);
          bulbLight.power = 800;
          bulbLight.position.set(-21.5, 35, 0);
          light.add(bulbLight);

          return light;
        }

        const light1 = createLight();
        room.add(light1);

        const light2 = createLight();
        light2.position.set(0, 0, 0);
        light2.rotation.y = -Math.PI / 2;
        room.add(light2);

        // Bottle function
        function createBottle() {
          const bottle = new THREE.Group();

          const geometry1 = new THREE.CylinderGeometry(1, 1, 4);
          const material1 = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.8,
            roughness: 0.6
          });
          const main = new THREE.Mesh(geometry1, material1);
          bottle.add(main);

          const geometry2 = new THREE.CylinderGeometry(0.2, 1, 1.5);
          const top = new THREE.Mesh(geometry2, material1);
          top.position.y = 2.75;
          bottle.add(top);

          const geometry3 = new THREE.CylinderGeometry(0.3, 0.3, 0.5);
          const material2 = new THREE.MeshStandardMaterial({
            color: 0x00000,
            metalness: 1,
            roughness: 0.3
          });
          const cap = new THREE.Mesh(geometry3, material2);
          cap.position.y = 3.5;
          bottle.add(cap);

          return bottle;
        }

        // Cup function
        function createCup() {
          const cup = new THREE.Group();

          const geometry1 = new THREE.CylinderGeometry(1, 1, 2, 32, 1, true);
          const material1 = new THREE.MeshStandardMaterial({
            color: 0xfc8b72,
            metalness: 0.6,
            roughness: 0.5
          });
          material1.side = THREE.DoubleSide;
          const main = new THREE.Mesh(geometry1, material1);
          cup.add(main);

          return cup;
        }

        // Shelves function
        function createShelves() {
          const shelves = new THREE.Group();

          const geometry1 = new THREE.BoxGeometry(4, 1, 15);
          const material1 = new THREE.MeshStandardMaterial({
            color: 0x564945,
            metalness: 0.6,
            roughness: 0.4
          });

          const shelf1 = new THREE.Mesh(geometry1, material1);
          shelf1.position.set(-21, 33, -17);
          shelves.add(shelf1);

          const shelf2 = new THREE.Mesh(geometry1, material1);
          shelf2.position.set(-21, 27, -17);
          shelves.add(shelf2);

          const bottle1 = createBottle();
          bottle1.position.set(-21, 35, -18);
          shelves.add(bottle1);

          const bottle2 = createBottle();
          bottle2.position.set(-21, 35, -21);
          shelves.add(bottle2);

          const cup1 = createCup();
          cup1.position.set(-21, 34.5, -15);
          shelves.add(cup1);

          const cup2 = createCup();
          cup2.position.set(-21, 34.5, -12);
          shelves.add(cup2);

          const cup3 = createCup();
          cup3.position.set(-21, 28.5, -21);
          shelves.add(cup3);

          const cup4 = createCup();
          cup4.position.set(-21, 28.5, -18);
          shelves.add(cup4);

          const cup5 = createCup();
          cup5.position.set(-21, 28.5, -15);
          shelves.add(cup5);

          const cup6 = createCup();
          cup6.position.set(-21, 28.5, -12);
          shelves.add(cup6);

          return shelves;
        }

        const shelves = createShelves();
        room.add(shelves);

        // Coffee table function
        function createCoffeeTable() {
          const table = new THREE.Group();

          const geometry1 = new THREE.CylinderGeometry(6, 6, 1);
          const material1 = new THREE.MeshStandardMaterial({
            color: 0x564945,
            metalness: 0.6,
            roughness: 0.4
          });
          const top = new THREE.Mesh(geometry1, material1);
          table.add(top);

          const geometry2 = new THREE.CylinderGeometry(1, 1, 9);
          const leg = new THREE.Mesh(geometry2, material1);
          leg.position.set(0, -6, 0);
          table.add(leg);

          const geometry3 = new THREE.CylinderGeometry(2, 2, 1);
          const base1 = new THREE.Mesh(geometry3, material1);
          base1.position.set(0, -9, 0);
          table.add(base1);

          const geometry4 = new THREE.CylinderGeometry(3, 3, 1);
          const base2 = new THREE.Mesh(geometry4, material1);
          base2.position.set(0, -10, 0);
          table.add(base2);

          return table;
        }

        const table1 = createCoffeeTable();
        table1.position.set(10, 7, 15);
        room.add(table1);

        // Chair function
        function createChair() {
          const chair = new THREE.Group();

          const geometry1 = new THREE.CylinderGeometry(3, 3.5, 1.5, 4);
          const material1 = new THREE.MeshStandardMaterial({
            color: 0x564945,
            metalness: 0.8,
            roughness: 0.6
          });
          const seat = new THREE.Mesh(geometry1, material1);
          chair.add(seat);

          const geometry2 = new THREE.CylinderGeometry(0.5, 1.25, 9, 4);
          const material2 = new THREE.MeshStandardMaterial({
            color: 0xfcc6a8,
            metalness: 0.5,
            roughness: 0.6
          });

          const leg1 = new THREE.Mesh(geometry2, material2);
          leg1.position.set(0, -5, 1.75);
          chair.add(leg1);

          const leg2 = new THREE.Mesh(geometry2, material2);
          leg2.position.set(0, -5, -1.75);
          chair.add(leg2);

          const leg3 = new THREE.Mesh(geometry2, material2);
          leg3.position.set(-1.75, -5, 0);
          chair.add(leg3);

          const leg4 = new THREE.Mesh(geometry2, material2);
          leg4.position.set(1.75, -5, 0);
          chair.add(leg4);

          chair.rotation.y = Math.PI / 4;

          return chair;
        }

        const chair1 = createChair();
        chair1.position.set(0, 5, 15);
        room.add(chair1);

        const chair2 = createChair();
        chair2.position.set(20, 5, 15);
        room.add(chair2);

        const chair3 = createChair();
        chair3.position.set(10, 5, 5);
        room.add(chair3);

        const table2 = createCoffeeTable();
        table2.position.set(-10, 7, -10);
        room.add(table2);

        const chair4 = createChair();
        chair4.position.set(-20, 5, -10);
        room.add(chair4);

        const chair5 = createChair();
        chair5.position.set(0, 5, -10);
        room.add(chair5);

        const longChair1 = createChair();
        longChair1.scale.set(1.2, 1.5, 1.2);
        longChair1.position.set(13, 9, -15);
        room.add(longChair1);

        const longChair2 = createChair();
        longChair2.scale.set(1.2, 1.5, 1.2);
        longChair2.position.set(20, 9, -15);
        room.add(longChair2);

        const bottle1 = createBottle();
        bottle1.position.set(10, 10, 15);
        room.add(bottle1);

        const cup1 = createCup();
        cup1.position.set(12, 9, 15);
        room.add(cup1);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight.position.set(20, 0, -20);
        directionalLight.target = fairyLights2;
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        return room;
      }

      const room = createRoom();
      room.scale.set(0.7, 0.7, 0.7);
      room.position.y = -20;
      room.rotation.y = Math.PI / 4;
      scene.add(room);

      // Animation loop
      function animate() {
        animationRef.current = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }

      animate();

      // Handle window resize
      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    });

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div 
        className="w-full h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #614032 0%, #8B4513 100%)' }}
      >
        <div className="text-white text-xl">Loading 3D Scene...</div>
      </div>
    );
  }

  return (
    <div 
      ref={mountRef} 
      className="w-full h-screen"
      style={{ background: 'linear-gradient(135deg, #614032 0%, #8B4513 100%)' }}
    />
  );
};

export default CoffeeShopScene;
