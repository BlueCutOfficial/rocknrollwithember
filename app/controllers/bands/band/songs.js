import Ember from 'ember';
import { capitalize } from 'rocknrollwithember/helpers/capitalize';

export default Ember.Controller.extend({

  queryParams: {
    sortBy: 'sort',
    searchTerm: 's',
  },

  title: '',

  searchTerm: '',

  songCreationStarted: false,

  canCreateSong: Ember.computed.or('songCreationStarted', 'hasSongs'),

  isAddButtonDisabled: Ember.computed.empty('title'),

  zeroSongs: Ember.computed.equal('model.songs.length', 0),
  undefinedSongs: Ember.computed.equal('model.songs.length', undefined),
  noSongs: Ember.computed.or('zeroSongs', 'undefinedSongs'),
  hasSongs: Ember.computed.not('noSongs'),

  matchingSongs: Ember.computed('model.songs.@each.title', 'searchTerm', function() {
    var searchTerm = this.get('searchTerm').toLowerCase();
    return this.get('model.songs').filter(function(song) {
       return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

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

  sortedSongs: Ember.computed.sort('matchingSongs', 'sortProperties'),

  newSongPlaceholder: Ember.computed('model.name', function() {
    var bandName = capitalize(this.get('model.name'));
    return `New ${bandName} song`;
  }),

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
