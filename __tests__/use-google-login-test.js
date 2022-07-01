import { waitFor, renderHook, fireEvent } from '@testing-library/react'
import { runGapiScript } from '../test-utils/gapi-script'
import useGoogleLogin from '../src/hooks/use-google-login'

const DEFAULT_SCRIPT_SRC = 'https://apis.google.com/js/platform.js'

describe('useGoogleLogin', () => {
  const clientId = '891031345873-ir73kc1ru0ncv564iesac94kjaap5nf4.apps.googleusercontent.com'
  const onSuccess = jest.fn(() => {})
  const onError = jest.fn(() => {})
  const onAutoloadFinished = jest.fn(() => {})
  const onRequest = jest.fn(() => {})

  const params = {
    clientId,
    onSuccess,
    onError,
    onAutoloadFinished,
    onRequest,
  }

  describe('when loading the gapi script succeeds', () => {
    beforeEach(() => {
      runGapiScript()
    })

    describe('when the GoogleAuth object has already been initialized', () => {
      describe('when the GoogleAuth promise resolves successfully', () => {
        describe('when staySignedIn is true', () => {
          describe('when GoogleAuth.isSignedIn.get() returns true', () => {
            it('calls the success callback with the current user', async () => {
              const testCaseParams = { staySignedIn: true, ...params }

              renderHook(() => useGoogleLogin(testCaseParams))

              const script = document.querySelector('script')
              fireEvent.load(script)

              await waitFor(() => expect(onSuccess).toHaveBeenCalled())
            })
          })
        })
      })
    })
  })

  describe('when loading the gapi script fails', () => {
    describe('when the onScriptLoadError callback is defined', () => {
      const onScriptLoadError = jest.fn(() => {})
      const testCaseParams = { onScriptLoadError, ...params }

      // it('calls the onScriptLoadError callback', async () => {
      //   renderHook(() => useGoogleLogin(testCaseParams))

      //   await waitFor(() => expect(onScriptLoadError).toHaveBeenCalled())
      // })
    })
  })

  /* Desired test cases
   * - Loading script succeeds
   *   - GoogleAuth has already been initialised
   *     - Promise resolves successfully
   *       - staySignedIn is true
   *         - GoogleAuth.isSignedIn.get() returns true
   *           - Calls the success callback with the current user
   *           - Calls the onAutoloadFinished callback with `true`
   *         - GoogleAuth.isSignedIn.get() returns false
   *           - Doesn't call the success callback
   *           - Doesn't call the error callback
   *           - Calls the onAutoloadFinished callback with `false`
   *       - staySignedIn is false
   *         - Doesn't call the success callback
   *         - Doesn't call the error callback
   *         - Calls the onAutoloadFinished callback with `false`
   *     - Promise resolves with an error
   *       - Doesn't call the success callback
   *       - Calls the error callback
   *   - GoogleAuth has not been initialised yet
   *     - Initialises GoogleAuth with the expected params
   *     - When the promise resolves successfully
   *       - When staySignedIn is true
   *         - When resp.isSignedIn.get() returns true
   *           - Calls the onAutoloadFinished callback with `true`
   *           - Calls the success callback with resp.currentUser.get()
   *         - When resp.isSignedIn.get() returns false
   *           - Calls the onAutoloadFinished callback with `false`
   *           - Doesn't call the success callback
   *     - When the promise resolves with an error
   *       - Calls the onAutoloadFinished callback with `false`
   *       - When the onScriptLoadError callback is defined
   *         - Calls the onScriptLoadError callback with the error object
   *       - When the onScriptLoadError callback is not defined
   *         - Calls the onError callback with the error object
   *   - When autoload is true
   *     - Calls signInWithGoogle()
   * - Loading script fails
   *   - When the onScriptLoadError callback is defined
   *     - Calls the onScriptLoadError callback
   *   - When the onScriptLoadError callback is not defined
   *     - Calls the onError callback with the error object
   * - signInWithGoogle function
   *   - Calls preventDefault on an event if the event is passed in
   *   - Doesn't throw an error if no event is passed in
   *   - When the script hasn't loaded yet:
   *     - Doesn't throw an error attempting to get the auth instance
   *     - When the response type is 'code'
   *       - Calls GoogleAuth.grantOfflineAccess
   *         - When promise resolves successfully
   *           - Calls success callback with the response object
   *         - When the promise resolves with an error
   *           - Calls the error callback with the error object
   *     - When the response type is undefined or something else
   *       - Calls GoogleAuth.signIn
   *         - When the promise resolves successfully
   *           - Calls the handleSuccess callback with the response object
   *         - When the promise resolves with an error
   *           - Calls the error callback with the response object
   */
})