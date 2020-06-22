
window.addEventListener('DOMContentLoaded', (event) =>{



    let far = 3
    
    let keysPressed = {}

    let realbump = -1
    let raymake = 100

    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
     });
     
     document.addEventListener('keyup', (event) => {
         delete keysPressed[event.key];
      });




    let tutorial_canvas = document.getElementById("tutorial");
    let tutorial_canvas_context = tutorial_canvas.getContext('2d');


    tutorial_canvas.style.background = "#000000"


    class Triangle{
        constructor(x, y, color, length){
            this.x = x
            this.y = y
            this.color= color
            this.length = length
            this.x1 = this.x + this.length
            this.x2 = this.x - this.length
            this.tip = this.y - this.length*2
            this.accept1 = (this.y-this.tip)/(this.x1-this.x)
            this.accept2 = (this.y-this.tip)/(this.x2-this.x)

            observer.obstacles.push(this)

        }

        draw(){
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.stokeWidth = 3
            tutorial_canvas_context.moveTo(this.x, this.y)
            tutorial_canvas_context.lineTo(this.x1, this.y)
            tutorial_canvas_context.lineTo(this.x, this.tip)
            tutorial_canvas_context.lineTo(this.x2, this.y)
            tutorial_canvas_context.lineTo(this.x, this.y)
            tutorial_canvas_context.stroke()
        }

        isPointInside(point){
            if(point.x <= this.x1){
                if(point.y >= this.tip){
                    if(point.y <= this.y){
                        if(point.x >= this.x2){
                            this.accept1 = (this.y-this.tip)/(this.x1-this.x)
                            this.accept2 = (this.y-this.tip)/(this.x2-this.x)
                            this.basey = point.y-this.tip
                            this.basex = point.x - this.x
                            if(this.basex == 0){
                                return true
                            }
                            this.slope = this.basey/this.basex
                            if(this.slope >= this.accept1){
                                return true
                            }else if(this.slope <= this.accept2){
                                return true
                            }
                        }
                    }
                }
            }
            return false
        }
    }


    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){
            this.x+=this.xmom
            this.y+=this.ymom
        }
        isPointInside(point){
            if(point.x >= this.x){
                if(point.y >= this.y){
                    if(point.x <= this.x+this.width){
                        if(point.y <= this.y+this.height){
                        return true
                        }
                    }
                }
            }
            return false
        }
    }
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){

            this.height = 0
            this.width = 0
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.lens = 0
        }   
        balance(){

        }    
         draw(){
            tutorial_canvas_context.lineWidth = 1
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){
            this.xmom*=.93
            this.ymom*=.93
            this.x += this.xmom
            this.y += this.ymom

            if(this == wiggles.body){
                tutorial_canvas_context.translate((-this.xmom),(-this.ymom))
            }
        }
        isPointInside(point){
            this.areaY = point.y - this.y 
            this.areaX = point.x - this.x
            if(((this.areaX*this.areaX)+(this.areaY*this.areaY)) <= (this.radius*this.radius)){
                return true
            }
            return false
        }
    }

    class Line{
        constructor(x,y, x2, y2, color, width){
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        hypotenuse(){
            let xdif = this.x1-this.x2
            let ydif = this.y1-this.y2
            let hyp = (xdif*xdif)+(ydif*ydif)
            return Math.sqrt(hyp)
        }
        draw(){



            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = this.width

            tutorial_canvas.style.s
            tutorial_canvas_context.beginPath(); 
    
            tutorial_canvas_context.moveTo(this.x1, this.y1); 
            
            tutorial_canvas_context.lineTo(this.x2, this.y2); 
            tutorial_canvas_context.stroke();  


            tutorial_canvas_context.lineWidth = 1
        }
    }



    let clunk = 3.6
    // let bummer = 0
    class Segment{
        constructor(link){
            this.dampen = 0
            this.length = 1.1
            this.link = link
            this.body =  new Circle(300+far+Math.random(),200,clunk,"white")
            this.beam = new Line(this.body.x, this.body.y, this.link.x, this.link.y, "red", 10)
            far+=3
            clunk-=.03

            // this.color = "white"
            // if(Math.random()<.3){
            this.color = 'red'
        
            if(Math.random()<.3){
            this.color = 'yellow'
            }
            if(Math.random()<.3){
            this.color = 'white'
            }
            if(Math.random()<.3){
            this.color = 'brown'
            }
        // }
    //     if(Math.random()<.3){
    //     this.color = 'orange'
    
    //     if(Math.random()<.3){
    //     this.color = 'pink'
    //     }
    //     if(Math.random()<.3){
    //     this.color = 'teal'
    //     }
    //     if(Math.random()<.3){
    //     this.color = 'gray'
    //     }
    // }
    // if(Math.random()<.3){
    // this.color = 'cyan'

    // if(Math.random()<.3){
    // this.color = 'purple'
    // }
    // if(Math.random()<.3){
    // this.color = 'green'
    // }
    // if(Math.random()<.3){
    // this.color = 'yellow'
    // }
// }
        }
        balance(){
            this.beam = new Line(this.body.x, this.body.y, this.link.x, this.link.y, "red", 2*this.body.radius)
            if(this.beam.hypotenuse() > this.length+1){
                        let xmomavg =  (this.body.ymom + (this.link.xmom*12))/13
                        let ymomavg =  (this.body.ymom + (this.link.ymom*12))/13
                        this.body.xmom = ((this.body.xmom*19)+xmomavg)/20
                        this.link.xmom =  ((this.link.xmom*19)+xmomavg)/20
                        this.body.ymom =  ((this.body.ymom*19)+ymomavg)/20
                        this.link.ymom = ((this.link.ymom*19)+ymomavg)/20
                        this.body.xmom -= .35*(this.body.x-this.link.x)/(this.length/1.1)
                        this.link.xmom += .35*(this.body.x-this.link.x)/(this.length/1.1)
                        this.body.ymom -= .35*(this.body.y-this.link.y)/(this.length/1.1)
                        this.link.ymom += .35*(this.body.y-this.link.y)/(this.length/1.1)
            }
            if(this.beam.hypotenuse() < this.length-1){


                // console.log(this)
                        let xmomavg =  (this.body.xmom + (this.link.xmom*12))/13
                        let ymomavg =  (this.body.ymom + (this.link.ymom*12))/13
                        this.body.xmom = ((this.body.xmom*19)+xmomavg)/20
                        this.link.xmom =  ((this.link.xmom*19)+xmomavg)/20
                        this.body.ymom =  ((this.body.ymom*19)+ymomavg)/20
                        this.link.ymom = ((this.link.ymom*19)+ymomavg)/20
                        this.body.xmom += .35*(this.body.x-this.link.x)/(this.length/1.1)
                        this.link.xmom -= .35*(this.body.x-this.link.x)/(this.length/1.1)
                        this.body.ymom += .35*(this.body.y-this.link.y)/(this.length/1.1)
                        this.link.ymom -= .35*(this.body.y-this.link.y)/(this.length/1.1)
                        // console.log(this)
            }

        }
        draw(){         
            tutorial_canvas_context.strokeStyle = "white"
               this.beam = new Line(this.body.x, this.body.y, this.link.x, this.link.y,this.color, 2*this.body.radius)

            // this.body.draw()
            this.beam.draw()
        }
        move(){
            let bump = 0
            let xkill = 0
            let ykill = 0
            for(let t = 0; t<wiggles.obstacles.length; t++){
                if(wiggles.obstacles[t].isPointInside(this.body)){
                    bump = 1
                    xkill = -(this.body.x-wiggles.obstacles[t].x)/wiggles.obstacles[t].radius
                    ykill = -(this.body.y-wiggles.obstacles[t].y)/wiggles.obstacles[t].radius
                }
                if(wiggles.obstacles[t].isPointInside(this.link)){
                    bump = 1
                    xkill = -(this.link.x-wiggles.obstacles[t].x)/wiggles.obstacles[t].radius
                    ykill = -(this.link.y-wiggles.obstacles[t].y)/wiggles.obstacles[t].radius
                }
            }
            if(bump == 0){
                this.body.ymom+=.1  //09
            }else{

                this.body.ymom-=.74*ykill
                this.link.ymom-=.74*ykill
                this.body.xmom-=.74*xkill
                this.link.xmom-=.74*xkill
                this.body.ymom*=.8
                this.body.xmom*=.8
                this.link.ymom*=.8
                this.link.xmom*=.8
                // this.body.move()


            for(let t = 1; t<wiggles.segments.length;t++){

                wiggles.segments[t].body.ymom*=.97
                wiggles.segments[t].body.xmom*=.97
                // wiggles.segments[t].link.ymom*=.99
                // wiggles.segments[t].link.xmom*=.99
            }
            }
            this.body.move()
            this.link.move()
        }


    }

    class Snake{
        constructor(){
            this.dampen = 0
            this.obstacles = []
            this.body = new Circle(300,200, 4, "white")

            tutorial_canvas_context.translate((50),(150))
            this.segments = []
            this.segments.push(this.body)
            let segment
            for(let t = 0;t<100;t++){
                if(t == 0){
                    segment = new Segment(this.segments[t])
                }else{
                    segment = new Segment(this.segments[t].body)
                }
                // console.log(segment)
                this.segments.push(segment)
            }


        }
        draw(){
            
            this.dampen++
            // this.body.ymom+=.09
            for(let t = 0; t<this.obstacles.length;t++){
                this.obstacles[t].draw()
            }


                for(let t = 1; t<this.segments.length;t++){
                    this.segments[t].draw()
                    this.segments[t].balance()
                    this.segments[t].move()
                }
            


            this.control()

            this.body.draw()
        }
        control(){
            if(keysPressed['w']){
                this.body.ymom-=1.5
                this.body.y-=1.5
                tutorial_canvas_context.translate((0),(1.5))
            } 
             if(keysPressed['s']){
                this.body.ymom+=1.5
                this.body.y+=1.5
                tutorial_canvas_context.translate((0),(-1.5))
            }
             if(keysPressed['a']){
                this.body.xmom-=1.5
                this.body.x-=1.5
                tutorial_canvas_context.translate((1.5),(0))
            }
             if(keysPressed['d']){
                this.body.xmom+=1.5
                this.body.x+=1.5
                tutorial_canvas_context.translate((-1.5),(0))
            }
        }

    }
    let wiggles = new Snake()

    let floortangle = new Circle(500, 1600, 1000, "blue")
    // let step = new Rectangle(400, 570, 700,700, "blue")

    wiggles.obstacles.push(floortangle)
    // wiggles.obstacles.push(step)


    for(let t=0; t<13; t++){

        let floortanglex = new Circle(t*50, t*50,20, "blue")

        wiggles.obstacles.push(floortanglex)
    }
    // for(let t=0; t<5; t++){

    //     let floortanglex = new Circle(Math.random()*tutorial_canvas.width,Math.random()*tutorial_canvas.height, 20, "blue")

    //     wiggles.obstacles.push(floortanglex)
    // }
    window.setInterval(function(){ 
        tutorial_canvas_context.clearRect(-10000,-10000,tutorial_canvas.width*100, tutorial_canvas.height*100)
        wiggles.draw()
    }, 14) 

    function intersects(circle, left) {
        var areaX = left.x - circle.x;
        var areaY = left.y - circle.y;
       if(areaX * areaX + areaY * areaY <= circle.radius * circle.radius*1.1){

        if(circle.lens == 1){
            left.ymom  += (circle.y-left.y)/circle.ref
            left.xmom  += (circle.x-left.x)/circle.ref
        }
        return true
       }
       return false
    }


// random color that will be visible on  black background
function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 15)+1)];
    }
    return color;
  }

  function Ra(isn){
    let out = isn*0.0174533
    out = out%(Math.PI*2)
    return out
}

function Rax(isn){
    let out = isn*(180 / Math.PI)
    for(let i = 0;out<0;i++){
        out+=360
    }
    out = out%360
    // //console.log(out)
    return out
}

    
})