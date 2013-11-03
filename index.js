var midi = require('midi');

var input = new midi.input();

input.openPort(0);

var profile = [
  {
    name: 'slider',
    range: [0, 7],
    type: 'range'
  },
  {
    name: 'knob',
    range: [16, 23],
    type: 'range'
  },
  {
    name: 'mute',
    range: [48, 55],
    type: 'button'
  },
  {
    name: 'prime',
    range: [64, 71],
    type: 'button'
  },
  {
    name: 'solo',
    range: [32, 39],
    type: 'button'
  },
  {
    name: 'record',
    id: 45,
    type: 'button'
  },
  {
    name: 'play',
    id: 41,
    type: 'button'
  },
  {
    name: 'stop',
    id: 42,
    type: 'button'
  },
  {
    name: 'forward',
    id: 44,
    type: 'button'
  },
  {
    name: 'reverse',
    id: 43,
    type: 'button'
  },
  {
    name: 'set marker',
    id: 60,
    type: 'button'
  },
  {
    name: 'next market',
    id: 62,
    type: 'button'
  },
  {
    name: 'previous marker',
    id: 61,
    type: 'button'
  },
  {
    name: 'cycle',
    id: 46,
    type: 'button'
  },
  {
    name: 'next track',
    id: 59,
    type: 'button'
  },
  {
    name: 'previous track',
    id: 58,
    type: 'button'
  }
];

var controls = [];

loadProfile(profile);

function loadProfile() {
  profile.forEach(function (desc) {
    if ('range' in desc) {
      for (var i = desc.range[0]; i <= desc.range[1]; i++) {
        makeControl(i, desc, i - desc.range[0]);
      }
    } else if ('id' in desc) {
      makeControl(desc.id, desc);
    }
  });
}

function makeControl(id, desc, offset) {
  controls[id] = {
    id: id,
    name: desc.name,
    type: desc.type
  };
  if (offset !== undefined) {
    controls[id].offset = offset;
  }
}

input.on('message', function(deltaTime, message) {
  if (message[0] === 176) {
    var id = message[1];
    var value = message[2];
    if (id in controls) {
      var control = controls[id];
      var name = control.name + ('offset' in control ? ' ' + control.offset : '');
      if (control.type === 'button') {
        if (value > 64) {
          value = 'active';
        } else {
          value = 'inactive';
        }
        console.log(name + ': ' + value);
      } else {
        console.log(name + ': ' + value);
      }
    } else {
      console.log(id, value);
    }
  }
});

