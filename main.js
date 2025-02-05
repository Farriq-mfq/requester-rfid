const HID = require('node-hid');
const {Subject} = require('rxjs')
const {bufferTime} = require("rxjs/operators")
const axios = require('axios')
require('dotenv').config()
const vendorId = 0xffff; // VENDOR ID USB RFID READER
const productId = 0x0035; // PRODUCT ID USB RFID READER
// initialization device
const device = new HID.HID(vendorId, productId);
// initialization object subject rxjs
const subject = new Subject();
// listen device
device.on('data', function (data) {
	const hexData = data.toString('hex');
	// substring data and parse hex to decimal
    const charCode = parseInt(hexData.substring(4,6),16);
    if(charCode > 0){
		// send data to subject instance
		subject.next(charCode)
	}
});

// listen subject and try to request to server
subject.pipe(bufferTime(300)).subscribe({ 
	next:(validTag)=>{
		if(validTag.length === 11){
			const tag =  validTag.join("");
			console.log("CUSTOM TAG ID  : ",validTag.join(""))
			requestData(tag)	
		}
	},
	error:(err)=>{
		console.log("ERROR :",err)
	}
})

const requestData =async (scan)=>{
		try{
			const response = await axios.post(process.env.API_URL,{
					ip:"192.215.15.15",
					scan,
					token:process.env.TOKEN
			})
			
			console.log(response)
		}catch(e){
			console.log(e)
			console.log("Terjadi kesalahan")
		}
}



