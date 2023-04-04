import "../styles/neon.css"
import "../styles/components/header.css"
import "../styles/components/hero.css"
import "../styles/components/about.css"
import "../styles/components/featured.css"
import "../styles/components/work.css"
import "../styles/components/contact.css"
import "../styles/components/footer.css"
import "../styles/utils.css"

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
    console.log(event.target.dataset.value)
    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval)
    }

    iteration += 1 / 3
  }, 30)
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
//     duration: 800,
//     fill: "forwards",
//   })
// }

const blob = document.getElementById("blob")

window.onpointermove = (event) => {
  const { clientX, clientY } = event

  blob.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 3000, fill: "forwards" }
  )
}
