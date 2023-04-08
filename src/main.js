import "../styles/components/timeline.css"
import "../styles/neon.css"
import "../styles/components/header.css"
import "../styles/components/hero.css"
import "../styles/components/about.css"
import "../styles/components/featured.css"
import "../styles/components/work.css"
import "../styles/components/contact.css"
import "../styles/components/footer.css"
import "../styles/utils.css"
import "../styles/components/stars.css"
import "../styles/components/sponsor.css"
import "../styles/components/faq.css"

// magic
const letters = "ABCDEFGHKLNOPQRSXYZ"
let interval = null
document.querySelector(".magic").onmouseover = (event) => {
  let iteration = 0

  clearInterval(interval)

  interval = setInterval(() => {
    let a = event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.value[index]
        }
        if (event.target.innerText[index] == " ") {
          return " "
        }
        return letters[Math.floor(Math.random() * letters.length)]
      })
      .join("")
    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval)
    }

    iteration += 1 / 3
  }, 80)
}

// trailer

// const trailer = document.getElementById("trailer")

// window.onmousemove = (e) => {
//   const x = e.clientX - trailer.offsetWidth / 2,
//     y = e.clientY - trailer.offsetHeight / 2
//   const keyframes = {
//     transform: `translate(${x}px, ${y}px)`,
//   }
//   trailer.animate(keyframes, {
//     duration: 900,
//     fill: "forwards",
//   })
// }

// const blob = document.getElementById("blob")

// window.onpointermove = (event) => {
//   const { clientX, clientY } = event

//   blob.animate(
//     {
//       left: `${clientX}px`,
//       top: `${clientY}px`,
//     },
//     { duration: 3000, fill: "forwards" }
//   )
// }

$(document).ready(function () {
  var stars = 800
  var $stars = $(".stars")
  var r = 800
  for (var i = 0; i < stars; i++) {
    var $star = $("<div/>").addClass("star")
    $stars.append($star)
  }
  $(".star").each(function () {
    // var color = 'rgba('+ Math.floor(Math.random() * 255) +', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', '+ (1 - ((this.orbital) / 255)) +')';
    var cur = $(this)

    var s = 0.2 + Math.random() * 1
    var curR = r + Math.random() * 300
    cur.css({
      transformOrigin: "0 0 " + curR + "px",
      transform:
        " translate3d(0,0,-" +
        curR +
        "px) rotateY(" +
        Math.random() * 360 +
        "deg) rotateX(" +
        Math.random() * -50 +
        "deg) scale(" +
        s +
        "," +
        s +
        ")",
    })
  })
})

const buttons = document.querySelectorAll(".faq-toggle");

buttons.forEach((button) => {
  button.addEventListener("click", () =>
    button.parentElement.classList.toggle("active")
  );
});

// Scrolling terrain
(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
  window.requestAnimationFrame = requestAnimationFrame;
})();

// Terrain stuff.
var background = document.getElementById("bgCanvas"),
  bgCtx = background.getContext("2d"),
  width = window.innerWidth,
  height = Math.round(window.innerHeight / 100);

(height < 400) ? height = 400 : height;

background.width = width;
background.height = height;

function Terrain(options) {
  options = options || {};
  this.terrain = document.createElement("canvas");
  this.terCtx = this.terrain.getContext("2d");
  this.scrollDelay = options.scrollDelay || 90;
  this.lastScroll = new Date().getTime();

  this.terrain.width = width;
  this.terrain.height = height;
  this.fillStyle = options.fillStyle || "#191D4C";
  this.mHeight = options.mHeight || height;

  // generate
  this.points = [];

  var displacement = options.displacement || 140,
    power = Math.pow(2, Math.ceil(Math.log(width) / (Math.log(2))));

  // set the start height and end height for the terrain
  this.points[0] = this.mHeight;//(this.mHeight - (Math.random() * this.mHeight / 2)) - displacement;
  this.points[power] = this.points[0];

  // create the rest of the points
  for (var i = 1; i < power; i *= 2) {
    for (var j = (power / i) / 2; j < power; j += power / i) {
      this.points[j] = ((this.points[j - (power / i) / 2] + this.points[j + (power / i) / 2]) / 2) + Math.floor(Math.random() * -displacement + displacement);
    }
    displacement *= 0.6;
  }

  document.body.appendChild(this.terrain);
}

