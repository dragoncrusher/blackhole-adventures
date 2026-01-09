namespace SpriteKind {
    export const breaker = SpriteKind.create()
    export const boss = SpriteKind.create()
    export const destroyer = SpriteKind.create()
    export const enemie2 = SpriteKind.create()
}
namespace StatusBarKind {
    export const size = StatusBarKind.create()
    export const food = StatusBarKind.create()
}
statusbars.onStatusReached(StatusBarKind.food, statusbars.StatusComparison.EQ, statusbars.ComparisonType.Percentage, 100, function (status) {
    level += 1
    info.setScore(0)
    status.max = status.value * 2
    status.value = 0
    healthbar += 1
    mySprite.changeScale(0.2, ScaleAnchor.Middle)
    if (level == 3) {
        mySprite3 = sprites.create(img`
            ....................
            ....................
            ....................
            ....................
            ....................
            .....22...2..552....
            ....222252225.222...
            ...22222.2222.2222..
            ...224452222452222..
            ...222.522225.4222..
            ..2224..22225..422..
            ...24...5244.5..42..
            ..24...5.225.5..22..
            ......55.24...5.422.
            ......5..45...5.....
            ......5...5....5....
            .....5....5.....5...
            ....55....5.....5...
            ....................
            ....................
            `, SpriteKind.boss)
        tiles.placeOnTile(mySprite3, tiles.getTileLocation(6, 2))
        story.startCutscene(function () {
            controller.moveSprite(mySprite2, 0, 0)
            story.spriteMoveToLocation(mySprite3, mySprite2.x, mySprite2.y, 100)
            story.printCharacterText("hello", "alien boss")
            story.printCharacterText("I have come to destroy you.", "alien boss")
            story.printCharacterText("My army will destroy all the astroids", "alien boss")
            story.printCharacterText("You can't do that! If the breaker touches the aliens the will die! ", "player")
            story.printCharacterText("I will fight back!", "player")
            sprites.destroy(mySprite3)
            story.cancelAllCutscenes()
            for (let index = 0; index < 4; index++) {
                mySprite3 = sprites.create(img`
                    ....................
                    ....................
                    ....................
                    ....................
                    ....................
                    .....22...2..552....
                    ....222252225.222...
                    ...22222.2222.2222..
                    ...224452222452222..
                    ...222.522225.4222..
                    ..2224..22225..422..
                    ...24...5244.5..42..
                    ..24...5.225.5..22..
                    ......55.24...5.422.
                    ......5..45...5.....
                    ......5...5....5....
                    .....5....5.....5...
                    ....55....5.....5...
                    ....................
                    ....................
                    `, SpriteKind.Enemy)
                mySprite3.setScale(0.5, ScaleAnchor.Middle)
                tiles.placeOnRandomTile(mySprite3, assets.tile`myTile`)
                mySprite3.setVelocity(50, 50)
                mySprite3.setBounceOnWall(true)
            }
            controller.moveSprite(mySprite2)
            pauseUntil(() => sprites.allOfKind(SpriteKind.Enemy).length == 0)
            game.splash("level 2")
            boooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooomb = true
            story.startCutscene(function () {
                story.printCharacterText("Instuctions")
                story.printCharacterText("There are red alien spawners", "Instuctions")
                story.printCharacterText("Collect the blue asteroids", "Instuctions")
                story.printCharacterText("Then destroy the spawners by bringing the asteroids to them.", "Instuctions")
            })
            tiles.setCurrentTilemap(tilemap`level2`)
            mySprite2.setPosition(mySprite.x, mySprite.y)
        })
    }
    if (level == 4) {
        game.splash("level 3")
        tiles.setCurrentTilemap(tilemap`level0`)
        mySprite2.setPosition(mySprite.x, mySprite.y)
    }
    if (level == 5) {
        game.splash("level 4")
        tiles.setCurrentTilemap(tilemap`level10`)
        mySprite2.setPosition(mySprite.x, mySprite.y)
    }
    if (level == 6) {
        game.splash("final level")
        tiles.setCurrentTilemap(tilemap`level12`)
        mySprite2.setPosition(mySprite.x, mySprite.y)
        level = 7
    }
})
scene.onOverlapTile(SpriteKind.destroyer, sprites.dungeon.doorLockedSouth, function (sprite, location) {
    sprites.destroy(sprite)
    tiles.setTileAt(location, assets.tile`myTile`)
})
sprites.onCreated(SpriteKind.destroyer, function (sprite) {
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.breaker, SpriteKind.Projectile, function (sprite, otherSprite) {
    music.setVolume(128)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
    otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    timer.after(1000, function () {
        otherSprite.setFlag(SpriteFlag.GhostThroughSprites, false)
    })
    sprites.destroy(otherSprite)
    projectile2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . c c c . . . . . . 
        . . . . . . a b a a . . . . . . 
        . . . . . c b a f c a c . . . . 
        . . . . c b b b f f a c c . . . 
        . . . . b b f a b b a a c . . . 
        . . . . c b f f b a f c a . . . 
        . . . . . c a a c b b a . . . . 
        . . . . . . c c c c . . . . . . 
        . . . . . . . c . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
    projectile2.setVelocity(randint(-50, 50), randint(-50, 50))
    projectile2.setPosition(otherSprite.x, otherSprite.y)
    projectile2.setBounceOnWall(true)
    mySprite.setFlag(SpriteFlag.GhostThroughWalls, false)
    timer.after(500, function () {
        projectile2.setKind(SpriteKind.Food)
        projectile2.follow(mySprite)
    })
})
scene.onOverlapTile(SpriteKind.destroyer, assets.tile`myTile2`, function (sprite, location) {
    sprites.destroy(sprite)
    tiles.setTileAt(location, assets.tile`myTile`)
})
sprites.onOverlap(SpriteKind.breaker, SpriteKind.Text, function (sprite, otherSprite) {
    music.setVolume(128)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
    sprites.destroy(otherSprite)
    projectile2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 6 6 6 . . . . . . 
        . . . . . . 8 9 8 8 . . . . . . 
        . . . . . 6 9 8 f 6 8 6 . . . . 
        . . . . 6 9 9 9 f f 8 6 6 . . . 
        . . . . 9 9 f 8 9 9 8 8 6 . . . 
        . . . . 6 9 f f 9 8 f 6 8 . . . 
        . . . . . 6 8 8 6 9 9 8 . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . . . . 6 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.destroyer)
    projectile2.follow(mySprite2)
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game.ask("upgrade asteroids?", "cost 20 points.") == true) {
        if (info.score() >= 20) {
            info.changeScoreBy(-20)
            levela += 1
        } else {
            game.splash("not enough points")
        }
    }
})
info.onLifeZero(function () {
	
})
sprites.onOverlap(SpriteKind.enemie2, SpriteKind.breaker, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    otherSprite.setPosition(mySprite.x, mySprite.y)
})
scene.onOverlapTile(SpriteKind.destroyer, assets.tile`myTile3`, function (sprite, location) {
    sprites.destroy(sprite)
    tiles.setTileAt(location, assets.tile`myTile`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    for (let index = 0; index < levela; index++) {
        info.changeScoreBy(1)
        statusbar2.value += 1
    }
})
sprites.onDestroyed(SpriteKind.destroyer, function (sprite) {
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.breaker, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    for (let index = 0; index < 10; index++) {
        info.changeScoreBy(1)
    }
})
let myMinimap: minimap.Minimap = null
let minimap2: Sprite = null
let buble = 0
let statusbar: StatusBarSprite = null
let projectile: Sprite = null
let projectile2: Sprite = null
let mySprite3: Sprite = null
let mySprite2: Sprite = null
let statusbar2: StatusBarSprite = null
let level = 0
let mySprite: Sprite = null
let boooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooomb = false
let levela = 0
info.setLifeImage(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . 6 6 . . . . . .
    . . . . . 6 8 8 8 8 6 . . . . .
    . . . . . 8 8 f f 9 8 . . . . .
    . . . . 6 8 9 f f 6 9 8 . . . .
    . . . . 6 9 9 9 8 f 6 9 . . . .
    . . . . 6 9 8 6 8 9 9 9 9 . . .
    . . . 6 8 9 9 f f 8 8 6 9 . . .
    . . . 6 9 9 8 8 9 9 6 8 6 . . .
    . . . 6 9 8 6 8 8 9 9 6 . . . .
    . . . . 9 9 f f 8 8 6 . . . . .
    . . . . . 8 8 9 9 6 . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`)
info.setLife(0)
music.setVolume(18)
music.play(music.createSong(hex`0078000408010305001c000f0a006400f4010a0000040000000000000000000000000000000002270000000400012a040008000222250c00100002242910001400012014001800012918001c00021e2207001c00020a006400f4016400000400000000000000000000000000000000031a0004000800012c08000c0002202a1400180002242c1c002000012209010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80038000000010005040607090b040005000109080009000205090c000d00010a10001100030607091400150001041800190002060a1c001d000109`), music.PlaybackMode.LoopingInBackground)
levela = 1
boooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooomb = false
story.startCutscene(function () {
    story.printCharacterText("Instuctions")
    story.printCharacterText("Feed the black hole", "Instuctions")
    story.printCharacterText("Hit the purple asteroids to send them to the black hole", "Instuctions")
    story.printCharacterText("You may have to hit them multiple times", "Instuctions")
})
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 9 9 9 9 9 9 9 . . . . . 
    . . . 9 8 8 8 8 8 8 8 9 . . . . 
    . . 9 8 f f f f f f f 8 9 . . . 
    . 9 8 f f f f f f f f f 8 9 . . 
    . 9 8 f f f f f f f f f 8 9 . . 
    . 9 8 f f f f f f f f f 8 9 . . 
    . 9 8 f f f f f f f f f 8 9 . . 
    . 9 8 f f f f f f f f f 8 9 . . 
    . 9 8 f f f f f f f f f 8 9 . . 
    . 9 8 f f f f f f f f f 8 9 . . 
    . . 9 8 f f f f f f f 8 9 . . . 
    . . . 9 8 8 8 8 8 8 8 9 . . . . 
    . . . . 9 9 9 9 9 9 9 . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
let healthbar = 1
level = 1
statusbar2 = statusbars.create(20, 4, StatusBarKind.food)
statusbar2.setColor(8, 12, 10)
statusbar2.attachToSprite(mySprite)
statusbar2.max = 10
statusbar2.value = 0
mySprite2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . 1 1 1 1 1 1 1 . . . . 
    . . . . 1 . . . . . . . 1 . . . 
    . . . 1 . . . . . . . . . 1 . . 
    . . 1 . . . . . . . . . . . 1 . 
    . . 1 . . . . . . . . . . . 1 . 
    . . 1 . . . . . . . . . . . 1 . 
    . . 1 . . . . . . . . . . . 1 . 
    . . 1 . . . . . . . . . . . 1 . 
    . . 1 . . . . . . . . . . . 1 . 
    . . 1 . . . . . . . . . . . 1 . 
    . . . 1 . . . . . . . . . 1 . . 
    . . . . 1 . . . . . . . 1 . . . 
    . . . . . 1 1 1 1 1 1 1 . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.breaker)
controller.moveSprite(mySprite2)
scene.cameraFollowSprite(mySprite2)
let light2 = 4
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffff
    ffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffc
    fffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffff
    fffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffffffff
    fff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbffffffffffff
    ffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffff
    f33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccffffffffffffffffffff
    ff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffff
    ffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffff
    fffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffff
    fffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcfffff
    ffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffff
    fffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fcfffffffffffffffffffffffffcfffffffffffffcfffffffffffffffffffffffffcfffffffffffffcfffffffffffffffffffffffffcfffffffffffffcfffffffffffffffffffffffffcffffffffffff
    fffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffff
    ff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffff
    ffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffcfffffff
    ffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffff
    fffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffc
    fffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffb
    fffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffffffffc
    fffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffccffffff
    ffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccffffffffffffffffffffccffffff
    ffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffffffff
    fffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffffffff
    fffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcfffffffffffff
    ffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffff
    fffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    cffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffcfffff
    ffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcbcffff
    fffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffff
    fffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffffffffffffff
    fffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbffffffffffffffffff
    fffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffffff
    ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccffffffffffffffffffffffffff
    ffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffffff
    fffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffffff
    fffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcfffffcfffff
    ffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcfffffffffffffffffffffffffffffcffffffffffffffffff
    fffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffccffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccffffffffffffffffff
    ffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffcfff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffff
    bcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffffffffffffffffffffffffffffffffff
    bbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbffffffffffffffffffffffffffffffffffffff
    bcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcfffffffffffffffcffffffffffcfffffffffff
    fffffffffffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffffffffffffffffcbcffffffffff
    ffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffffffffffffffffcfffffffffff
    ffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffff
    fffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffffffffffffffffffffffffff
    ffffffffcffffffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcfffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffffffffffffffffffffffffffffffffcffffffffffffffff
    fffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffcbcf
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff3fffffffffffffffffffffbbbf
    fcfffffffffffffcfffffffffffffffffffffffffcfffffffffffffcfffffffffffffffffffffffffcfffffffffffffcfffffffffffffffffffffffffcffffffffffff3bffffffffffffffffffffcbcf
    fffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffff333ffffffffffffccfffffffff
    fffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccfffffffff
    fffffffffffffbfbfffffffffffffffffffffffffffffcfffffffbfbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffcffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffcbcfffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcfffffffffffffffffffff
    fffffffcfffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffff
    ffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffcfffffffffffffffffffffffffcfffffffffffffcfffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffff
    ffcfffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffff
    fffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3ffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffff
    fffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bfffffffff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffff
    ffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff33333fffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcfffffffffff
    ffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffff
    ffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbfbffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccfffffffffffffffffff
    fffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcffff
    fcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfff
    cbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcfffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffff
    cffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffcfffffffffffffffffffffffffcfffffffffffffcfffffffffffffffffffffffffcfffffffffff
    fffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffff
    ffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffff
    fffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffff
    fffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffffffffffff
    ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff3fff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3
    ffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3
    ffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcffffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff333
    fffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b
    fffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcfffffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbf
    ffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffff
    fffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcfffffffff
    `)
tiles.setCurrentTilemap(tilemap`level1`)
multilights.addLightSource(mySprite2, 1000000)
multilights.toggleLighting(false)
info.setScore(0)
game.onUpdate(function () {
    if (story.isMenuOpen()) {
        controller.moveSprite(mySprite2, 0, 0)
    } else {
        controller.moveSprite(mySprite2, 100, 100)
    }
})
game.onUpdateInterval(5000, function () {
    for (let value of tiles.getTilesByType(assets.tile`myTile2`)) {
        mySprite3 = sprites.create(img`
            ....................
            ....................
            ....................
            ....................
            ....................
            .....22...2..552....
            ....222252225.222...
            ...22222.2222.2222..
            ...224452222452222..
            ...222.522225.4222..
            ..2224..22225..422..
            ...24...5244.5..42..
            ..24...5.225.5..22..
            ......55.24...5.422.
            ......5..45...5.....
            ......5...5....5....
            .....5....5.....5...
            ....55....5.....5...
            ....................
            ....................
            `, SpriteKind.Enemy)
        mySprite3.setScale(0.5, ScaleAnchor.Middle)
        tiles.placeOnTile(mySprite3, value)
        mySprite3.setVelocity(50, 50)
        mySprite3.setBounceOnWall(true)
    }
})
game.onUpdateInterval(1000, function () {
    if (boooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooomb == true) {
        if (Math.percentChance(50)) {
            projectile = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . c c . . . . . . 
                . . . . . c a a a a c . . . . . 
                . . . . . a a f f b a . . . . . 
                . . . . c a b f f c b a . . . . 
                . . . . c b b b a f c b . . . . 
                . . . . c b a c a b b b b . . . 
                . . . c a b b f f a a c b . . . 
                . . . c b b a a b b c a c . . . 
                . . . c b a c a a b b c . . . . 
                . . . . b b f f a a c . . . . . 
                . . . . . a a b b c . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Projectile)
            tiles.placeOnRandomTile(projectile, assets.tile`myTile`)
            projectile.setVelocity(randint(-10, 10), randint(-10, 10))
            statusbar = statusbars.create(0, 0, StatusBarKind.Health)
            statusbar.setColor(10, 10)
            statusbar.max = healthbar
            statusbar.value = statusbar.max
            statusbar.attachToSprite(projectile)
        } else {
            projectile = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . 6 6 . . . . . . 
                . . . . . 6 8 8 8 8 6 . . . . . 
                . . . . . 8 8 f f 9 8 . . . . . 
                . . . . 6 8 9 f f 6 9 8 . . . . 
                . . . . 6 9 9 9 8 f 6 9 . . . . 
                . . . . 6 9 8 6 8 9 9 9 9 . . . 
                . . . 6 8 9 9 f f 8 8 6 9 . . . 
                . . . 6 9 9 8 8 9 9 6 8 6 . . . 
                . . . 6 9 8 6 8 8 9 9 6 . . . . 
                . . . . 9 9 f f 8 8 6 . . . . . 
                . . . . . 8 8 9 9 6 . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Text)
            tiles.placeOnRandomTile(projectile, assets.tile`myTile`)
            projectile.setVelocity(randint(-10, 10), randint(-10, 10))
            statusbar = statusbars.create(0, 0, StatusBarKind.Health)
            statusbar.setColor(10, 10)
            statusbar.max = healthbar
            statusbar.value = statusbar.max
            statusbar.attachToSprite(projectile)
        }
    } else {
        projectile = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . c c . . . . . . 
            . . . . . c a a a a c . . . . . 
            . . . . . a a f f b a . . . . . 
            . . . . c a b f f c b a . . . . 
            . . . . c b b b a f c b . . . . 
            . . . . c b a c a b b b b . . . 
            . . . c a b b f f a a c b . . . 
            . . . c b b a a b b c a c . . . 
            . . . c b a c a a b b c . . . . 
            . . . . b b f f a a c . . . . . 
            . . . . . a a b b c . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Projectile)
        tiles.placeOnRandomTile(projectile, assets.tile`myTile`)
        projectile.setVelocity(randint(-10, 10), randint(-10, 10))
        statusbar = statusbars.create(0, 0, StatusBarKind.Health)
        statusbar.setColor(10, 10)
        statusbar.max = healthbar
        statusbar.value = statusbar.max
        statusbar.attachToSprite(projectile)
    }
})
game.onUpdateInterval(1, function () {
    buble = 0
    sprites.destroy(minimap2)
    myMinimap = minimap.minimap(MinimapScale.Eighth, 1, 1)
    minimap2 = sprites.create(minimap.getImage(myMinimap), SpriteKind.StatusBar)
    minimap2.setPosition(scene.cameraProperty(CameraProperty.X) - 60, scene.cameraProperty(CameraProperty.Y) - 20)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.Double)
    minimap.includeSprite(myMinimap, mySprite2, MinimapSpriteScale.Double)
    for (let value2 of sprites.allOfKind(SpriteKind.Projectile)) {
        minimap.includeSprite(myMinimap, value2, MinimapSpriteScale.MinimapScale)
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Food)) {
        minimap.includeSprite(myMinimap, value3, MinimapSpriteScale.MinimapScale)
    }
})
forever(function () {
    if (level == 7 && (tiles.getTilesByType(assets.tile`myTile2`).length == 0 && (tiles.getTilesByType(assets.tile`myTile3`).length == 0 && tiles.getTilesByType(sprites.dungeon.doorLockedSouth).length == 0))) {
        game.setGameOverScoringType(game.ScoringType.HighScore)
        game.setGameOverPlayable(true, music.melodyPlayable(music.powerUp), false)
        game.setGameOverEffect(true, effects.confetti)
        game.gameOver(true)
    }
})
game.onUpdateInterval(20000, function () {
    for (let value4 of tiles.getTilesByType(assets.tile`myTile3`)) {
        mySprite3 = sprites.create(img`
            ....................
            ....................
            ....................
            ....................
            ....................
            .....88...8..998....
            ....888898889.888...
            ...88888.8888.8888..
            ...886698888698888..
            ...888.988889.6888..
            ..8886..88889..688..
            ...86...9866.9..68..
            ..86...9.889.9..88..
            ......99.86...9.688.
            ......9..69...9.....
            ......9...9....9....
            .....9....9.....9...
            ....99....9.....9...
            ....................
            ....................
            `, SpriteKind.Enemy)
        mySprite3.setScale(0.8, ScaleAnchor.Middle)
        tiles.placeOnTile(mySprite3, value4)
        mySprite3.setVelocity(100, 100)
        mySprite3.setBounceOnWall(true)
    }
})
game.onUpdateInterval(40000, function () {
    for (let value5 of tiles.getTilesByType(sprites.dungeon.doorLockedSouth)) {
        mySprite3 = sprites.create(img`
            ....................
            ....................
            ....................
            ....................
            ....................
            ........e44e........
            ........4444........
            ......e454454e......
            ......44455444......
            ......44455444......
            ......e454454e......
            ........4444........
            ........e44e........
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            `, SpriteKind.enemie2)
        mySprite3.setScale(1, ScaleAnchor.Middle)
        tiles.placeOnTile(mySprite3, value5)
        mySprite3.setFlag(SpriteFlag.GhostThroughWalls, true)
        mySprite3.follow(mySprite2, randint(1, 60))
        mySprite3.lifespan = 10000
    }
})
