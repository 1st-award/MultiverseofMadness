class Space{
    constructor(){
        this.x=random(300,500);
    this.y=random(-700,0);
      this.Size = random(10,30);
    }

    display(){
        push();
        translate(this.x, this.y);
        //rotate(PI*10);
        ellipse(this.x,this.y,this.Size,this.Size);
        fill(random(200,255),0,random(200,255));
        pop();
    }
}
