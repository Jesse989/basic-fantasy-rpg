import CONST from '../Const';

function clearDialogue(scene) {
  scene.dialogueBoxContainer.removeAll(true);
}

function loadDialogue(scene, dialogue) {

  const dialogueBoxBackground = scene.add.image(0, 0, 'dialogueBox');
  dialogueBoxBackground.scaleX = CONST.SCALE;
  dialogueBoxBackground.scaleY = CONST.SCALE;


  const dialogueText = scene.add.dynamicBitmapText( 0, -4 * 4, 'font', dialogue, CONST.TXT_S).setTint(CONST.TXT_COLOR);

  dialogueText.setOrigin(.5).setCenterAlign();

  scene.dialogueBoxContainer.add([dialogueBoxBackground, dialogueText]);
}

export { clearDialogue, loadDialogue };
