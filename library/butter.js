!(self => {

	self.objectToArray = o => {
		if (typeof o !== 'object') {
			return [['value'],[o]];
		}
		return Object.keys(o).map(k => typeof o[k] === 'object'
            ? [k, o[k] && self.objectToArray(o[k])] // Don't recurse on null or undefined.
            : typeof o[k] === 'function'
                ? [k, o[k].toString()] // Some formatting would be nice.
                : [k, o[k]]);
	};

	self.objectToArrayWithReparse = o => {
		if (typeof o !== 'object') {
			return [['value'],[o]];
		}
		return Object.keys(o).map(k => {
			let co = /^\s*\{.+\}\s*$/.test(o[k]) ? eval(`(${o[k]})`) : o[k]; // Using eval instead of JSON.parse to be less strict in parsing.

			return typeof co === 'object'
				? [k, co && self.objectToArray(co)] // Don't recurse on null or undefined.
				: typeof co === 'function'
					? [k, co.toString()] // Some formatting would be nice.
					: [k, co];
		});
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

})(window.Butter = {});
