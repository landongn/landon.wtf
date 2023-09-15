import { currentWritable, type CurrentWritable } from '@threlte/core';

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

export interface EditorRuntimeState {
	visible: boolean;
	state: [];
	max_history: 100;
}
export const EditorState: CurrentWritable<EditorRuntimeState> = currentWritable({
	visible: true,
	state: [],
	max_history: 100
});
