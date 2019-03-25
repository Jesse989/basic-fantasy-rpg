
/**
 * actionPointerDown - called when the inventory is closed,
 * e.g. the pointer has interacted with the game world, not the ui.
 *
 * @param  {object} pointer
 * @param  {Character} player
 * @return {void}
 */
export default function actionPointerDown(pointer, player = {}) {
  // is pointer on a character:
  let target = false;
  // loop through each character and check if the pointer
  // clicked on their body:
  player.scene.characters.getChildren().forEach(child => {
    if (child.body.hitTest(pointer.worldX, pointer.worldY)) {
      return target = child;
    }
  })


  // if a dead character with loot was clicked:
  if (target && target.combat.isDead() && target.loot()) {

    // tapped is whomever hit it first:
    const targetLootOwner = player.target.currentTarget().tapped();
    if (targetLootOwner.getName() !== player.getName()) return;

    // if click target was tapped, and tapper is in range:
    if (targetLootOwner && target.target.rangeCheck(targetLootOwner, 70)) {

      player.scene.lootBoxActive = true;
      player.scene.registry.set('openLootBox', target.loot());

    }

  } else if (target) {
    player.movement.faceTarget(target);
    player.target.setCurrentTarget(target);
    target.playerTarget = true;

    if (player.target.previousTarget()) {
      player.target.previousTarget().playerTarget = false;
    }

    if (target.getCharacterClass() === 'npc' && player.target.rangeCheck(target, 25)) {
        let text = '';
        const questId = target.quest.id;
        const playerQuest = player.questLog.getOne(questId);
        const status = playerQuest ? playerQuest.getStatus() : 'not given';

        if ( status === 'not given') {
          player.questLog.add(questId);
          text = player.questLog.getOne(questId).getText();
        } else if (status === 'in progress') {
          text = player.questLog.getOne(questId).getText(1);
        } else if (status === 'ready for turn in'){
          text = player.questLog.getOne(questId).getText(2)
          // get reward, mark quest as complete:
          player.questLog.completeQuest(questId);
        } else {
          text = "Thanks again brave person."
        }

        player.scene.dialogueBoxActive = true;
        player.scene.registry.set('openDialogueBox', text);
    }
  } else {
    // if no target was clicked, move to that spot instead
    player.movement.setMoveTargetCoords([pointer.worldX, pointer.worldY]);
  }
}
