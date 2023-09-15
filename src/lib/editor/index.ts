import { ClassicPreset, NodeEditor, type GetSchemes } from 'rete';
import { AreaExtensions, AreaPlugin } from 'rete-area-plugin';
import { ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin';
import { Presets, SveltePlugin, type SvelteArea2D } from 'rete-svelte-plugin';

import CustomConnectionComponent from './CustomConnection.svelte';
import CustomNodeComponent from './CustomNode.svelte';
import CustomSocketComponent from './CustomSocket.svelte';
import { addCustomBackground } from './custom-background';

type Schemes = GetSchemes<
	ClassicPreset.Node,
	ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = SvelteArea2D<Schemes>;

export async function createEditor(container: HTMLElement) {
	const socket = new ClassicPreset.Socket('socket');

	const editor = new NodeEditor<Schemes>();
	const area = new AreaPlugin<Schemes, AreaExtra>(container);
	const connection = new ConnectionPlugin<Schemes, AreaExtra>();
	const render = new SveltePlugin<Schemes, AreaExtra>();

	AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
		accumulating: AreaExtensions.accumulateOnCtrl()
	});

	render.addPreset(
		Presets.classic.setup({
			customize: {
				node() {
					return CustomNodeComponent;
				},
				connection() {
					return CustomConnectionComponent;
				},
				socket() {
					return CustomSocketComponent;
				}
			}
		})
	);

	connection.addPreset(ConnectionPresets.classic.setup());

	addCustomBackground(area);

	editor.use(area);
	area.use(connection);
	area.use(render);

	AreaExtensions.simpleNodesOrder(area);

	const aLabel = 'Custom';
	const bLabel = 'Custom';

	const a = new ClassicPreset.Node(aLabel);
	a.addOutput('a', new ClassicPreset.Output(socket));
	a.addInput('a', new ClassicPreset.Input(socket));
	await editor.addNode(a);

	const b = new ClassicPreset.Node(bLabel);
	b.addOutput('a', new ClassicPreset.Output(socket));
	b.addInput('a', new ClassicPreset.Input(socket));
	await editor.addNode(b);

	await area.translate(a.id, { x: 0, y: 0 });
	await area.translate(b.id, { x: 300, y: 0 });

	await editor.addConnection(new ClassicPreset.Connection(a, 'a', b, 'a'));

	setTimeout(() => {
		// wait until nodes rendered because they dont have predefined width and height
		AreaExtensions.zoomAt(area, editor.getNodes());
	}, 10);
	return {
		destroy: () => area.destroy()
	};
}
