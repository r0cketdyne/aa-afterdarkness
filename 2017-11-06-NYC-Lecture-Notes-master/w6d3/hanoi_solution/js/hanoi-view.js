/* jshint esversion: 6 */

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.fromTowerIdx = null;

    this.$el.on(
      "click",
      "ul",
      this.clickTower.bind(this)
    );

    this.setupTowers();
    this.render();
  }

  clickTower(event) {
    const clickedTowerIdx = $(event.currentTarget).index();

    if (this.fromTowerIdx === null) {
      this.fromTowerIdx = clickedTowerIdx;
    } else {
      if (!this.game.move(this.fromTowerIdx, clickedTowerIdx)) {
        alert("Invalid Move! Try again.");
      }

      this.fromTowerIdx = null;
    }

    this.render();

    if (this.game.isWon()) {
      // Remove click handler when done.
      this.$el.off("click");
      this.$el.addClass("game-over");
      alert("Good work, you!");
    }
  }

  setupTowers() {
    /*
    We're setting up the skeleton for our towers
    here. It consist of three <ul> elements, all
    floated left, with each three nested <li>s.
    Because the <ul>s are floated, we need to
    add the `.group` class, containing the clearfix,
    to their parent. The <li> elements all will be
    invisible by default. Adding a disk class to
    them will make them visible.
    */

    this.$el.empty();
    this.$el.addClass("group");

    let $tower, $disk;

    for (let towerIdx = 0; towerIdx < 3; towerIdx++) {
      $tower = $("<ul>");

      for (let diskIdx = 0; diskIdx < 3; diskIdx++) {
        $disk = $("<li>");
        $tower.append($disk);
      }

      this.$el.append($tower);
    };
  }

  render() {
    /*
    Rather than removing all our elements from the page
    and building them up again, we are removing only the
    classes and re-adding them as necessary. This is a
    more light-weight approach and will speed up the
    redrawing in the browser.
    */
    const $towers = this.$el.find("ul");
    // with no argument removes all classes
    $towers.removeClass();

    if (this.fromTowerIdx !== null) {
      $towers.eq(this.fromTowerIdx).addClass("selected");
    }

    this.game.towers.forEach( (disks, towerIdx) => {
      const $disks = $towers.eq(towerIdx).children();
      $disks.removeClass();

      disks.forEach( (diskWidth, diskIdx) => {
        /*
        Since our disks are stacked from bottom to top
        as [3, 2, 1], we have to select from the back
        of our jQuery object, using negative indices.
        */
        $disks.eq(-1 * (diskIdx + 1)).addClass(`disk-${diskWidth}`);
      });
    });
  }

}

module.exports = View;
