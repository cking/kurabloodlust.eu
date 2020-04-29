class Logger {
  constructor(prefix, color, styles = "") {
    this.prefix = [
      `%c[${prefix}]`,
      `color: ${color}; ${styles}`
    ]
  }

  log (...args) {
    console.log.apply(
      console,
      this.prefix.concat(...args)
    )
  }

  debug (...args) {
    console.debug.apply(
      console,
      this.prefix.concat(...args)
    )
  }

  info (...args) {
    console.info.apply(
      console,
      this.prefix.concat(...args)
    )
  }

  warn (...args) {
    console.warn.apply(
      console,
      this.prefix.concat(...args)
    )
  }

  error (...args) {
    console.error.apply(
      console,
      this.prefix.concat(...args)
    )
  }

  exception (...args) {
    console.exception.apply(
      console,
      this.prefix.concat(...args)
    )
  }
}

const pl = new Logger("PL", "gold")

function changeTheme (name) {
  const themes = Array.from(document.querySelectorAll("link[rel*='stylesheet'][title]"))
  themes.forEach(t => t.disabled = true)

  pl.info(`Loading theme <${name}>`)
  let selectedTheme = themes.find(t => t.title === name)
  if (!selectedTheme) {
    l.warn("Trying to enable non existant theme! Using default theme!")
    selectedTheme = themes.find(t => !t.getAttribute("rel").includes("alternate"))
  }
  localStorage.setItem("theme", selectedTheme.title)

  selectedTheme.disabled = false
}

pl.info("Starting preload")

location.search.substr(1).split("&").forEach(p => {
  let [k, v] = p.split("=", 2)
  if (v) {
    v = decodeURIComponent(v.replace(/\+/g, " "))
  }

  switch (k) {
    case "theme":
      pl.debug("overwriting stored theme")
      localStorage.theme = v
      break

    default:
      pl.debug("unkown key:", k)
  }
})


if (localStorage.theme) {
  changeTheme(localStorage.theme)
}
