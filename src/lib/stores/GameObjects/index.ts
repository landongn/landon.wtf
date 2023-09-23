import { currentWritable, type CurrentWritable } from '@threlte/core';
import type { Group, Object3DEventMap } from 'three';

export const allGameObjects: CurrentWritable<Group<Object3DEventMap>[]> = currentWritable([]);
