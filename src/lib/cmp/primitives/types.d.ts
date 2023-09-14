import type { Quaternion, Vector3 } from 'three';

export interface GameObject {
	// position of the object in 3d space.
	position: Vector3;

	// rotation in Euler or Quaternion types
	rotation: Euler | Quaternion;

	// scale in Vector3
	scale: Vector3;

	// UUID/GUID of the component instance
	id: string;

	// friendly name of the component
	name: string;

	// tagging elements for render layers and quick recall by threlte
	tags: string[];
}
