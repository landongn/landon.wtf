<script>
	import { SceneGraphObject, useFrame, useThrelte, useThrelteUserContext } from '@threlte/core';
	import {
		BufferAttribute,
		BufferGeometry,
		DoubleSide,
		Mesh,
		MeshPhongMaterial,
		PointLight,
		Vector3
	} from 'three';

	const g_buffer = new BufferGeometry();

	const CELL_SIZE = 10;
	const waveHeight = 15;
	const waveSpeed = 0.5;
	// @ts-ignore
	const zoom = 0.7;

	const material = new MeshPhongMaterial({
		color: '#f0f0f0',
		shininess: 64,
		flatShading: true,
		side: DoubleSide
	});

	// @ts-ignore
	function rn(start, end) {
		if (start == null) start = 0;
		if (end == null) end = 1;
		return start + Math.random() * (end - start);
	}

	// @ts-ignore
	function ri(start, end) {
		if (start == null) start = 0;
		if (end == null) end = 1;
		return Math.floor(start + Math.random() * (end - start + 1));
	}

	// @ts-ignore
	const sample = (items) => items[Math.floor(Math.random() * items.length)];

	let gg = [];
	let ww = 100;
	let hh = 80;
	let waveNoise = 4;

	let j = 0,
		i = 0;
	// Add vertices
	gg = [];
	const points = [];
	for (i = 0; i <= ww; i++) {
		gg[i] = [];
		for (j = 0; j <= hh; j++) {
			const id = points.length;
			const newVertex = new Vector3(
				(i - ww * 0.5) * CELL_SIZE,
				rn(0, waveNoise) - 10,
				(hh * 0.5 - j) * CELL_SIZE
			);
			points.push(newVertex);
			// @ts-ignore
			gg[i][j] = id;
		}
	}
	g_buffer.setFromPoints(points);

	// Add faces
	// a b
	// c d <-- Looking from the bottom right point
	const indices = [];
	for (i = 1; i <= ww; i++) {
		for (j = 1; j <= hh; j++) {
			let face1, face2;
			// @ts-ignore
			const d = gg[i][j];
			// @ts-ignore
			const b = gg[i][j - 1];
			// @ts-ignore
			const c = gg[i - 1][j];
			// @ts-ignore
			const a = gg[i - 1][j - 1];
			if (ri(0, 1)) {
				face1 = [a, b, c];
				face2 = [b, c, d];
			} else {
				face1 = [a, b, d];
				face2 = [a, c, d];
			}
			indices.push(...face1, ...face2);
		}
	}
	g_buffer.setIndex(indices);
	const positionBuffer = new Float32Array([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
	const g_bufferPos = new BufferAttribute(positionBuffer, 3);

	g_buffer.setAttribute('position', g_bufferPos);
	const planeMesh = new Mesh(g_buffer, material);
	planeMesh.position.set(0, 0, 0);
	let i_pointLight = new PointLight(0xffffff, 0.9);

	// @ts-ignore
	const { camera } = useThrelte();
	const controls = useThrelteUserContext('camera-controls');
	// @ts-ignore
	useFrame((ctx, deltaTime) => {
		const oy = {};
		for (let i = 0; i < planeMesh.geometry.attributes.position.array.length; i += 3) {
			const v = {
				x: planeMesh.geometry.attributes.position.array[i],
				y: planeMesh.geometry.attributes.position.array[i + 1],
				z: planeMesh.geometry.attributes.position.array[i + 2],
				// @ts-ignore
				oy: oy[i]
			};
			if (!v.oy) {
				// INIT
				// @ts-ignore
				oy[i] = v.y;
			} else {
				const s = waveSpeed;
				const crossChop = Math.sqrt(s) * Math.cos(-v.x - v.z * 0.7); // + s * (i % 229) / 229 * 5
				const delta = Math.sin(
					s * deltaTime * 0.02 - s * v.x * 0.025 + s * v.z * 0.015 + crossChop
				);
				const trochoidDelta = Math.pow(delta + 1, 2) / 4;
				v.y = v.oy + trochoidDelta * waveHeight;
				planeMesh.geometry.attributes.position.array[i + 1] = v.y;
			}
		}
		planeMesh.geometry.computeVertexNormals();
		planeMesh.geometry.attributes.position.needsUpdate = true;
	});
</script>

<SceneGraphObject object={planeMesh} />
<SceneGraphObject object={i_pointLight} />
