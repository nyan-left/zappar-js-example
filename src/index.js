import * as Zappar from "@zappar/zappar";
import "./style.css";

const w = 600;
const h = 400;

const canvas = document.getElementById("canvas");
const pipeline = new Zappar.Pipeline();
const gl = canvas.getContext("webgl");
pipeline.glContextSet(gl);

const source = new Zappar.CameraSource(
  pipeline,
  Zappar.cameraDefaultDeviceID()
);

let started = false;

Zappar.permissionRequestUI().then((granted) => {
  if (granted) started = true;
  else Zappar.permissionDeniedUI();
});

const animate = () => {
  requestAnimationFrame(animate);

  if(!started) return;
  pipeline.processGL();

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  pipeline.frameUpdate();

  pipeline.cameraFrameUploadGL();

  pipeline.cameraFrameDrawGL(w, h); // <--- no effect
};

source.start();
animate();
