/* global Vue */
Vue.component('dump-table', {
	template: `
		<table class="mdl-data-table mdl-js-data-table">
			<thead v-if="this.$parent.$parent">
				<tr>
					<th @click="sort(0)" :class="getSortClass(0)">Key</th>
					<th @click="sort(1)" :class="getSortClass(1)">Value</th>
				</tr>
			</thead>
			<tbody>
				<slot></slot>
			</tbody>
		</table>
		`,
	props: {
		model: Array
	},
	data() {
		return {
			sortMap: {}, // Current sort order of table (key=0/value=1, ascending=true/descending=false/original=null).
			original: this.model && this.model.slice() // Copy used for restoring unsorted model.
		};
	},
	methods: {
		sort(aColumn) {
			Vue.set(this.sortMap,  aColumn, this.sortMap[aColumn] === true ? false : (this.sortMap[aColumn] === false ? null : true)); // Toggle true-false-null.
			Vue.set(this.sortMap, (aColumn + 1) % 2, null); // Set other column to "unsorted".
			if (this.sortMap[aColumn] === null) {
				// Circumvention since it is invalid to mutate an entire property (ie. `this.model = this.original`).
				Array.prototype.splice.apply(this.model, [0,this.model.length].concat(this.original));
				this.model.splice(this.model.length); // To get Vue to react.
			} else {
				this.model.sort((a, b) => this.sortMap[aColumn] // = ascending
                    ? a[aColumn].toLocaleString().localeCompare(b[aColumn].toLocaleString())
                    : b[aColumn].toLocaleString().localeCompare(a[aColumn].toLocaleString()));
			}
		},
		getSortClass(aColumn) {
			let sc = 'mdl-data-table__cell--non-numeric ';

			switch(this.sortMap[aColumn]) {
				case true:
					sc += 'mdl-data-table__header--sorted-ascending';
					break;
				case false:
					sc += 'mdl-data-table__header--sorted-descending';
					break;
			}
			return sc;
		}
	}
});
