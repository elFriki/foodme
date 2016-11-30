import Ember from 'ember';

export default Ember.Route.extend({
	 locale(){
	 	console.log(Ember.$.getLocale());
        return Ember.$.getLocale();
    }
});
