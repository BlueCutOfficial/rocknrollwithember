import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.modelFor('bands.band');
  },

  actions: {

    save() {
      let controller = this.get('controller');
      // the model property of the route is the old value, not the new model modified by the controller
      let band = controller.get('model');
      return band.save();
    },

    willTransition(transition) {
      let controller = this.get('controller');
      let leave;

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
