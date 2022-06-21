const loadGapiScript = (document, src, onLoad, onError) => {
  const script = document.getElementsByTagName('script')[0]

  let js = document.createElement('script')
  js.id = 'google-auth'
  js.src = src
  js.async = true
  js.defer = true

  if (script && script.parentNode) {
    script.parentNode.insertBefore(js, script)
  } else {
    document.head.appendChild(js)
  }

  js.onerror = onError
  js.onload = onLoad
}

export default loadGapiScript
