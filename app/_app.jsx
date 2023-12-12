"use client";

import { useThree } from "@react-three/fiber";
import * as OBC from "openbim-components";
import { useEffect, useState } from "react";

const AppHome = ({ components }) => {
  const [model, setModel] = useState(null);
  const set = useThree((state) => state.set);

  useEffect(() => {
    set({
      gl: components.renderer._renderer,
      camera: components.camera._perspectiveCamera,
      scene: components.scene._scene,
      raycaster: components.raycaster._raycaster,
    });
    let fragmentIfcLoader = new OBC.FragmentIfcLoader(components);

    fragmentIfcLoader.settings.wasm = {
      path: "https://unpkg.com/web-ifc@0.0.46/",
      absolute: true,
    };

    const scene = components.scene.get();

    async function loadIfcAsFragments() {
      const file = await fetch("Clinic_Architectural.ifc");
      const data = await file.arrayBuffer();
      const buffer = new Uint8Array(data);
      const model = await fragmentIfcLoader.load(buffer, "example");
      scene.add(model);

      setModel(model);

      // const classifier = new OBC.FragmentClassifier(components);
      // classifier.byStorey(model);
      // classifier.byEntity(model);

      // const modelTree = new OBC.FragmentTree(components);
      // await modelTree.init();
      // modelTree.update(["storeys", "entities"]);

      // const classifier = new OBC.FragmentClassifier(components);
      // classifier.byStorey(model);
      // const exploder = new OBC.FragmentExploder(components);
      // exploder.explode();
    }

    loadIfcAsFragments();
  }, []);

  return model && <primitive object={model} />;
};

export default AppHome;
