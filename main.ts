input.onButtonPressed(Button.A, function () {
    if (CRAMODE == false) {
        if (LIGHTSTATE == 1) {
            pins.digitalWritePin(DigitalPin.P0, 0)
            LIGHTSTATE = 0
        } else if (LIGHTSTATE == 0) {
            pins.digitalWritePin(DigitalPin.P0, 1)
            LIGHTSTATE = 1
        }
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "CONNECT") {
        radio.sendString("CONNECTED")
        CONNECTED = true
    }
    if (CONNECTED == true) {
        if (receivedString == "LAMPOFF") {
            LIGHTSTATE = 0
            pins.digitalWritePin(DigitalPin.P0, 0)
        } else if (receivedString == "LAMPON") {
            LIGHTSTATE = 1
            pins.digitalWritePin(DigitalPin.P0, 1)
        } else if (receivedString == "CRAON") {
            LIGHTSTATE = 2
            CRAMODE = true
        } else if (receivedString == "CRAOFF") {
            CRAMODE = false
            LIGHTSTATE = 0
            pins.digitalWritePin(DigitalPin.P0, 0)
        } else {
            basic.showLeds(`
                . . . . .
                . # . # .
                . . # . .
                . . . # .
                # . . . #
                `)
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (CRAMODE == false) {
        if (Mode == "OFF") {
            Mode = "LIGHT"
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                . # # # .
                . # # # .
                `)
            basic.pause(100)
            basic.clearScreen()
        } else if (Mode == "LIGHT") {
            Mode = "SOUND"
            basic.showLeds(`
                . . . . #
                # # # # .
                # # # . .
                # # # # .
                . . . . #
                `)
            basic.pause(100)
            basic.clearScreen()
        } else if (Mode == "SOUND") {
            Mode = "OFF"
            basic.showLeds(`
                # . . . .
                # . . . .
                # . . . .
                # . . . .
                # # # # .
                `)
            basic.pause(100)
            basic.clearScreen()
        }
    }
})
function cramode () {
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.LoopingInBackground)
    while (CRAMODE == true) {
        pins.digitalWritePin(DigitalPin.P0, 1)
        basic.showIcon(IconNames.Heart)
        basic.showIcon(IconNames.Angry)
        basic.showIcon(IconNames.StickFigure)
        basic.pause(1000)
        pins.digitalWritePin(DigitalPin.P0, 0)
        basic.showIcon(IconNames.Skull)
        basic.showIcon(IconNames.Umbrella)
        basic.showIcon(IconNames.Silly)
    }
    music.stopAllSounds()
}
let CRAMODE = false
let LIGHTSTATE = 0
let CONNECTED = false
let Mode = ""
basic.showString("EVOTEST")
Mode = "OFF"
music.setBuiltInSpeakerEnabled(true)
pins.setAudioPinEnabled(false)
let RADIOGROUP = 1
CONNECTED = false
LIGHTSTATE = 0
CRAMODE = false
radio.setGroup(RADIOGROUP)
basic.forever(function () {
    if (CRAMODE == false) {
        if (Mode == "OFF") {
        	
        } else if (Mode == "LIGHT") {
        	
        } else if (Mode == "SOUND") {
            if (input.soundLevel() > 180) {
                if (LIGHTSTATE == 0) {
                    LIGHTSTATE = 1
                    pins.digitalWritePin(DigitalPin.P0, 1)
                } else if (LIGHTSTATE == 1) {
                    LIGHTSTATE = 0
                    pins.digitalWritePin(DigitalPin.P0, 0)
                }
            }
        }
    }
})
