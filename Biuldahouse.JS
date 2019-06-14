var r, g, b;
var dots = [];
var runnyness = 0.05; // the drippynes of the splatter 
var drytime = 20; // the dry time of the splatter
var concentration = 60;// the transparency of the splatter

var splatter = function(x,y,radius,r,g,b,a){
    this.x = x||0;
    this.y = y||0;
    this.g = g||0;
    this.b = b||0;
    this.r = r||0; 
    this.a = a||255; 
    this.radius = radius||0;
};
splatter.prototype.draw = function() {
    noStroke();
    fill(this.r,this.g,this.b,this.a);
    ellipse(this.x,this.y,this.radius,this.radius);
    fill(255, 255, 255,this.a);
    ellipse(this.x-this.radius/5,this.y-this.radius/5,this.radius/5,this.radius/5);
};

var Button = function(x,y,radius,r,g,b){
    this.x = x||0;
    this.y = y||0;
    this.radius = radius||0;
    this.g = g||0;
    this.b = b||0;
    this.r = r||0; 
};
Button.prototype.draw = function() {
    fill(this.r,this.g,this.b);
    stroke(255,255,255);
    strokeWeight(3);
    
    ellipse(this.x,this.y,this.radius,this.radius);
};

Button.prototype.isClicked = function() {
   
    if(dist(this.x,this.y,mouseX,mouseY)<this.radius){
        r = this.r;
        g = this.g;
        b = this.b;
        return true;
    }
    return false;
};

background(255, 255, 255);

var startX;
var startY;
fill(187, 0, 255);
var btns = [
    new Button(20,25,25,250, 8, 8), 
    new Button(50,25,25,50, 45, 181), 
    new Button(80,25,25,67, 179, 45), 
    new Button(110,25,25,227, 36, 208), 
    new Button(140,25,25,145, 233, 255), 
    new Button(170,25,25,255, 255, 51), 
    new Button(200,25,25,255, 132, 0), 
    new Button(230,25,25,255, 199, 253), 
    new Button(260,25,25,117, 74, 14), 
    new Button(290,25,25,187, 0, 255), 
    new Button(320,25,25,0, 71, 4), 
    new Button(350,25,25,170, 170, 170), 
    new Button(380,25,25,0,0,0)
]; 
var drawAll = function(){
    stroke(207, 203, 207);
    fill(255, 255, 255,100);
    rect(0,0,400,50);
    for (var i in btns){
        btns[i].draw();
    }
};
drawAll();
var mousePressed=function(){
    startX = mouseX;
    startY = mouseY;
};
var mouseReleased=function(){
    for(var i in btns){
        if(btns[i].isClicked()){
            return;
        }
    }
    
    var generator = new Random(1);
    var standardDeviation =  constrain(dist(startX,startY,mouseX,mouseY),10,50);
    // println(standardDeviation);
    var numDots = random(60,100);
    noStroke();
    for(var i = 0;i<numDots;i++){
        var numX = generator.nextGaussian();
        var numY = generator.nextGaussian();
        var xStepSize = standardDeviation * numX + mouseX;
        var yStepSize = standardDeviation * numY + mouseY;
        var size = random(0,0.5)*standardDeviation;
        var color = random(255);
        fill(r,g,b,180);
        dots.push(new splatter(xStepSize,yStepSize,size,r,g,b,concentration));
        //ellipse(xStepSize,yStepSize,size,size);
    }
    drawAll();

};
var count = 0;
var prevcount = 0;
draw = function() {
    if(count > prevcount+abs(drytime)){
         fill(255,255,255,2);
        rect(0,0,width,height);
        prevcount = count;
    }
   
    count++;
    for(var i in dots){
        dots[i].y+=runnyness;
        dots[i].a-=1;
        dots[i].radius-=0.1*runnyness;
        if(dots[i].radius <= 5){
            dots[i].radius = 5;
        } 
        if(dots[i].a <= 0){
            dots.splice(i,1);
        }else{
            dots[i].draw();
        }
        
    }
    drawAll();
};
