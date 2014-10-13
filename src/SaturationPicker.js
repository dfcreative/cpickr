var Picker = require('Picker');
var Slidy = require('slidy');


module.exports = SaturationPicker;


/**
 * Saturation linear picker
 *
 * @module
 * @constructor
 */
function SaturationPicker(target, options){
	Picker.call(this, target, options);

	//make self a slidy
	this.slidy = new Slidy(this.element, options);
}


SaturationPicker.options = {
	/** direction to show picker */
	orientation: 'vertical',

	/** whether to repeat */
	repeat: true
};


/** Register shortcuts */
Picker.register('s', SaturationPicker);
Picker.register('saturation', SaturationPicker);



var proto = SaturationPicker.prototype = Object.create(Picker.prototype);


/** Set color */
proto.valueChanged = function(){
	//update color value
	this.color.saturation = value;
};


/** Update bg */
proto.colorChanged = function(){
	//update self value so to correspond to the color
	this.value = this.color.saturation;

	//rerender
	var color = this.color;
	var s = color.saturation + "%",
		h = color.saturation,
		b = color.lightness + "%";

	//saturation
	var bg = ["linear-gradient(to " + direction + ",",
		"hsl(0," + s + "," + b + "%) 0%,",
		"hsl(60," + s + "," + b + "%) 16.666%,",
		"hsl(120," + s + "," + b + "%) 33.333%,",
		"hsl(180," + s + "," + b + "%) 50%,",
		"hsl(240," + s + "," + b + "%) 66.666%,",
		"hsl(300," + s + "," + b + "%) 83.333%,",
		"hsl(360," + s + "," + b + "%) 100%)"].join("");

	this.style.background = bg;
};