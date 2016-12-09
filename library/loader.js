!(self => {
	let head = document.getElementsByTagName('head')[0];

	self.loaded = aURL => {
        let ok = false;
        let us = aURL.toLowerCase();

        let sa = [].map.call(
                document.scripts,
                x => x.src
            )
            .concat(
             [].map.call(
                document.styleSheets,
                x => x.href
            )
        );

        sa.forEach(st => {
			if (st && st.toLowerCase().includes(us)) {
				ok = true;
			}
		});
        return ok;
    },

	self.inject = (aResourceList, aReadyCallback) => {
		let ls = aResourceList.length;

		function load(aURL, aLoadedCallback) {
			let rn;

			if (self.loaded(aURL)) {
				aLoadedCallback();
				return;
			}
			if (aURL.indexOf('.css') > 0 || aURL.indexOf('fonts.googleapis.com') > 0) {
				rn = document.createElement('link');
				rn.href = aURL;
				rn.rel  = 'stylesheet';
				rn.type = 'text/css';
			} else { // Assume JavaScript (.js, .ashx).
				rn = document.createElement('script');
				rn.src = aURL;
				rn.async = true;
				rn.defer = true;
			}
			rn.onload = aLoadedCallback;
			head.appendChild(rn);
		}
		aResourceList.forEach(rc => {
			load(rc, () => {
				if (--ls === 0) {
					aReadyCallback();
				}
			});
		});
	};

})(window.Loader = {});
