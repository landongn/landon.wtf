<script lang="ts">
	import {
		Box3,
		Matrix4,
		PerspectiveCamera,
		Quaternion,
		Raycaster,
		Sphere,
		Spherical,
		Vector2,
		Vector3,
		Vector4
	} from 'three';

	const subsetOfTHREE = {
		Vector2: Vector2,
		Vector3: Vector3,
		Vector4: Vector4,
		Quaternion: Quaternion,
		Matrix4: Matrix4,
		Spherical: Spherical,
		Box3: Box3,
		Sphere: Sphere,
		Raycaster: Raycaster
	};

	import { useFrame, useThrelte, useThrelteUserContext, type ThrelteContext } from '@threlte/core';
	import CameraControls from 'camera-controls';

	CameraControls.install({ THREE: subsetOfTHREE });
	const { renderer } = useThrelte();
	export let camera: PerspectiveCamera;
	export const controls = new CameraControls(camera, renderer.domElement);

	const getCtx = () => {
		return controls;
	};

	useThrelteUserContext('camera-controls', getCtx);

	const rotationIndeg = -35.264;
	controls.moveTo(0, 10, 0, true);

	useFrame((ctx: ThrelteContext, delta: number) => {
		controls.update(delta);
	});
</script>
