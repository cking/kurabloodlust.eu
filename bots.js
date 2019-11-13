[
  {
    "bot": "pixy@fedi.z0ne.moe",
    "owner": "kura@fedi.z0ne.moe",
    "cat": "image"
  },
  {
    "bot": "nierbot@pikachu.rocks",
    "owner": "dielan@shitposter.club",
    "cat": "image"
  },
  {
    "bot": "xenobot@blob.cat",
    "owner": "dielan@shitposter.club",
    "cat": "image"
  },
  {
    "bot": "botbot@stereophonic.space",
    "owner": "dielan@shitposter.club",
    "cat": "image"
  },
  {
    "bot": "gembot@enigmatic.observer",
    "owner": "dielan@shitposter.club",
    "cat": "image"
  },
  {
    "bot": "febot@kawen.space",
    "owner": "dielan@shitposter.club",
    "cat": "image"
  },
  {
    "bot": "wocbot@neckbeard.xyz",
    "owner": "dielan@shitposter.club",
    "cat": "image"
  },
  {
    "bot": "vbot@shigusegubu.club",
    "owner": "dielan@shitposter.club",
    "cat": "image"
  },
  {
    "bot": "ffbot@shigusegubu.club",
    "owner": "dielan@shitposter.club",
    "cat": "image"
  },
  {
    "bot": "skeletor@shitposter.club",
    "owner": "dielan@shitposter.club",
    "cat": "image"
  },
  {
    "bot": "flatbot@neckbeard.xyz",
    "owner": "dielan@shitposter.club",
    "cat": "image"
  },
  {
    "bot": "blondebot@yorishiro.space",
    "owner": "dielan@shitposter.club",
    "cat": "image"
  },
  {
    "bot": "Hornybot@neckbeard.xyz",
    "owner": "dielan@shitposter.club",
    "cat": "image"
  },
  {
    "bot": "elfbot@welovela.in",
    "owner": "dielan@shitposter.club",
    "cat": "image"
  },
  {
    "bot": "sataniabot@satania.space",
    "owner": "satanya@satania.space",
    "cat": "image",
  }
].forEach(async (entry) => {
  try {
    const bot = resolv(entry.bot)
    const owner = resolv(entry.owner)

    const fingeredBot = await finger(bot)
    const botProfile = fingeredBot.find(e =>
      e.rel === "http://webfinger.net/rel/profile-page" || e.rel === "https://webfinger.net/rel/profile-page").
      href
    const botAP = fingeredBot.find(e =>
      e.type === "application/activity+json").href
    const botMeta = await ap(botAP)

    const fingeredOwner = (await finger(owner)).find(e =>
      e.rel === "http://webfinger.net/rel/profile-page" || e.rel === "https://webfinger.net/rel/profile-page").
      href

    const tpl = `<li>
    <img src="${botMeta.icon.url}" alt="Avatar" />
    <span>${botMeta.preferredUsername} <a href="${botProfile}" target="_BLANK">@${bot.acct}</a></span>
    <span class="owner">by <a href="${fingeredOwner}" target="_BLANK">@${owner.acct}</a></span>
    <div>
      ${botMeta.summary}
    </div>
  </li>`

    document.querySelector("#" + entry.cat + " .bots").append(document.createRange().createContextualFragment(tpl))
  } catch (ex) {
    console.error("failed to fetch bot", entry, ex)
  }
})

const cached = []

function resolv (acct) {
  const split = acct.split("@")
  return {
    acct: acct,
    uname: split[0],
    host: split[1]
  }
}

function finger (acct) {
  console.debug("fingering", acct)
  return fetch("https://cors.kurabloodlust.eu/https://" + acct.host + "/.well-known/webfinger?resource=" + encodeURIComponent("acct:" + acct.acct)).
    then(res => res.json()).
    then(json => json.links)
}

function ap (url) {
  console.debug("fetching", url)
  return fetch("https://cors.kurabloodlust.eu/" + url, {
    headers: {
      "Accept": 'application/activity+json',
      "X-Requested-With": "xmlhttprequest"
    },
    mode: "cors"
  }).then(res => res.json())
}
