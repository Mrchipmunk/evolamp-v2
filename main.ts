radio.onReceivedString(function (receivedString) {
    if (receivedString == "CONNECT") {
        radio.sendString("CONNECTED")
        CONNECTED = true
    }
    if (CONNECTED == true) {
    	
    }
})
let CONNECTED = false
basic.showString("EVOTEST")
let RADIOGROUP = 1
CONNECTED = false
radio.setGroup(RADIOGROUP)
basic.forever(function () {
	
})
