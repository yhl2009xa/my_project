/**
 * Created by Administrator on 2017/6/14.
 * 每个点的坐标
 */
var Spot = function(pos){
    this.x = pos.x;
    this.y = pos.y;
    this.z = pos.z;
};

/**
 *
 * @param dir
 * @param ang
 */
Spot.prototype.rotate = function(dir, ang) {
    const X = this.x;
    const Y = this.y;
    const Z = this.z;
    const SIN = Math.sin(ang);
    const COS = Math.cos(ang);

    if (dir === "x") {
        this.y = Y * COS - Z * SIN;
        this.z = Y * SIN + Z * COS;
    } else if (dir === "y") {
        this.x = X * COS - Z * SIN;
        this.z = X * SIN + Z * COS;
    }
};

Spot.prototype.project = function() {
    const ZP = this.z + 2.5;
    const DIV = ZP / 600;
    const XP = (this.x ) / DIV;
    const YP = (this.y) / DIV;
    return [XP, YP, ZP];
};

