const removeGapiScript = document => {
  const script = document.getElementById('google-auth')

  if (script) script.parentNode.removeChild(script)
}

export default removeGapiScript
