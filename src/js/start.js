/* eslint-env jquery */
/* global Phaser */
$(function () {
  const sprites = {}
  const gamebase = Object.assign({
    assets: {
      logo: 'images/phaser.png'
    },
    sprites
  }, window.gamebase || {})

  const game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload, create, update, render})

  function loadImages(obj) {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      game.load.image(key, value)
    })
  }

  function preload () {
    game.scale.forceOrientation(true, false)
    game.scale.enterIncorrectOrientation.add(handleIncorrect)
    game.scale.leaveIncorrectOrientation.add(handleCorrect)

    loadImages(gamebase.assets)
  }

  function handleIncorrect () {
    document.getElementById('rotate').style.display = 'block'
    document.getElementById('game').style.display = 'none'
    game.paused = true
  }

  function handleCorrect () {
    document.getElementById('game').style.display = 'block'
    document.getElementById('rotate').style.display = 'none'
    game.paused = false
  }

  function create () {
    sprites['logo'] = game.add.sprite(game.world.centerX, game.world.centerY, 'logo')
    sprites['logo'].anchor.setTo(0.5, 0.5)
    sprites['logo'].scale.setTo(1.0, 1.0)

    game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE

    const fullscreenKey = game.input.keyboard.addKey(Phaser.Keyboard.F)
    fullscreenKey.onDown.add(toggleFullscreen, this)

    $(window).resize(() => resize())

    resize()
  }

  function update () {}

  function render () {
    game.debug.cameraInfo(game.camera, 32, 32)
    game.debug.spriteCoords(sprites['logo'], 32, 500)
  }

  function toggleFullscreen () {
    if (game.scale.isFullScreen) {
      game.scale.stopFullScreen()
    } else {
      game.scale.startFullScreen(false)
    }
  }

  function resize () {
    const width = $(window).width()
    const height = $(window).height()
    game.scale.setGameSize(width, height)
    game.world.width = width
    game.world.height = height

    sprites['logo'].x = game.world.centerX
    sprites['logo'].y = game.world.centerY
  }

  return game
})
