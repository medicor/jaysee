// class KV extends Array {
// 	constructor(...a) {
// 		super(...a);
// 	}
// }

!(self => {

	self.objectToArray = (o) => {
//		let x = /^\s*\{.+\}\s*$/.test(o[k]) ? eval(`(${o[k]})`) : o[k]; // Using eval instead of JSON.parse to be less strict in parsing.
		if (typeof o !== 'object') {
			return [['value'],[o]];
		}
		return Object.keys(o).map(k => typeof o[k] === 'object'
			? [k, o[k] && self.objectToArray(o[k])] // Don't recurse on null or undefined.
			: typeof o[k] === 'function'
				? [k, o[k].toString()] // Some formatting would be nice.
				: [k, o[k]]
		);
	};

	self.objectToKeyValue = (o) => {
		if (typeof o !== 'object') {
			return { 'k': 'value', 'v': o };
		}
		return Object.keys(o).map(k => typeof o[k] === 'object'
			? { 'k': k, 'children': o[k] && self.objectToKeyValue(o[k]) } // Don't recurse on null or undefined.
			: typeof o[k] === 'function'
				? { 'k': k, 'v': o[k].toString() } // Some formatting would be nice.
				: { 'k': k, 'v': o[k] }
		);
	};

	self.queryToObject =
		s => s && s.slice(1).split('&').reduce((pv, cv) =>
			Object.assign(pv, cv.split('=').reduce((a, b) =>
				Object.defineProperty({}, a, {
					value: b,
					enumerable: true
				})
			))
		,{});

	self.debounce = (f,c) => {
		let t = null;

		return () => {
			clearTimeout(t);
			t = setTimeout(() => f.apply(c || this), 300);
		};
	};

})(window.Butter = {});
