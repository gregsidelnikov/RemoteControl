const UNIT_IDLE = 0;
const UNIT_MOVE = 1;
class Unit {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.targetx = this.x;
        this.targety = this.y;
        this.angle = angle;
        this.bounding = new Circle(this.x,this.y,32);
        this.target = new Segment(this.x,this.y,0,0);
        this.targetNormalized = null;
        this.drawTargetPath = true;
        this.width = 32;
        this.height = 32;
        this.action = UNIT_IDLE;

        this.moveTo = (x, y) => {
            this.targetx = x;
            this.targety = y;
            this.action = UNIT_MOVE;

            this.target.x = grid.x+this.x + 16;
            this.target.y = grid.y+this.y + 16;
            this.target.vecx = this.targetx - this.target.x;
            this.target.vecy = this.targety - this.target.y;

            this.targetNormalized = this.target.unit().multiply(2);
        }

        this.draw = () => {

            // process
            if (this.action == UNIT_MOVE) {

                // calculate distance between current and target
                var dist = this.target.length();

                //console.log(dist);

                if (dist <= 4.0) {
                    this.action = UNIT_IDLE
                }

                this.x += this.targetNormalized.vecx; // this.target.vecx / 100;
                this.y += this.targetNormalized.vecy; // this.target.vecy / 100;
            }

            // draw
            if (this.drawTargetPath) {
                this.target.x = grid.x+this.x + 16;
                this.target.y = grid.y+this.y + 16;
                this.target.vecx = this.targetx - this.target.x;
                this.target.vecy = this.targety - this.target.y;
                this.target.draw(1,'white');
            }

            unit.rotAnim(grid.x + this.x, grid.y + this.y, [0], this.angle, 32, 1, 0);

            this.bounding.x = grid.x + this.x + this.width/2;
            this.bounding.y = grid.y + this.y + this.width/2;
            this.bounding.draw("green");

            //unit.draw(Mouse.x,Mouse.y);grid.x + this.x, grid.y + this.y);
           // unit.draw(grid.x + this.x, grid.y + this.y);
        }
    }
}