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

// magic
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let interval = null
document.querySelector(".magic").onmouseover = (event) => {
  let iteration = 0

  clearInterval(interval)

  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.value[index]
        }
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("")
    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval)
    }

    iteration += 1 / 3
  }, 110)
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
