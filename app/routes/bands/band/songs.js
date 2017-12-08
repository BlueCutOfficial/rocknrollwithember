import Ember from 'ember';
import { capitalize } from 'rocknrollwithember/helpers/capitalize';

export default Ember.Route.extend({

  model() {
    return this.modelFor('bands.band');
  },

  resetController(controller) {
    controller.set('songCreationStarted', false);
  },

  actions: {

    createSong() {
      var controller = this.get('controller');
      var band = this.modelFor('bands.band');
      var song = this.store.createRecord('song', { title: controller.get('title'), band: band });

      song.save().then(function() {
        // Reset the input field after the song's creation is validated
        controller.set('title', '');
      });
    },

    didTransition() {
      var band = this.modelFor('bands.band');
      var bandName = capitalize(band.get('name'));
      document.title = `${bandName} songs - R&R with Ember`;
    }

  }

});
