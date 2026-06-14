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
    if (receivedString == "ALTCONNECT") {
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
        }
        if (CRAMODE == false) {
            if (receivedString == "ALTLEDCHANGE") {
                if (LIGHTSTATE == 0) {
                    LIGHTSTATE = 1
                    pins.digitalWritePin(DigitalPin.P0, 1)
                } else if (LIGHTSTATE == 1) {
                    LIGHTSTATE = 0
                    pins.digitalWritePin(DigitalPin.P0, 0)
                }
            } else if (receivedString == "ALTREDCHANGE") {
                if (REDSTATUS == 0) {
                    REDSTATUS = 1
                    basic.showLeds(`
                        # # # # #
                        # # # # #
                        # # # # #
                        # # # # #
                        # # # # #
                        `)
                } else if (LIGHTSTATE == 1) {
                    basic.clearScreen()
                    REDSTATUS = 0
                }
            }
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
let light_level = 0
let REDSTATUS = 0
let CRAMODE = false
let LIGHTSTATE = 0
let CONNECTED = false
let Mode = ""
Mode = "OFF"
music.setBuiltInSpeakerEnabled(true)
pins.setAudioPinEnabled(false)
let RADIOGROUP = 1
CONNECTED = false
LIGHTSTATE = 0
CRAMODE = false
radio.setGroup(RADIOGROUP)
basic.showLeds(`
    # . . . .
    # . # . .
    # . # # .
    # . . . .
    # # # # .
    `)
basic.pause(500)
basic.clearScreen()
basic.forever(function () {
    light_level = Math.map(input.lightLevel(), 0, 255, 1023, 0)
    if (CRAMODE == false) {
        music.stopAllSounds()
        if (Mode == "OFF") {
        	
        } else if (Mode == "LIGHT") {
            LIGHTSTATE = 1
            pins.analogWritePin(AnalogPin.P0, light_level)
        } else if (Mode == "SOUND") {
            if (input.soundLevel() > 180) {
                if (LIGHTSTATE == 0) {
                    LIGHTSTATE = 1
                    pins.digitalWritePin(DigitalPin.P0, 1)
                } else if (LIGHTSTATE == 1) {
                    LIGHTSTATE = 0
                    pins.digitalWritePin(DigitalPin.P0, 0)
                }
                basic.pause(1000)
            }
        }
    }
    if (CRAMODE == true) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.LoopingInBackground)
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
})
