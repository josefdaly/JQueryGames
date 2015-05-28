(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.$gameContainer = $el;
    this.bindEvents();
    this.setupTowers();
    this.$startTower = null;
    this.$endTower = null;
  };

  View.prototype.setupTowers = function(){
    var $firstTower = $('.tower.first');
    var $discs = $firstTower.children();
    $discs.eq(0).addClass('small');
    $discs.eq(1).addClass('medium');
    $discs.eq(2).addClass('large');
  };

  View.prototype.bindEvents = function(){
    var game = this.game;
    var that = this;
    $('.tower').on('click', function(event){
      var $clickedTower = $(event.currentTarget);

      if (that.$startTower) {
        that.$endTower = $clickedTower;
      } else {
        that.$startTower = $clickedTower;
      }

      if (that.$startTower && that.$endTower) {
        var startIdx = that.$startTower.data("towerindex");
        var endIdx = that.$endTower.data("towerindex");
        if (game.move(startIdx, endIdx)) {
          that.makeMove(that.$startTower, that.$endTower);
        } else {
          alert("Illegal Move!");
        }
        that.$startTower = null;
        that.$endTower = null;
      }
      that.checkWin();
    });
  };

  View.prototype.checkWin = function() {
    var that = this;
    var game = that.game;
    if (game.isWon()) {
      $('.tower').off('click');
      var $firstTwoDiscs = $.merge( $('.small') , $('.medium') );
      var $winningDiscs = $.merge( $firstTwoDiscs ,  $('.large') );

      $winningDiscs.addClass('won');

      alert("You win!");
    }
  }

  View.prototype.makeMove = function($startTower, $endTower){
    console.log("i'm making a move");

    var classToAdd = this.findDiscToRemove($startTower.children());
    this.addDisc($endTower.children(), classToAdd);
    console.log("i'm making a move");
    console.log("i'm making a move");

  };

  View.prototype.addDisc = function($children, classToAdd) {
    var i = 2;
    var condition = true;

    while (condition && i >= 0) {
      var $disc = $children.eq(i);
      if ($disc.attr('class').split(" ").length === 1){
        condition = false;
        $disc.addClass(classToAdd);
      }
      i--;
    }
  };

  View.prototype.findDiscToRemove = function($children){
    var classToTake = null;
    var i = 0;
    while (classToTake === null) {
      var $disc = $children.eq(i);
      var classesArray = $disc.attr("class").split(" ");
      if (classesArray.length === 2) {
        $disc.removeClass("disc");
        classToTake = $disc.attr("class");
        $disc.removeClass(classToTake);
        $disc.addClass("disc");
      }
      i++;
    }
    return classToTake;
  };

})();
