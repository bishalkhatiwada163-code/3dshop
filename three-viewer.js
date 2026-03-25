// ================================================
// THREE.JS 3D VIEWER
// ================================================

class MotorcycleViewer {
  constructor(containerId) {
    this.containerElement = document.getElementById(containerId);
    if (!this.containerElement) return;

    this.initScene();
    this.initLights();
    this.addDefaultModel();
    this.setupControls();
    this.animate();
  }

  initScene() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a283f);

    // Camera
    const width = this.containerElement.clientWidth;
    const height = this.containerElement.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(3, 2, 5);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    this.containerElement.appendChild(this.renderer.domElement);

    // Adjust on resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  initLights() {
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    // Main Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    // Fill Light
    const pointLight = new THREE.PointLight(0x00d4ff, 0.5);
    pointLight.position.set(-5, 3, 5);
    this.scene.add(pointLight);
  }

  setupControls() {
    const OrbitControlsCtor = THREE.OrbitControls || window.OrbitControls;
    if (typeof OrbitControlsCtor !== 'function') {
      console.warn('OrbitControls not available; continuing without camera controls.');
      this.controls = {
        update: () => {}
      };
      return;
    }

    this.controls = new OrbitControlsCtor(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 3;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
  }

  addDefaultModel() {
    // Create a default motorcycle shape using geometries
    const group = new THREE.Group();

    // Body
    const bodyGeom = new THREE.BoxGeometry(3, 1, 1);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xff0066,
      metalness: 0.7,
      roughness: 0.2
    });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.castShadow = true;
    group.add(body);

    // Wheels
    const wheelGeom = new THREE.CylinderGeometry(0.8, 0.8, 0.4, 32);
    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x333333,
      metalness: 0.9,
      roughness: 0.3
    });

    const wheel1 = new THREE.Mesh(wheelGeom, wheelMat);
    wheel1.rotation.z = Math.PI / 2;
    wheel1.position.set(-1.2, -0.5, 0);
    wheel1.castShadow = true;
    group.add(wheel1);

    const wheel2 = new THREE.Mesh(wheelGeom, wheelMat);
    wheel2.rotation.z = Math.PI / 2;
    wheel2.position.set(1.2, -0.5, 0);
    wheel2.castShadow = true;
    group.add(wheel2);

    // Seat
    const seatGeom = new THREE.BoxGeometry(1.5, 0.3, 0.8);
    const seatMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.4,
      roughness: 0.6
    });
    const seat = new THREE.Mesh(seatGeom, seatMat);
    seat.position.set(0, 0.8, 0);
    seat.castShadow = true;
    group.add(seat);

    // Handlebars
    const handlebarGeom = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 16);
    const handlebarMat = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.8,
      roughness: 0.2
    });
    const handlebar = new THREE.Mesh(handlebarGeom, handlebarMat);
    handlebar.position.set(0, 1.5, 0);
    handlebar.castShadow = true;
    group.add(handlebar);

    this.scene.add(group);
    this.currentModel = group;
  }

  loadModel(modelUrl) {
    if (!modelUrl || modelUrl === '/models/default-bike.glb') {
      return;
    }

    const GLTFLoaderCtor = THREE.GLTFLoader || window.GLTFLoader;
    if (typeof GLTFLoaderCtor !== 'function') {
      console.warn('GLTFLoader not available; keeping default model.');
      return;
    }

    const loader = new GLTFLoaderCtor();
    loader.load(
      modelUrl,
      (gltf) => {
        // Remove old model
        if (this.currentModel && this.currentModel !== this.scene.children[0]) {
          this.scene.remove(this.currentModel);
        }

        // Add new model
        this.currentModel = gltf.scene;
        this.scene.add(this.currentModel);

        // Center and scale model
        const box = new THREE.Box3().setFromObject(this.currentModel);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim;
        this.currentModel.scale.multiplyScalar(scale);

        const center = box.getCenter(new THREE.Vector3());
        this.currentModel.position.x += -center.x * scale;
        this.currentModel.position.y += -center.y * scale;
        this.currentModel.position.z += -center.z * scale;
      },
      (progress) => {
        console.log(`Loading: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize = () => {
    const width = this.containerElement.clientWidth;
    const height = this.containerElement.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('heroCanvas')) {
    window.heroViewer = new MotorcycleViewer('heroCanvas');
  }
});
