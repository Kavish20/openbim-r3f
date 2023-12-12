"use client";

import { Canvas, createRoot, events, extend } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import AppHome from "./_app";
import { A11y } from "@react-three/a11y";
import {
  CameraControls,
  OrbitControls,
  PerformanceMonitor,
} from "@react-three/drei";

extend(THREE);

export default function TestPage({ components }) {
  const [root, setRoot] = useState(null);

  useEffect(() => {
    const root = createRoot(document.querySelector("#container canvas"));

    root.configure({
      frameloop: "demand",
    });

    window.addEventListener("resize", () => {
      root.configure({
        size: { width: window.innerWidth, height: window.innerHeight },
      });
    });

    window.dispatchEvent(new Event("resize"));

    setRoot(root);
  }, []);

  root &&
    root.render(
      <>
        <ambientLight />
        <directionalLight color="white" position={[0, 0, 5]} />
        {/* <OrbitControls autoRotate autoRotateSpeed={4.0} zoomSpeed={5} /> */}
        {/* <CameraControls /> */}
        {/* <PerformanceMonitor
          onIncline={() =>
            document.querySelector("canvas").setAttribute("dpr", 2)
          }
          onDecline={() =>
            document.querySelector("canvas").setAttribute("dpr", 1)
          }
        /> */}
        {/* <A11y
          role="togglebutton"
          actionCall={() =>
            (document.getElementById("test").innerHTML = "chal gaya finally")
          }
        > */}
        <AppHome components={components} />
        {/* </A11y> */}
      </>
    );
}
