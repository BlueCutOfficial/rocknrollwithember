import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.store.findAll('band');
  },

  actions: {

    createBand() {
      let route = this;
      let controller = this.get('controller');
      let band = this.store.createRecord('band', controller.getProperties('name'));

      band.save().then(() => {
        // Reset the input field after the band's creation is validated
        controller.set('name', '');
        // Switch to the songs
        route.transitionTo('bands.band.songs', band);
      });
    },

    didTransition() {
      document.title = 'Bands - R&R with Ember';
    }

  }

});
