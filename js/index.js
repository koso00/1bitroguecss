var app = new Vue({
  el :"#app",
  data : {
    clock : 0,
    x : 1,
    y : 1,
    moving :false,
    keydown : false,
    direction : "down",
    cacheddirection : "down",
    interval : "",
    map : [[1,1,1,1,1,1,1],
          [1,0,0,0,0,0,1],
           [1,0,0,0,0,0,1],
           [1,0,0,0,0,0,1],
          [1,0,0,0,0,0,1]],
    template : `<div class="face one">

        </div>
        <div class="face two">

        </div>
        <div class="face three">

        </div>
        <div class="face four">

        </div>
        <div class="face five">

        </div>
        <div class="face six">
        </div>`
  },
  mounted : async function(){
    /*m = await new Dungeon(20,20)
    m.generate();
    this.map = m.getCollisionMap();
    this.x = m.getStairs().up.x;
    this.y = m.getStairs().up.y;*/
    self = this;
    setInterval(function(){self.clock = !self.clock},200)
  },
  computed : {
    computedx : function(){
      return this.x * 32;
    },
    computedy : function(){
      return this.y * 32;
    },
    cango : function(){
       var ret = true
       y = this.y;
       x = this.x;
      switch(this.direction){
        case "up" :
        if (this.map[y-1][x]!= 1) {ret = true}else{ret =  false;}
        break;
        case "down" :
        if (this.map[y+1][x]!= 1) {ret =  true}else{ret =  false;}
        break;
        case "left" :
        if (this.map[y][x-1]!= 1) {ret =  true}else{ret =  false;}
        break;
        case "right" :
        if (this.map[y][x+1]!= 1) {ret =  true}else{ret =  false;}
        break;
      }
      return ret
    }
  },
  created: function () {
    window.addEventListener('keydown',this.setkeydown);
    window.addEventListener('keyup',this.setkeyup);
  },
  methods : {
    setkeydown : function(event){
        switch(event.keyCode){
          case 38: // UP
              this.direction = "up";
          break;
          case 39: // RIGHT
              this.direction = "right";
          break;
          case 40: // DOWN
              this.direction = "down";
          break;
          case 37: // LEFT
              this.direction = "left";
          break;
      }
      this.keydown = true;
    },
    setkeyup : function(event){
      this.keydown = false;
    },

    move : function(){

        this.moving = true;
        switch(this.cacheddirection){
        case "up":
          if (this.y > 0) {this.y--;}break;
        case "down" :
          this.y++;break;
        case "left" :
          if (this.x > 0) {this.x--;}break;
        case "right" :
          this.x++;break;
        }
      self = this
      setTimeout(function(){self.moving = false;},500)
    },
    getwalltype(index,i){
      m = this.map;
      r = ""
      if (m[index][i] == 1){
          r = "wall"
          if (index == m.length-1){
            r = "wall-bottom";
          }else{
            if (m[index+1][i] != 1){
              r = "wall-bottom";
            }
          }

      }
      return r;
    }

  },
  watch : {
      keydown: function(val){
        if (this.moving == false && val == true ){
          this.cacheddirection = this.direction;
          if (this.cango){
            this.move();
          }
        }

      },
      moving : function(val){
        if (val == false && this.keydown == true){
          this.cacheddirection = this.direction;
          if (this.cango){
            this.move();
          }
        }
      }
    }
})
