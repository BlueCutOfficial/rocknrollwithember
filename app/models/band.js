import Ember from 'ember';

export default Ember.Object.extend({
  
  // Name of the song
  name: '',

  // slug for the URL (/bands/[name]/songs/)
  slug: Ember.computed('name', function() {
    return this.get('name').dasherize();
  }),

  // Songs of the band, songs property init as []
  setupSongs: Ember.on('init', function() {
    if (!this.get('songs')) {
      this.set('songs', []);
    }
  })

});