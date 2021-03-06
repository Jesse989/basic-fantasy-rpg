/**
 * calculateDodgeChance
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {string} hand attacking with
 * @returns {number} dodge chance
 */
function calculateDodgeChance(attacker = {}, target = {}, hand = '') {
  const totalDodge = target.stat.dodge();
  const defenseSkill = target.stat.defense();
  // mitigated by attacker weapon skill
  const attackerWeaponSkill = attacker.equipment.getCurrentWeaponSkill(hand);

  const dodgeChance =
    (totalDodge + ((defenseSkill - attackerWeaponSkill) * .04));
  return Math.round(dodgeChance * 1000);
}

/**
 * calculateParryChance
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {string} hand attacking with
 * @returns {number} parry chance
 */
function calculateParryChance(attacker = {}, target = {}, hand = '') {
  const characterClass = target.getCharacterClass();
  switch(characterClass) {
    case 'mage':
    case 'priest':
      return 0;
  }
  const tarbaseParry = target.stat.baseParry();
  const targetParryTalents = attacker.stat.statFromTalents();
  const tarbaseDef = target.stat.baseDef();
  const attackerWeaponSkill = attacker.equipment.getCurrentWeaponSkill(hand);
  return Math.round(.05 + tarbaseParry + targetParryTalents + ((tarbaseDef - attackerWeaponSkill) * .04) * 1000);
}


/**
 * calculateBlockChance
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @param  {string} hand
 * @returns {number}
 */
function calculateBlockChance(attacker = {}, target = {}, hand = '') {
  // cant block from behind
  // cant block without Shield
  if (!target.equipment.equipped().offHand) return 0;
  if (!target.equipment.equipped().offHand.hasOwnProperty('skillType')) return 0;
  const targetOffHandType = target.equipment.equipped().offHand.skillType();
  if (targetOffHandType !== 'shield') return 0;
  // amount blocked determined by blockValue
  // worsened by targets blockRating, defense
  const tarbaseDef = target.stat.baseDef();
  const attackerWeaponSkill = attacker.equipment.getCurrentWeaponSkill(hand);

  const tarbaseBlockR = target.stat.baseBlockR();
  const tarbaseBlockRTalents = target.stat.statFromTalents('block');
  const base = .05;
  const blockChance = (base + tarbaseBlockR + tarbaseBlockRTalents
    + ((tarbaseDef - attackerWeaponSkill) * .04));
  return Math.round(blockChance * 1000)
}


/**
 * calculateCritChance
 *
 * @param  {Character} attacker
 * @returns {number} crit chance
 */
function calculateCritChance(attacker = {}) {
  // characters crit chance
  const critChance = attacker.stat.crit() * 100;

  return Math.round(critChance * 100);
}

/**
 * calculateMissChance - TODO: returning correct number?
 *
 * @param  {Character} attacker
 * @param  {Character} target
 * @returns {number} miss chance
 */
function calculateMissChance(attacker = {}, target = {}, hand = '') {
  // based on weapon skill
  const attackerWeaponSkill = attacker.equipment.getCurrentWeaponSkill(hand);
  // mitigated by attacker hit rating
  const attackerHitRating = attacker.stat.baseHit();
  // worsened by target defense rating
  const tarbaseDef = target.stat.baseDef();

  const base = (attacker.equipment.isDualWielding()) ? .24 : .05;
  let missChance = 0;
  if (tarbaseDef - attackerWeaponSkill <= 10) {
    missChance = base + (tarbaseDef - attackerWeaponSkill) * .001;
  } else {
    // base should be .06 here
    missChance = base + (tarbaseDef - attackerWeaponSkill - 10) * .004;
  }
  return Math.round(missChance * 1000);
}

export {
  calculateDodgeChance,
  calculateParryChance,
  calculateBlockChance,
  calculateCritChance,
  calculateMissChance
};
