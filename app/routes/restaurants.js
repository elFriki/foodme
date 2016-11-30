import Ember from 'ember';

export default Ember.Route.extend({

    model(){
        return Ember.$.getJSON('https://raw.githubusercontent.com/shokmaster/ember-workshops/master/resources/restaurants.json');
    }

});
