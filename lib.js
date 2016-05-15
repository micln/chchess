/**
 * Created by zhangxing on 16/5/15.
 */

jQuery.fn.left = function () {
	return this[0] == document.body ?
		this.offset().left :
	this.offset().left + this.parent().left();
};

jQuery.fn.top = function () {
	return this[0] == document.body ?
		this.offset().top :
	this.offset().top + this.parent().top();
};

//
function print() {
	console.trace('print: ', arguments);
}

// Object.prototype.extend = function (Class, args) {
// 	this.TMPCLASSS = Class;
// 	this.TMPCLASSS.call(this, args);
// 	delete this.TMPCLASSS;
// };

/**
 *
 * @param x
 * @param y
 * @returns {{x: *, y: *, distance2From: distance2From, equalTo: equalTo, isCommentLoad: isCommentLoad}}
 * @constructor
 *
 * var p1 = Point(3,4)
 * var p2 = Point(p1)
 */
function Point(x, y) {

	if (x instanceof Object) {
		y = x.y;
		x = x.x;
	}

	this.x = x;
	this.y = y;

	this.setXY = function (x, y) {
		this.x = x;
		this.y = y;
		return this;
	};

	this.distance2From = function (p) {
		return (this.x - p.x) * (this.x - p.x) + (this.y - p.y) * (this.y - p.y);
	};

	this.equalTo = function (p) {
		return this.x === p.x && this.y === p.y;
	};

	this.isCommentLoad = function (p) {
		return this.x === p.x || this.y === p.y;
	};
}

function newPoint(x, y) {
	return new Point(x, y);
}