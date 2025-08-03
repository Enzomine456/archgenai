let viewer = document.getElementById('viewer');
let scene, camera, renderer;

function initViewer() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, viewer.clientWidth / viewer.clientHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(viewer.clientWidth, viewer.clientHeight);
  viewer.innerHTML = "";
  viewer.appendChild(renderer.domElement);
  camera.position.z = 5;

  let light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(0, 20, 0);
  scene.add(light);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function loadModel(path) {
  initViewer();
  const loader = new THREE.GLTFLoader();
  loader.load(path, function(gltf) {
    scene.add(gltf.scene);
  }, undefined, function(error) {
    console.error("Erro ao carregar modelo:", error);
  });
}

document.getElementById('generateForm').onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch('/generate', { method: 'POST', body: formData });
  const data = await res.json();
  loadModel(data.model);
};

document.getElementById('sketchInput').onchange = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('sketch', file);
  const res = await fetch('/upload-sketch', { method: 'POST', body: formData });
  const data = await res.json();
  loadModel(data.model);
};
