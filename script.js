async function main() {
  try {
    console.log('fetching backgrounds...')
    const list = await fetch('/images/bg/list.json').then(res => res.json())
    console.log('found', list.length, 'entries')

    const bg = '/images/bg/' + list[Math.floor(Math.random() * list.length)]
    console.log('selected', bg)

    const div = document.createElement('div')
    div.style.backgroundImage = 'url(' + bg + ')'
    div.style.backgroundSize = 'cover'

    div.style.position = 'absolute'
    div.style.top = 0
    div.style.left = 0
    div.style.width = '100vw'
    div.style.height = '100vh'
    div.style.zIndex = -1
    div.classList.add('bg')

    document.body.prepend(div)
  } catch (err) {}

  tabby.init()
}

main().catch(console.error)
