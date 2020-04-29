(function () {
  const l = new Logger("SC", "rebeccapurple")

  if (location.hash.length <= 1) {
    l.info("Opening default tab...")
    const hash = document.querySelector(".tab-header [data-default] a").href.split("#").pop()
    location.hash = "#" + hash
  }
  l.info("Enabling tab-helper")
  function activateTab (el) {
    if (el.nodeName.toLowerCase() === "a") {
      el = el.parentNode
    } else if (el.nodeName.toLowerCase() !== "li") {
      return
    } else {
      location.hash = "#" + el.querySelector("a").href.split("#").pop()
    }

    Array.from(document.querySelectorAll(".tab-header li"))
      .forEach(t => t.classList.remove("active"))
    el.classList.add("active")
  }

  activateTab(document.querySelector(`.tab-header a[href$='${location.hash}']`))
  document.querySelector(".tab-header").addEventListener("click", ev => {
    activateTab(ev.target)
  })

  l.info("Adding javascript theme changer")
  const footer = document.querySelector(".wrapper > footer")
  const select = document.createElement("select")
  const div = document.createElement("div")
  div.appendChild(document.createTextNode("Theme: "))
  div.appendChild(select)
  footer.appendChild(div)

  const themes = Array.from(document.querySelectorAll("link[rel*='stylesheet'][title]"))
  themes.forEach(t => {
    const option = document.createElement("option")
    option.appendChild(document.createTextNode(t.title))
    select.appendChild(option)
  })

  select.value = localStorage.theme

  select.addEventListener("change", ev => {
    changeTheme(ev.target.value)
  })
})()
