import Ember from 'ember';

export default Ember.Component.extend({

	isMenuOpened: false,

	dropdownOpen: false,

	i18n: Ember.inject.service(),

	locale: Ember.computed.alias('i18n.locale'),

	actions: {

		changeLocale(param) {
			this.get('i18n').set('locale', param);
	        this.toggleProperty('dropdownOpen');
		},

		toggleMenu(){
			this.toggleProperty('isMenuOpened');
		},

	    toggleDropdown() {
	        this.toggleProperty('dropdownOpen');
    	}

	}

});
