import Ember from 'ember';

export default Ember.Controller.extend({

  title: '',

  songCreationStarted: false,

  canCreateSong: Ember.computed.or('songCreationStarted', 'hasSongs'),

  isAddButtonDisabled: Ember.computed.empty('title'),

  zeroSongs: Ember.computed.equal('model.songs.length', 0),
  undefinedSongs: Ember.computed.equal('model.songs.length', undefined),
  noSongs: Ember.computed.or('zeroSongs', 'undefinedSongs'),
  hasSongs: Ember.computed.not('noSongs'),

  sortBy: 'ratingDesc',
  sortProperties: Ember.computed('sortBy', function() {
    var options = {
      'ratingDesc': 'rating:desc,title:asc',
      'ratingAsc': 'rating:asc,title:asc',
      'titleDesc': 'title:desc',
      'titleAsc': 'title:asc',
    };
    return options[this.get('sortBy')].split(',');
  }),
  sortedSongs: Ember.computed.sort('model.songs', 'sortProperties'),

	actions: {

    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    },

    setSorting: function(option) {
      this.set('sortBy', option);
    },

    updateRating: function(params) {
      var song = params.item;
      var rating = params.rating;
      song.set('rating', rating);
      return song.save();
    }
  }

});
