import { getItemByName } from './itemAPI';
import { getConsumableByName } from './consumableAPI';
import { getWeaponByName } from './weaponAPI';
import { getArmorByName } from './armorAPI';

export default function createLoot(name = '') {
  if (name === 'orc') {
    const random = Phaser.Math.Between(0, 101);
    switch (true) {
      case (random < 35):
        return getItemByName('Gold Dust');
      case (random < 51):
        return getItemByName('Large Candle');
      case (random < 85):
        return getConsumableByName('Orc Jerky');
      case (random < 87):
        return getConsumableByName('Spring Water');
      case (random < 89):
        return getItemByName('Malachite');
      case (random < 93):
        return getWeaponByName('Short Sword');
      case (random < 99):
        return getWeaponByName('Deadman Dagger');
      case (random < 100):
        return getWeaponByName('Sword of Truth');
    }
  }
}
