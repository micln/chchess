/**
 * Created by zhangxing on 16/5/15.
 */


function ChessMap(query, options) {
	var that = this;
	this.div = $(query);

	//  常量
	var PIECE_SIZE = 60;
	var rowLen = 9;
	var colLen = 8;

	this.chess = [];
	this.bitmap = [];

	this.records = [];  //  打谱

	this.check = {
		//  获得两点之间所有的棋子 (仅支持同行或同列)
		lineChess: function (x1, y1, x2, y2) {
			var ret = [];
			var step = (x2 - x1) + (y2 - y1);
			var dx = (x2 - x1) / step;
			var dy = (y2 - y1) / step;
			console.log(dx, dy);
			for (var i = 0; i <= step; i++) {
				var x = x1 + dx * i;
				var y = y1 + dy * i;
				for (var j in that.chess) {
					var chess = that.chess[j];
					if (chess.x == x && chess.y == y) {
						ret.push(chess);
					}
				}
			}
			// console.log(ret);
			return ret;
		}
	};
	var check = this.check;

	this.hideChess = function (chess) {
		this.bitmap[chess.x][chess.y] = null;
		chess.html.hide();
	};

	this.showChess = function (chess) {
		// console.log(chess);
		// console.log(this.bitmap);
		// console.log(chess.x, chess.y)
		// console.log(this.bitmap[chess.x][chess.y]);
		this.bitmap[chess.x][chess.y] = chess;
		chess.html.css('left', this.div.offset().left + chess.y * PIECE_SIZE);
		chess.html.css('top', this.div.offset().top + chess.x * PIECE_SIZE);
		chess.html.show();
	};

	this.push = function (chess) {
		this.chess.push(chess);
		// print(chess.html);
		this.div.append(chess.html);
	};

	this.moveChess = function (chess, x, y) {
		var p = new Point(x, y);

		var src = that.bitmap[chess.x][chess.y];
		var dst = that.bitmap[x][y];

		try {
			if (chess.equalTo(p)) throw '乱点';

			switch (chess.v) {
				case '車':
					if (!(p.isCommentLoad(chess)
						&& check.lineChess(chess.x, chess.y, x, y).length <= 2
						&& (!dst || dst.color !== chess.color))) {
						throw  '不可达';
					}
					break;

				case '馬':
					if (p.distance2From(chess) !== 5) throw '马走日';
					var ax = chess.x + Math.floor((x - chess.x) / 2);
					var ay = chess.y + Math.floor((y - chess.y) / 2);
					print(ax, ay);
					if (this.bitmap[ax][ay]) throw '蹩腿了';
					break;

				case '象':
					break;
				case '仕':
					break;
				case '将':
					break;
				case '炮':
					if (!(chess.isCommentLoad(p))) throw '不可达';
					break;
				case '卒':
					break;
			}
		}
		catch (e) {
			alert(e);
			return;
		}

		chess.html.animate({
			left: '+=' + (p.y - chess.y) * PIECE_SIZE,
			top: '+=' + (p.x - chess.x) * PIECE_SIZE
		}, function () {

			//  检查吃子
			var army = that.bitmap[p.x][p.y]
			if (army) {
				that.hideChess(army);
			}

			that.hideChess(chess);
			chess.setXY(p.x, p.y);
			that.showChess(chess);
		});
	};


	(function init() {

		//  渲染一堆格子
		for (var i = 0; i < rowLen; i++) {
			var row = $('<div>', {
				class: 'row'
			}).appendTo(that.div);
			for (var j = 0; j < colLen; j++) {
				$('<div>', {
					class: 'box'
				}).appendTo(row);
			}
		}

		//  调整棋盘大小
		that.div.width(PIECE_SIZE * colLen);
		that.div.height(PIECE_SIZE * rowLen);

		//
		for (i = 0; i <= rowLen; i++) {
			that.bitmap[i] = [];
			for (j = 0; j < colLen; j++) {
				that.bitmap[i][j] = null;
			}
		}

		//  初始化棋子
		var chessss = {
			車: [0, 0, 0, 8],
			馬: [0, 1, 0, 7],
			象: [0, 2, 0, 6],
			仕: [0, 3, 0, 5],
			将: [0, 4],
			炮: [2, 1, 2, 7],
			卒: [3, 0, 3, 2, 3, 4, 3, 6, 3, 8]
		};
		for (var name in chessss) if (chessss.hasOwnProperty(name)) {
			for (var c = 0; c < 2; c++) {
				for (i = 0; i * 2 < chessss[name].length; i++) {
					var p = new Piece({
						id: that.chess.length,
						v: name,
						x: chessss[name][i * 2],
						y: chessss[name][i * 2 + 1],
						color: c ? 'red' : 'blue',
						map: that
					});

					if (p.color === 'blue') {
						p.x = rowLen - p.x;
					}

					that.push(p);
					that.showChess(p);
				}
			}

		}

	}());


}