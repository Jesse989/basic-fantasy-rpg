import Item from './Item';

const COLORS = {
  0: 'grey',
  1: 'yellow',
  2: 'green',
  3: 'blue',
  4: 'purple',
  5: 'red',
}

const TINTS = {
  'grey': 0x88776f,
  'yellow': 0xdbc244,
  'green': 0x649154,
  'blue': 0x5ba3c7,
  'purple': 0x944a9c,
  'red': 0xaa3333,
}


export default class Weapon extends Item {
  constructor(
    _name,
    _description,
    _statBonus,
    _ilvl,
    _cost,
    _sell,
    _slot,
    _skillType,
    _spd,
    _durability,
    _repairCost,
    _dmg,
    _icon
  ) {
    super(
      _name,
      _description,
      _ilvl,
      _cost,
      _sell,
      'weapon',
      1,
      1,
      _icon
    );

    this.slot = function() {
      return _slot;
    }

    this.skillType = function() {
      return _skillType;
    }

    this.spd = function() {
      return _spd;
    }
    this.dmg = function() {
      return _dmg;
    }

    this.statBonus = function() {
      return _statBonus;
    }


    this.damageType = function() {
      return 'physical';
    }

    // increase lvl:
    this.lvlUp = function() {
      for (let stat in _statBonus) {
        _statBonus[stat] += 2;
      }
      _dmg.min += 2;
      _dmg.max += 2;
      _ilvl += 1;
      _sell *= 1.5;
      _colorIndex++
    }

    this.getColor = function() {
      return COLORS[_colorIndex]
    }

    this.getTint = function() {
      return TINTS[COLORS[_colorIndex]]
    }

    let _colorIndex = 0;



  }
}
