import { resolve, Promise as EmberPromise } from 'rsvp';

// Simulate network latency to see the loading feature
export default function wait(value, delay) {

  var promise = value.then && typeof value.then === 'function' ? value : resolve(value);

  return new EmberPromise(function(resolve) {
    setTimeout(function() {
      promise.then(function(result) {
        resolve(result);
      });
    }, delay);
  });

}
