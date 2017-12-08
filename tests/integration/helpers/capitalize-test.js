
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('capitalize', 'helper:capitalize', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {

  this.set('inputValue', 'nirvana');
  this.render(hbs`{{capitalize inputValue}}`);
  assert.equal(this.$().text().trim(), 'Nirvana', 'Capitalize title');

  this.set('inputValue', 'system of a down');
  this.render(hbs`{{capitalize inputValue}}`);
  assert.equal(this.$().text().trim(), 'System Of A Down', 'Capitalize multiple words title');

});
