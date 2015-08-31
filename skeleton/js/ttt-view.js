(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {

    this.$el.on("click", ".cell", (function (event) {
      var $square = $(event.currentTarget);
      this.makeMove($square);
    }).bind(this));
  };

  View.prototype.makeMove = function ($square) {
    var mark = this.game.currentPlayer;
    try {
      this.game.playMove($square.data("pos"));
      $square.addClass("clicked");
      $square.addClass(mark);
    } catch (MoveError) {
      alert("Invalid move");
    }
    if (this.game.isOver()) {
      if (this.game.winner()) {
        $(".ttt").addClass("over").addClass(this.game.winner());
      } else {
        $(".ttt").addClass("over").addClass("draw");
      }
    }
  };

  View.prototype.setupBoard = function () {
    this.$el.append("<h1>Tic-Tac-Toe</h1>");
    for (var i = 0; i < 3; i++) {
      var $row = $("<div></div>").addClass("row").addClass("group");
      this.$el.append($row);
      for (var j = 0; j < 3; j++) {
        $row.append($("<div class='cell'></div>").data("pos", [i, j]));
      }
    }
  };

})();