Terrain.prototype.update = function () {
  // draw the terrain
  this.terCtx.clearRect(0, 0, width, height);
  this.terCtx.fillStyle = this.fillStyle;

  if (new Date().getTime() > this.lastScroll + this.scrollDelay) {
    this.lastScroll = new Date().getTime();
    this.points.push(this.points.shift());
  }

  this.terCtx.beginPath();
  for (var i = 0; i <= width; i++) {
    if (i === 0) {
      this.terCtx.moveTo(0, this.points[0]);
    } else if (this.points[i] !== undefined) {
      this.terCtx.lineTo(i, this.points[i]);
    }
  }

  this.terCtx.lineTo(width, this.terrain.height);
  this.terCtx.lineTo(0, this.terrain.height);
  this.terCtx.lineTo(0, this.points[0]);
  this.terCtx.fill();
}


// Second canvas used for the stars
bgCtx.fillStyle = '#05004c';
bgCtx.fillRect(0, 0, width, height);

// stars
function Star(options) {
  this.size = Math.random() * 2;
  this.speed = Math.random() * .05;
  this.x = options.x;
  this.y = options.y;
}

Star.prototype.reset = function () {
  this.size = Math.random() * 2;
  this.speed = Math.random() * .05;
  this.x = width;
  this.y = Math.random() * height;
}

Star.prototype.update = function () {
  this.x -= this.speed;
  if (this.x < 0) {
    this.reset();
  } else {
    bgCtx.fillRect(this.x, this.y, this.size, this.size);
  }
}

function ShootingStar() {
  this.reset();
}

ShootingStar.prototype.reset = function () {
  this.x = Math.random() * width;
  this.y = 0;
  this.len = (Math.random() * 80) + 10;
  this.speed = (Math.random() * 10) + 6;
  this.size = (Math.random() * 1) + 0.1;
  // this is used so the shooting stars arent constant
  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
  this.active = false;
}

ShootingStar.prototype.update = function () {
  if (this.active) {
    this.x -= this.speed;
    this.y += this.speed;
    if (this.x < 0 || this.y >= height) {
      this.reset();
    } else {
      bgCtx.lineWidth = this.size;
      bgCtx.beginPath();
      bgCtx.moveTo(this.x, this.y);
      bgCtx.lineTo(this.x + this.len, this.y - this.len);
      bgCtx.stroke();
    }
  } else {
    if (this.waitTime < new Date().getTime()) {
      this.active = true;
    }
  }
}

var entities = [];

// init the stars
for (var i = 0; i < height; i++) {
  entities.push(new Star({
    x: Math.random() * width,
    y: Math.random() * height
  }));
}

// Add 2 shooting stars that just cycle.
entities.push(new ShootingStar());
entities.push(new ShootingStar());
entities.push(new Terrain({ mHeight: (height / 2) - 120 }));
entities.push(new Terrain({ displacement: 120, scrollDelay: 50, fillStyle: "rgb(17,20,40)", mHeight: (height / 2) - 60 }));
entities.push(new Terrain({ displacement: 100, scrollDelay: 20, fillStyle: "rgb(10,10,5)", mHeight: height / 2 }));

//animate background
function animate() {
  bgCtx.fillStyle = '#110E19';
  bgCtx.fillRect(0, 0, width, height);
  bgCtx.fillStyle = '#ffffff';
  bgCtx.strokeStyle = '#ffffff';

  var entLen = entities.length;

  while (entLen--) {
    entities[entLen].update();
  }
  requestAnimationFrame(animate);
}
animate();