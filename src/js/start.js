/* eslint-env jquery */
/* global Phaser, Element */
$(function() {
  let logo

  let game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload, create, update, render})

  function preload() {
    game.load.image('logo', 'images/phaser.png')
  }

  function create() {
    logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo')
    logo.anchor.setTo(0.5, 0.5)
    logo.scale.setTo(1.0, 1.0)

    game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

    game.input.onDown.add(() => {
      toggleFullscreen(game)
    }, this)

    $(window).resize(() => resize())

    setTimeout(resize, 500, game)
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
    game.scale.setGameSize($(window).width(), $(window).height())
  }
})
