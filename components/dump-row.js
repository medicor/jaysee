/* global Vue */
Vue.component('dump-row', {
	template: `
		<tr v-show="show">
			<td>
				<button v-if="!isLeaf()" @click="toggle">
					<i class="material-icons">{{ open ? "expand_less" : "expand_more" }}</i>
				</button>
				<span v-html="model[0]"></span>
			</td>
			<td v-if="isLeaf()" class="cell-leaf">
				<span v-html="model[1]"></span>
			</td>
			<td v-else>
				<div class="table-child" :class="{ expanded: open }">
					<dump-table :model="model[1]">
						<dump-row v-for="child in model[1]" :model="child"></dump-row>
					</dump-table>
				</div>
			</td>
		</tr>
		`,
	props: {
		model: Array
	},
	data() {
		return {
			open: false,
			show: true
		};
	},
	methods: {
		toggle() {
			this.open = !this.open;
		},
		isLeaf() {
			return Object.prototype.toString.call(this.model[1]) !== '[object Array]';
		}
	}
});

