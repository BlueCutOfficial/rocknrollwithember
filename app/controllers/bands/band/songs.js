import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { empty, equal, or, not, sort } from '@ember/object/computed';
import { capitalize } from 'rocknrollwithember/helpers/capitalize';

export default Controller.extend({

  queryParams: {
    sortBy: 'sort',
    searchTerm: 's'
  },

  title: '',

  searchTerm: '',

  songCreationStarted: false,

  canCreateSong: or('songCreationStarted', 'hasSongs'),

  isAddButtonDisabled: empty('title'),

  zeroSongs: equal('model.songs.length', 0),
  undefinedSongs: equal('model.songs.length', undefined),
  noSongs: or('zeroSongs', 'undefinedSongs'),
  hasSongs: not('noSongs'),

  matchingSongs: computed('model.songs.@each.title', 'searchTerm', function() {
    let searchTerm = this.get('searchTerm').toLowerCase();
    return this.get('model.songs').filter(function(song) {
       return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  sortBy: 'ratingDesc',

  sortProperties: computed('sortBy', function() {
    let options = {
      'ratingDesc': 'rating:desc,title:asc',
      'ratingAsc': 'rating:asc,title:asc',
      'titleDesc': 'title:desc',
      'titleAsc': 'title:asc',
    };
    return options[this.get('sortBy')].split(',');
  }),

  sortedSongs: sort('matchingSongs', 'sortProperties'),

  newSongPlaceholder: computed('model.name', function() {
    let bandName = capitalize(this.get('model.name'));
    return `New ${bandName} song`;
  }),

    actions: {

    enableSongCreation() {
      this.set('songCreationStarted', true);
    },

    setSorting(option) {
      this.set('sortBy', option);
    },

    // used with the default addon
    updateRating(params) {
      let { item: song, rating } = params;
      song.set('rating', rating);
      return song.save();
    },

    // used with the overwrite addon
    updateRatingV2(song, rating) {
        song.set('rating', rating);
        return song.save();
    }

  }

});
