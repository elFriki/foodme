import Ember from 'ember';

const days = [
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday"
];

export function dayOfTheWeek(params, hash = {}) {
	let value = Array.isArray(params) ? params[0] : params;

	let dias = [];
	for ( let i = 0; i < value.length; i++ ) {
		dias.push(days[value[i]]);
	}
	return dias;
}


export default Ember.Helper.helper(dayOfTheWeek);

