const loadScript = (document, src, onLoad, onError) => {
  const script = document.getElementsByTagName('script')[0]

  let js = document.createElement('script')
  js.id = 'google-auth'
  js.src = src
  js.async = true
  js.defer = true

  js.onerror = e => onError(e)
  js.onload = e => onLoad(e)

  if (script && script.parentNode) {
    script.parentNode.insertBefore(js, script)
  } else {
    document.head.appendChild(js)
  }
}

export default loadScript
