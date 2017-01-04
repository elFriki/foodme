import Ember from 'ember';

export default Ember.Component.extend({

	i18n: Ember.inject.service(),

	locale: Ember.computed.alias('i18n.locale'),

	onSelectedLanguageChanged: Ember.observer('selectedLanguage',
		function() {
	       this.get('i18n').set('locale', this.get('selectedLanguage.code'));
		}),

	onLocaleChanged: Ember.observer('locale',
		function() {
			let sel = this.get('languages').findBy('code', this.get('locale'));
			this.set('selectedLanguage', sel);
		})

});
