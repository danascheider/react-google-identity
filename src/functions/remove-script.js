const removeScript = document => {
  const script = document.getElementById('google-auth')

  if (script) script.parentNode.removeChild(script)
}

export default removeScript
