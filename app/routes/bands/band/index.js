import { isEmpty } from '@ember/utils';
import Route from '@ember/routing/route';

export default Route.extend({

  afterModel(band) {
    let description = band.get('description');
    if(isEmpty(description)) {
      this.transitionTo('bands.band.songs');
    }
    else {
      this.transitionTo('bands.band.details');
    }
  }

});
