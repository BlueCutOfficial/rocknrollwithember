import { test } from 'qunit';
import moduleForAcceptance from 'rocknrollwithember/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';
import httpStubs from '../helpers/http-stubs';

moduleForAcceptance('Acceptance | bands', {
  afterEach() {
    server.shutdown();
  }
});

var server;

var BandRadiohead = {
  id: 1,
  type: 'bands',
  attributes: {
    name: 'Radiohead'
  }
};

var BandLDC = {
  id: 2,
  type: 'bands',
  attributes: {
    name: 'Long Distance Calling'
  }
};

var Elephants = {
  id: 1,
  type: 'songs',
  attributes: {
    title: 'Elephants',
    rating: 2
  }
};

var NewFang = {
  id: 2,
  type: 'songs',
  attributes: {
    title: 'New Fang',
    rating: 4
  }
};

var Lithium = {
  id: 3,
  type: 'songs',
  attributes: {
    title: 'Lithium',
    rating: 5
  }
};

test('List bands', function (assert) {

  server = new Pretender(function() {
    httpStubs.stubBands(this, [BandRadiohead, BandLDC]);
  });

  visit('/bands');
  andThen(function() {
    assertLength(assert, '.band-link', 2, 'All band links are rendered');
    assertLength(assert, '.band-link:contains("Radiohead")', 1, 'First band link contains the band name');
    assertLength(assert, '.band-link:contains("Long Distance Calling")', 1, 'The other band link contains the band name');
  });
});

test('Create a new band', function(assert) {

  server = new Pretender(function() {
    httpStubs.stubBands(this, [BandRadiohead]);
    httpStubs.stubCreateBand(this, 2);
    httpStubs.stubSongs(this, 2, []);
  });

  visit('/bands');
  fillIn('.new-band', 'Long Distance Calling');
  click('.new-band-button');

  andThen(function() {
    assert.equal(find('.band-link').length, 2, 'All band links are rendered');
    assert.equal(find('.band-link:last').text().trim(), 'Long Distance Calling', 'Created band appears at the end of the list');
    assert.equal(find('.nav a.active:contains("Songs")').length, 1, 'The Songs tab is active');
  });
});

test('Create a new song in two steps', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, [BandRadiohead]);
    httpStubs.stubCreateSong(this, 1);
    httpStubs.stubSongs(this, 1, []);
  });

  selectBand('Radiohead');
  click('a:contains("create one")');
  fillIn('.new-song', 'Killer Cars');
  submit('.new-song-button');

  andThen(function() {
    assert.equal(find('.songs .song:contains("Killer Cars")').length, 1, "Creates the song and displays it in the list");
  });
});

test('Search term', function (assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, [BandRadiohead]);
    httpStubs.stubSongs(this, 1, [Elephants,NewFang,Lithium]);
  });

  visit('/bands/1');
  fillIn('.search-field', 'an');
  andThen(function() {
    assertLength(assert, '.song', 2, 'The songs matching the search term are displayed');
  });
});
