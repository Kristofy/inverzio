let r;
let center;
let once;
let lastpos;
let curr;
let original;
let originals = [];
let points=[];
let inside = [];
let outside = [];
const ACC=0.1;
let szamlalo=0;
let elso;

function setup() {
	createCanvas(600, 600).parent("#parent");
    lastpos = new Vec2();
    curr = new Vec2();
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
    original = new Line();
    originals = [];
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
    szamlalo=0;
}

function toDeg(rad){
    return (180/PI)*rad;
}
function toRad(deg){
    return (deg*PI)/180;
}

function invert(){
    
    for(let original of originals){
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
    }
        
        noLoop();

}

function lineToPoints(lineObj){
    let x,y;
    let arr = [];
    let b=lineObj.first.y-lineObj.second.y;
        for(let i=b;i>=0;i-=ACC){
            y=i;
            x=i/Math.tan(toRad(lineObj.angle));        
            if(lineObj.first.x>lineObj.second.x){
                x=lineObj.first.x-x;
            }else{
                x=lineObj.first.x+x;
            }
            y=lineObj.first.y-y;
            arr.push(new Vec2(x,y));
        }
    return arr;
}
/*
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
        line(lastpos.x,lastpos.y,mouseX,mouseY);
        
    }
}
*/
function mousePressed() {
    if(mouseX>=0&&mouseX<=width&&mouseY>=0&&mouseY<=height){
        if (once) {
            console.log(`eleje \tx: ${mouseX}, y: ${mouseY}`);
            lastpos.set(mouseX,mouseY);
            once = !once;
            elso=Object.assign({},lastpos);
        } else {
            console.log(`vege \tx: ${mouseX}, y: ${mouseY}`);
            strokeWeight(2);
            stroke(255);
            ellipse(center.x, center.y, r*2);
            ellipse(center.y, center.y, r * 4);
            ellipse(center.x,center.y,3);
            curr.set(mouseX,mouseY);
            original.set(curr,lastpos);
            originals.push(Object.assign({},original));
            original.show();
            lastpos=Object.assign({},curr);
            szamlalo++;
            console.log(original);
            console.log(originals)
            if(szamlalo==2){
                original.set(curr,elso);
                originals.push(Object.assign(original));
                original.show();
                console.log(original);
                console.log(originals)
            }
        }
    
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

class Line{

    constructor(){
        this.ready=false;    
    }
    set(a,b){
        if(a.y>b.y){
            this.first=Object.assign({}, a);
            this.second=Object.assign({}, b);    
        }else{
            this.second=Object.assign({}, a);
            this.first=Object.assign({}, b);    
        }
        this.angle=toDeg(Math.asin((this.first.y-this.second.y)/dist(this.first.x, this.first.y, this.second.x, this.second.y)));
        
        this.ready=true;
    }
    show(){
        strokeWeight(1);
        noFill();
        stroke(255);
        line(this.first.x,this.first.y,this.second.x,this.second.y);
    }
}