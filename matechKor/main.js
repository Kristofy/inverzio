let r;
let center;
let once;
let lastpos;
let curr;
let original;
let points=[];
let inside = [];
let outside = [];
const ACC=0.1;

function setup() {
	createCanvas(600, 600).parent("#parent");
    r = width / 4;  
	center = new Vec2(width / 2, height / 2);


	noFill();
    this.clearCanvas();
    console.log("Application ready");
}

this.clearCanvas=function(){
    console.log("torles");
    lastpos = new Vec2();
    curr = new Vec2();
    original = new Circle();
    once = true;
    background(0);
    strokeWeight(2);
	stroke(255);
    ellipse(center.x, center.y, r*2);
    ellipse(center.y, center.y, r * 4);
    ellipse(center.x,center.y,3);
    points=[];
    inside=[];
    outside=[];
}

function toDeg(rad){
    return (180/PI)*rad;
}
function toRad(deg){
    return (deg*PI)/180;
}

function invert(){
    console.log("invert started");
        points=lineToPoints(original);
        let d;
        for(let i=points.length-1;i>=0;--i){
            d=dist(points[i].x,points[i].y,center.x,center.y);
            if(d>r*2){
                points.splice(i,1);
                continue;
            }
            if(d>r){
 
                outside.push(points[i]);
            }else{
                inside.push(points[i]);
            }
        }
        strokeWeight(3);
        
        for(let i of inside){
            stroke(0,255,0);
            ellipse(i.x,i.y,3);

            let b
            if(i.y<center.y){
                b=center.y-i.y;
            }else{
                b=i.y-center.y
            }
            let d=dist(i.x,i.y,center.x,center.y);
            i.setangle(Math.acos(b/d));
            stroke(255,0,0,30)
            //line(center.x,center.y,i.x,i.y);


            let x = (r)* Math.sin(i.angle);
            if(i.x<center.x){
             x= -x;   
            }
            let y=(r)* Math.cos(i.angle);
            if(i.y<center.y){
                y= -y;
            }
            stroke(255,255,0)
            x+=center.x;
            y+=center.y;
            ellipse(x,y,3);

            let move=dist(x,y,i.x,i.y);
            move=r+move;
            let nextx,nexty;

            nextx = (move)* Math.sin(i.angle);
            if(i.x<center.x){
             nextx= -nextx;   
            }
            nexty=(move)* Math.cos(i.angle);
            if(i.y<center.y){
                nexty= -nexty;
            }
            nextx+=center.x;
            nexty+=center.y;

            stroke(0,255,255);
            ellipse(nextx,nexty,3);


        }

        for(let o of outside){
            stroke(0,0,255)
            ellipse(o.x,o.y,3);
            let b
            if(o.y<center.y){
                b=center.y-o.y;
            }else{
                b=o.y-center.y
            }
            let d=dist(o.x,o.y,center.x,center.y);
            o.setangle(Math.acos(b/d));
            stroke(255,0,0,30)
            //line(center.x,center.y,o.x,o.y);


            let x = (2*r)* Math.sin(o.angle);
            if(o.x<center.x){
             x= -x;   
            }
            let y=(2*r)* Math.cos(o.angle);
            if(o.y<center.y){
                y= -y;
            }
            stroke(255,255,0)
            x+=center.x;
            y+=center.y;
            ellipse(x,y,3);

            let move=dist(x,y,o.x,o.y);
            let nextx,nexty;

            nextx = (move)* Math.sin(o.angle);
            if(o.x<center.x){
             nextx= -nextx;   
            }
            nexty=(move)* Math.cos(o.angle);
            if(o.y<center.y){
                nexty= -nexty;
            }
            nextx+=center.x;
            nexty+=center.y;

            stroke(0,255,255);
            ellipse(nextx,nexty,3);

        }


   
        noLoop();
        
    }
function mousePressed() {
    if(mouseX>=0&&mouseX<=width&&mouseY>=0&&mouseY<=height){
        if (once) {
            console.log(`eleje \tx: ${mouseX}, y: ${mouseY}`);
            lastpos.set(mouseX,mouseY);
            once = !once;
        } else {
            console.log(`vege \tx: ${mouseX}, y: ${mouseY}`);
            background(0);
            strokeWeight(2);
            stroke(255);
            ellipse(center.x, center.y, r*2);
            ellipse(center.y, center.y, r * 4);
            ellipse(center.x,center.y,3);
            curr.set(mouseX,mouseY);
            original.set(new Vec2(lastpos.x,lastpos.y),dist(lastpos.x,lastpos.y,curr.x,curr.y));
            original.show();
        }
    
    }
}

function lineToPoints(circleObj){
    let x,y;
    let arr = [];
        for(let i=0;i<TWO_PI;i+=ACC){
            x=cos(i)*circleObj.r;
            y=sin(i)*circleObj.r;
            x+=original.center.x;
            y+=original.center.y;
            arr.push(new Vec2(x,y));
        }
    return arr;
}

function mouseMoved(){
    if(mouseX>=0&&mouseX<=width&&mouseY>=0&&mouseY<=height)
    if(!once&&!original.ready){
        background(0);
        strokeWeight(2);
        noFill();
        stroke(255);
        ellipse(center.x, center.y, r*2);
        ellipse(center.y, center.y, r * 4);
        ellipse(center.x,center.y,3);
        strokeWeight(1);
        stroke(0,0,255);
        ellipse(lastpos.x,lastpos.y,dist(lastpos.x,lastpos.y,mouseX,mouseY)*2);
        
    }
}



class Vec2 {
    constructor(x, y) {
        this.y = y;
        this.x = x;
        this.angle=null;
	}

    set(x,y){
        this.y = y;
		this.x = x;
    }
    setangle(a){
        this.angle=a;
    }
}

class Circle{

    constructor(){
        this.ready=false;    
    }
    set(a,b){
        console.log(a);
            this.center=Object.assign({}, a);
            this.r=b;            
        this.ready=true;
    }
    show(){
        strokeWeight(1);
        noFill();
        stroke(255);
        ellipse(this.center.x,this.center.y,this.r*2);
    }
}