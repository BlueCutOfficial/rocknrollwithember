import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('band');
  },

  actions: {

    createBand() {
      var route = this;
      var controller = this.get('controller');
      var band = this.store.createRecord('band', controller.getProperties('name'));

      band.save().then(function() {
        // Reset the input field after the band's creation is validated
        controller.set('name', '');
        // Switch to the songs
        route.transitionTo('bands.band.songs', band);
      });
    },

    didTransition: function() {
      document.title = 'Bands - R&R with Ember';
    }

  }

});
