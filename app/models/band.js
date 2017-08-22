import DS from 'ember-data';

export default DS.Model.extend({
  
  // Name of the band => we can specify the type "string"
  name: DS.attr('string'),
  // Description of the band => but omitting the type also means it's a "string"
  description: DS.attr(),
  // Songs of the band
  songs: DS.hasMany('song')

});