"use client";

import { Stats } from "@react-three/drei";
import * as OBC from "openbim-components";
import { useEffect, useState } from "react";
import TestPage from "./_test";
import * as THREE from "three";

export default function Home() {
  const [components, setComponents] = useState(null);
  useEffect(() => {
    const container = document.getElementById("container");
    const components = new OBC.Components();
    components.scene = new OBC.SimpleScene(components);
    components.renderer = new OBC.PostproductionRenderer(components, container);
    components.camera = new OBC.SimpleCamera(components);
    components.raycaster = new OBC.SimpleRaycaster(components);
    components.uiEnabled = false;
    components.init();
    const grid = new OBC.SimpleGrid(components);
    components.scene.setup();

    const fragments = new OBC.FragmentManager(components);
    const highlighter = new OBC.FragmentHighlighter(components, fragments);
    highlighter.update();
    components.renderer.postproduction.enabled = true;
    components.renderer.postproduction.customEffects.outlineEnabled = true;
    highlighter.outlineEnabled = true;
    highlighter.zoomToSelection = true;

    const highlightMaterial = new THREE.MeshBasicMaterial({
      color: "#BCF124",
      opacity: 0.8,
      transparent: false,
      depthTest: false,
    });
    highlighter.add("default", highlightMaterial);
    highlighter.outlineMaterial.color.set(0xf0ff7a);

    const scene = components.scene.get();

    async function highlightOnClick(event) {
      await highlighter.highlight("default", true);
    }
    container.addEventListener("click", (event) => highlightOnClick(event));

    // let fragmentIfcLoader = new OBC.FragmentIfcLoader(components);

    // fragmentIfcLoader.settings.wasm = {
    //   path: "https://unpkg.com/web-ifc@0.0.46/",
    //   absolute: true,
    // };

    // const scene = components.scene.get();

    // async function loadIfcAsFragments() {
    //   const file = await fetch("Clinic_Architectural.ifc");
    //   const data = await file.arrayBuffer();
    //   const buffer = new Uint8Array(data);
    //   const model = await fragmentIfcLoader.load(buffer, "example");
    //   scene.add(model);
    // }
    // loadIfcAsFragments();

    setComponents(components);
  }, []);
  return (
    <div id="container" style={{ height: "100vh" }}>
      {components && <TestPage components={components} />}

      <Stats showPanel={0} className="stats" />

      <span
        id="test"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "red",
          color: "white",
          padding: "10px",
        }}
      >
        Hello world
      </span>
    </div>
  );
}
