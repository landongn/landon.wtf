import { LogLevels, createConsola } from 'consola';

const trace = createConsola({
	formatOptions: {
		date: true,
		colors: true,
		compact: false
	},
	fancy: true,
	defaults: {
		level: LogLevels.verbose
	}
});
trace.wrapAll();

trace.box('what the fuck, landon??');

export default trace;
