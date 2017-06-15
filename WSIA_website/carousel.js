window.onload = function(){
 show();
}
let imgs = ['<img src="http://www.farhieyecare.com/wp-content/uploads/2012/01/placeholder.png" class="inner-img">','b.png','c.png','<video controls><source src="http://wsiatest.bitballoon.com/videotrack.mp4"type="video/mp4"></video>','e.png','f.png','g.png'];
let display_i = 0;

function show(){
    document.getElementById('carousel').innerHTML = imgs[display_i];
  }
function right(){
    if(display_i === imgs.length -1){
      display_i = 0;
    }else{
      display_i += 1;
    }
    show();
}
function left(){
    if(display_i === 0){
      display_i = imgs.length - 1;
    }else{
      display_i -= 1;
    }
    show();
}