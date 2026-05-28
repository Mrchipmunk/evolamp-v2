radio.onReceivedString(function (receivedString) {
    if (receivedString == "CONNECT") {
        radio.sendString("CONNECTED")
        CONNECTED = true
    }
    if (CONNECTED == true) {
        if (receivedString == "LAMPOFF") {
            LIGHTSTATE = false
            pins.digitalWritePin(DigitalPin.P0, 0)
        } else if (receivedString == "LAMPON") {
            LIGHTSTATE = true
            pins.digitalWritePin(DigitalPin.P0, 1)
        } else if (false) {
        	
        } else {
        	
        }
    }
})
let LIGHTSTATE = false
let CONNECTED = false
basic.showString("EVOTEST")
let RADIOGROUP = 1
CONNECTED = false
radio.setGroup(RADIOGROUP)
basic.forever(function () {
	
})
