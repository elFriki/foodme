import Ember from 'ember';
//import config from '../config/environment';

export default Ember.Controller.extend({

	appName: 'appName',

	i18n: Ember.inject.service(),

	locale: Ember.computed.alias('i18n.locale'),

	menuLinks: [
		{ label: 'restaurants', url: 'restaurants' },
		{ label: 'about', url: 'about' },
		{ label: 'contact', url: 'contact' }
	],

	languages: [
		{ name: 'ES', code: 'es', flagUrl: 'http://www.ember-power-select.com/flags/es.svg' },
		{ name: 'UK', code: 'en', flagUrl: 'http://www.ember-power-select.com/flags/gb.svg' },
		{ name: 'US', code: 'us', flagUrl: 'http://www.ember-power-select.com/flags/us.svg' },
		{ name: 'PT', code: 'pt', flagUrl: 'http://www.ember-power-select.com/flags/pt.svg' }
	],

	selectedLanguage: Ember.computed('languages', 'locale',
		function(){
			return this.languages.findBy('code', this.get('locale'));
	}),

/*
	locale: function() {
		return this.get('i18n').get('locale');
	}.property(),

	myComputed: "valor a modificar",

	onLocaleChange: Ember.observer('i18n.locale', function() {
		const newLocale = this.get('i18n').get('locale');
		this.property('myComputed').set("modificado!!!");
		console.log("con la que sea");
	}),
*/

});
