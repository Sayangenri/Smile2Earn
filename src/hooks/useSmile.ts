import * as faceapi from "face-api.js";

let loaded = false;

export async function loadModels() {
  if (loaded) return;

  await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  await faceapi.nets.faceExpressionNet.loadFromUri("/models");

  loaded = true;
}

export async function detectHappy(video: HTMLVideoElement) {
  const result = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions();

  if (!result) return null;

  return result.expressions.happy > 0.7;
}
