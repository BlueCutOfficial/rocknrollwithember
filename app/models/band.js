import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Object.extend({
  
  // Name of the band
  name: '',

  // Description of the band
  description: '',

  // slug for the route (/bands/[name]/songs/)
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