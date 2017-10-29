/* eslint-env jquery */
/* global Phaser, Element */
$(function() {
  let logo

  let game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload, create, update, render})

  function preload() {
    game.scale.forceOrientation(true, false)
    game.scale.enterIncorrectOrientation.add(handleIncorrect)
    game.scale.leaveIncorrectOrientation.add(handleCorrect)

    game.load.image('logo', 'images/phaser.png')
  }

  function handleIncorrect() {
    document.getElementById('rotate').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    game.paused = true;
  }

  function handleCorrect() {
    document.getElementById('game').style.display = 'block';
    document.getElementById('rotate').style.display = 'none';
    game.paused = false;
  }

  function create() {
    logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo')
    logo.anchor.setTo(0.5, 0.5)
    logo.scale.setTo(1.0, 1.0)

    game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

    game.input.onDown.add(() => {
      toggleFullscreen(game)
      game.add.tween(logo).to({
        angle: Math.floor(logo.angle / 90) * 90 + 90
      }).start()
    }, this)

    $(window).resize(() => resize())

    resize()
  }

  function update() {}

  function render() {
    game.debug.cameraInfo(game.camera, 32, 32)
    game.debug.spriteCoords(logo, 32, 500)
  }

  function toggleFullscreen() {
    if (game.scale.isFullScreen) {
      game.scale.stopFullScreen()
    } else {
      game.scale.startFullScreen(false)
    }
  }

  function resize() {
    const width = $(window).width()
    const height = $(window).height()
    game.scale.setGameSize(width, height)
    game.world.width = width
    game.world.height = height

    logo.x = game.world.centerX
    logo.y = game.world.centerY
  }
})
