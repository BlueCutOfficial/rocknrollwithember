import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.modelFor('bands.band');
  },

  actions: {

    save: function() {
      var controller = this.get('controller');
      // the model property of the route is the old value, not the new model modified by the controller
      var band = controller.get('model');
      return band.save();
    },

    willTransition: function(transition) {
      var controller = this.get('controller');
      var leave;

      if(controller.get('isEditing')) {
        leave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
        if(leave) {
          controller.set('isEditing', false);
        }
        else {
          transition.abort();
        }
      }
    }

  }

});