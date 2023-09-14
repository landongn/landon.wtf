import { currentWritable } from '@threlte/core';

export const SceneList = currentWritable({});
export const RendererState = currentWritable({
	cameraCreated: false,
	spaceLoaded: false,
	screenBounds: {
		width: 0,
		height: 0
	}
});

export const GameObjects = currentWritable([]);
