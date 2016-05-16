function Piece(option) {
	var that = this;
	//  继承 Point
	Point.call(this, 0, 0);

	for (var x in option) if (option.hasOwnProperty(x)) {
		this[x] = option[x];
	}

	this.isHide = false;
	this.html = null;

	this.hide = function () {
		this.isHide = true;
		this.html.hide();
	};

	this.goto = function (x, y) {
		that.map.moveChess(this, x, y);
		return;
	};

	this.panTo = function (p) {
		this.setXY(p.x, p.y);
	};

	(function () {
		var tmp = $('<div>', {
			id: 'chess' + that.id,
			class: 'piece' + ' c-' + that.color
		}).text(that.v);

		that.html = tmp;
	}());
}