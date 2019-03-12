class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $('ul').on('mousedown', 'li', (event) => {
      this.makeMove($(event.currentTarget)); 
    });
  }

  makeMove($square) {
    this.game.playMove($square.data('pos'));
    $square.toggleClass("unclicked clicked");
    $square.addClass('no-hover');
    $square.addClass(this.game.currentPlayer);
    $square.text(this.game.currentPlayer);
    const $h2 = $('h2'); 
    const $scores = $('.scores')
    if (this.game.winner() && this.game.isOver()){
      $h2.text("winner");
      if (this.game.currentPlayer === "x"){
        this.winsX = this.winsX + 1;
        $scores.text(this.winsX);
      } else {
        this.winsY = this.winsY + 1;
      }
      // window.location.reload();
    } else if (this.game.isOver()){
      $h2.text("tie");
      // window.location.reload();
    }
  }

  setupBoard() {
    const $ul = $('<ul>');
    this.$el.append($ul);
    let cord = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    for (let index = 0; index < 9; index++) {
      let $li = $("<li class='unclicked'>");
      $li.data('pos', cord[index]);
      $ul.append($li);
    }  
  }
}

module.exports = View;

