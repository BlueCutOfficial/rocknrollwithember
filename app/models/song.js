import DS from 'ember-data';

export default DS.Model.extend({

  // Title of the song
  title: DS.attr('string'),

  // Current rating
  rating: DS.attr('number'),

  // Band the song belongs to
  band: DS.belongsTo('band')

});