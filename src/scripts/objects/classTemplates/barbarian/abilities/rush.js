import CombatObject from '../../../CombatSystem/CombatObject';
import abilityRequirements from '../../abilityRequirements';
import CONST from '../../../Managers/Const';

/**
 * rush - rush an enemy, generate 9 rage, and stun it for 3 seconds.
 * Can be used in combat.
 *
 * level: 1
 *
 * requires: level 4
 *
 * @returns {void}
 */
export default function rush() {
  // meets requirements:
  const reqConfig = {
    resourceAmount: 0,
    resourceType: 'rage',
    range: CONST.CHARGE_MAX_DIST,
    tooClose: CONST.CHARGE_MIN_DIST,
    needsTarget: true
  }
  if (!abilityRequirements(this, reqConfig)) return;
  const target = this.target.currentTarget();

  // setup combat object:
  const combatObject = new CombatObject(this, target);
  combatObject.setType('stun');
  combatObject.setBonusThreat(1);

  target.buffs.add({
    name: 'stun',
    duration: 3 * 60, //3 seconds
    combatObject,
    attacker: this
  });
  this.rage.spendRage(-9)

  let offset = Math.sign(this.x - target.x) * 20;
  this.movement.setMoveTargetCoords([target.x + offset, target.y])
  this.movement.setMovementSpeed(CONST.CHARGE_SPEED)
}
