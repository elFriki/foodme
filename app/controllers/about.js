import Ember from 'ember';

export default Ember.Controller.extend({

	application: Ember.inject.controller('application'),

	i18n: Ember.inject.service(),

	traducida: Ember.computed.alias('application.locale')

});
