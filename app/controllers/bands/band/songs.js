import Ember from 'ember';

export default Ember.Controller.extend({

  title: '',

  songCreationStarted: false,

  canCreateSong: Ember.computed.or('songCreationStarted', 'hasSongs'),

  isAddButtonDisabled: Ember.computed.empty('title'),

  noSongs: Ember.computed.equal('model.songs.length', 0),

  hasSongs: Ember.computed.not('noSongs'),

	actions: {

    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    },

    updateRating: function(params) {
      var song = params.item,
      rating = params.rating;
      song.set('rating', rating);
    }
  }

});
