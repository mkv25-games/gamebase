$(function() {

    let logo

    function preload() {
        game.load.image('logo', 'images/phaser.png')
    }

    function create() {
        logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo')
        logo.anchor.setTo(0.5, 0.5)
        logo.scale.setTo(1.0, 1.0)

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT

        game.input.onDown.add(() => {
            toggleFullscreen(game)
        }, this);

        $(window).resize(function() {
            resize(game)
        });

        setTimeout(resize, 500, game)
    }

    function update() {

    }

    function render() {
        game.debug.cameraInfo(game.camera, 32, 32)
        game.debug.spriteCoords(logo, 32, 500)
    }

    let game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload,
        create,
        update,
        render
    })

    function toggleFullscreen() {
        if (!document.fullscreenElement && // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    function resize(game) {
        let height = $(window).height()
        let width = $(window).width()

        try {
            game.width = width
            game.height = height
            console.log('Resizing to ', width, 'by', height, 'px')
            if (game.stage && game.stage.bounds) {
                game.stage.bounds.width = width
                game.stage.bounds.height = height
                console.log(' - stage to ', width, 'by', height, 'px')
            }
            if (game.renderType === Phaser.WEBGL) {
                game.renderer.resize(width, height)
                console.log(' - webgl to ', width, 'by', height, 'px')
            }
            if (game.camera) {
                game.camera.setSize(width, height)
                game.camera.setPosition(0, 0)
                console.log(' - camera to ', width, 'by', height, 'px')
            }
            var canvas = document.getElementsByTagName('canvas')[0]
            if (canvas && canvas.style) {
                canvas.style.width = width + 'px'
                canvas.style.height = height + 'px'
                console.log(' - canvas to ', width, 'by', height, 'px')
            }
        } catch (ex) {
            console.log('Unable to resize game yet', ex)
        }

        clearTimeout(game.resizeTimeout)
        game.resizeTimeout = setTimeout(() => {
            if (game.width !== width || game.height !== height) {
                resize(game)
            }
        }, 0)
    }
})
