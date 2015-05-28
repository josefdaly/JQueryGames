(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$gameContainer = $el;
    this.setupBoard();
    this.bindEvents();
    this.currentPlayer = game.currentPlayer;
  };

  View.prototype.bindEvents = function () {
    var game = this.game;
    var that = this;
    $('.square').on('click', function(event){
      var $square = $(event.currentTarget);
      try {
        game.playMove($square.data("pos"));
        that.makeMove($square);
      } catch (error) {
        if (error instanceof TTT.MoveError){
          alert(error.msg);
        } else {
          throw error;
        }
      }
    });
  };

  View.prototype.makeMove = function ($square) {
    var mark = this.currentPlayer;
    var game = this.game;
    var endMessage;
    $square.removeClass("unplayed").addClass("played " + mark).append(mark);

    this.currentPlayer = game.currentPlayer;
    if (game.isOver()) {
      $('.square').off('click');
      if (game.winner()){
        var winnerMark = game.winner();
        $('.' + winnerMark).addClass('winner');

        endMessage = winnerMark + " has won!";
      } else {
        endMessage = "Nobody has won!";
      }
      $('.end-message').append(endMessage);
      $('.unplayed').removeClass('unplayed').addClass('played');
    }
  };

  View.prototype.setupBoard = function () {
    var $container = this.$gameContainer;
    for (var i=0; i< 3; i++) {
      $('<div>').addClass('row').appendTo($container);
      for (var j = 0; j < 3; j++){
        var $lastRow = $container.children().last();
        $('<div>').addClass('square unplayed').appendTo($lastRow);
        var $square = $lastRow.children().last();
        $square.data("pos", [i,j]);
      }
    }
  };
})();
