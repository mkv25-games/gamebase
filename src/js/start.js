$(function() {

    let logo
    
    function preload() {
        game.load.image('logo', 'images/phaser.png')
    }

    function create() {
        logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo')
        logo.anchor.setTo(0.5, 0.5)

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.input.onDown.add(() => {
            toggleFullscreen(game)
        }, this);

        $(window).resize(function() {
            resize(game)
        });
    }

    function update() {

    }

    function render() {
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(logo, 32, 500);
    }

    let game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload,
        create,
        update,
        render
    })

    function toggleFullscreen(game) {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        } else {
            game.scale.startFullScreen(false);
        }
    }

    function resize(game) {
        try {
            var height = $(window).height()
            var width = $(window).width()
            game.width = width
            game.height = height
            if (game.stage && game.stage.bounds) {
                game.stage.bounds.width = width
                game.stage.bounds.height = height
            }
            if (game.renderType === Phaser.WEBGL) {
                game.renderer.resize(width, height)
            }
            if (game.camera) {
                game.camera.setSize(width, height)
                game.camera.setPosition(width/2, height/2)
            }
        } catch (ex) {
            console.log('Unable to resize game yet', ex)
        }
    }
})
