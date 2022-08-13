# API Docs

`react-google-identity` provides a single hook, `useGoogleLogin`, that uses Google's [new Sign in with Google API](https://developers.google.com/identity/gsi/web/guides/migration). This library is intended to replace [react-google-login](https://github.com/anthonyjgrove/react-google-login), which only works with the [deprecated API](https://developers.google.com/identity/sign-in/web) and is, additionally, no longer actively maintained. (The deprecated API will be decommissioned in March of 2023, leaving only the new API for identity services.)

Note that Google offers two APIs for sign-in: the JavaScript one implemented in this library and an [HTML one](https://developers.google.com/identity/gsi/web/reference/html-reference).

## Functionality

This hook:

* Loads a `<script>` tag with Google's identity script in the DOM (unfortunately, this script is not available as a package)
* [Initializes](https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.initialize) the Google identity client

## Return Value

This hook is called with a number of possible parameters as described below. After it has run successfully, the hook returns the following values:

* `scriptLoaded`: a boolean indicating whether Google's script has been added to the document
* `signInInitialized`: a boolean indicating whether the client has been initialized
* `displayOneTapPrompt`: a function enabling the [one tap prompt](https://developers.google.com/identity/gsi/web/guides/overview#consent_and_sign-in_with_one_tap) to be displayed on your page
* `displaySignInButton`: a function enabling the [Sign in with Google button](https://developers.google.com/identity/gsi/web/guides/overview#sign_in_with_google_demo) to be displayed on your page

## API Documentation

The `useGoogleLogin` hook takes an object with the following possible keys as an argument.

### Google API Params

#### [`allowedParentOrigin`](https://developers.google.com/identity/gsi/web/reference/js-reference#allowed_parent_origin) (string or array of strings)

Force One Tap to run in [intermediate iframe mode](https://developers.google.com/identity/gsi/web/amp/intermediate-support-reference), setting the origin(s) that are allowed to embed the intermediate iframe. The value may be a string or an array of strings.

Wildcard prefixes are supported, however, they are not allowed to be composed of only a wildcard and a top-level domain (for example, `"https://*.com"` or `"https://*.co.uk"`). Possible examples include `"https://*.example.com"`, which allows all subdomains of `example.com`, and `["https://example1.com", "https://*.example2.com"]`, which allows the root domain of `example1.com` and all subdomains of `example2.com`. **Note that wildcard domains MUST use a secure (HTTPS) scheme.**

If the value of this field is invalid, the One Tap initialization of the intermediate iframe will fail and stop.

#### [`clientId`](https://developers.google.com/identity/gsi/web/reference/js-reference#client_id) (string)

**Required**

The Google client ID for your application, obtained from the [Google Cloud Developer Platform](https://console.cloud.google.com).

#### [`autoSelect`](https://developers.google.com/identity/gsi/web/reference/js-reference#auto_select) (boolean)

**Optional**
**Default Value: `false`**

Whether to sign the user in automatically if a single Google account has already been authorised for your site. When set to `true`, an ID token is automatically returned without any interaction with the sign-in button or One Tap prompt when there's one and only one Google session that has approved your app before.

#### [`callback`](https://developers.google.com/identity/gsi/web/reference/js-reference#callback) (function)

**Highly Recommended**
**Default Value: noop**

Callback to be called when the ID token is returned from the One Tap prompt or the pop-up window (when using a Sign in with Google button in 'popup' [UX mode](#uxmodehttpsdevelopersgooglecomidentitygsiwebreferencejs-referenceuxmode-string)). Although the `useGoogleLogin` hook provides a default value - a [no-op function](https://www.delftstack.com/howto/javascript/javascript-noop-function/#use-empty-arrow-function-to-create-noop-function-in-javascript) - to prevent errors if this value is not passed in, you will want to define your callback to ensure your application recognises the user as logged in. Possible actions include, depending on your application's needs and use case:

* Storing user data or credentials in a cookie
* Parsing the JWT passed in
* Populating your UI with data returned in the JWT (i.e., populating a user's profile)
* Sending data to your server to create or update a user's account information or perform additional validations
* Showing or hiding UX elements based on the user's logged-in status
* Redirecting to a page requiring authorisation, such as a user dashboard or profile

#### [`cancelOnTapOutside`](https://developers.google.com/identity/gsi/web/reference/js-reference#cancel_on_tap_outside) (boolean)

**Optional**
**Default Value: `true`**

Whether or not to cancel a One Tap sign-in request if a user clicks or taps outside the One Tap prompt. **Note that, while Google's default value is `false`, the default value is `true` in `react-google-identity`.** This is because the maintainers believe that cancelling when the user clicks/taps outside the prompt is better UX and more in line with user expectations.

#### [`context`](https://developers.google.com/identity/gsi/web/reference/js-reference#context) (string)

**Optional**
**Default Value: `'signin'`**

Change the text of the title and messages in the One Tap prompt.

| Value      | Prompt Text           |
| ---------- | --------------------- |
| `'signin'` | "Sign in with Google" |
| `'signup'` | "Sign up with Google" |
| `'use'`    | "Use with Google"     |

We are not aware of a way to change prompt text to any other value.

#### [`intermediateIframeCloseCallback`](https://developers.google.com/identity/gsi/web/reference/js-reference#intermediate_iframe_close_callback) (function)

**Optional**

In [intermediate iframe mode](https://developers.google.com/identity/gsi/web/amp/intermediate-support-reference), override the default behaviour when users manually close One Tap by tapping on the X button in the One Tap UI. The default behaviour is to remove the iframe from the DOM immediately.

This value is only relevant in intermediate iframe mode and will be ignored otherwise. Furthermore, it affects only the intermediate iframe, not the One Tap iframe.

#### [`itpSupport`](https://developers.google.com/identity/gsi/web/reference/js-reference#itp_support) (boolean)

Specify whether the upgraded One Tap UX should be enabled in browsers that support [Intelligent Tracking Prevention (ITP)](https://webkit.org/blog/7675/intelligent-tracking-prevention/). The default value is `false`.

#### [`loginUri`](https://developers.google.com/identity/gsi/web/reference/js-reference#login_uri) (string)

**Required if `ux_mode='redirect'` is set**

The full URI (including scheme/protocol) of the current page, or the value you specify. Only used when `ux_mode = 'redirect'` is set, otherwise ignored.

#### [`nativeCallback`](https://developers.google.com/identity/gsi/web/reference/js-reference#native_callback) (function)

**Optional**

JavaScript function that handles the `password` credential returned from the browser's native credential management.

In [intermediate iframe mode](https://developers.google.com/identity/gsi/web/amp/intermediate-support-reference), override the default iframe behaviour when users manually close One Tap by tapping on the X button in the One Tap UI. The default behaviour is to remove the intermediate iframe from the DOM immediately. This value should generally not be needed as the whole point of third-party identity is that you don't need to manage user passwords on your site. If I'm honest I don't even know how this would be a part of a third-party login flow, but the param will be passed through to Google if provided here. Caveat emptor!

#### [`nonce`](https://developers.google.com/identity/gsi/web/reference/js-reference#nonce) (string)

**Highly Recommended**

A random string used by the ID token to prevent replay attacks. Nonce length is limited to the maximum JWT size supported by your environment and individual browser and server HTTP size constraints. This param is optional but highly recommended. General information about nonces is available [here](https://www.hypr.com/nonce/).

#### [`promptParentId`](https://developers.google.com/identity/gsi/web/reference/js-reference#prompt_parent_id) (string)

**Highly Recommended when displaying the One Tap button**

The DOM ID of the parent element that should contain the One Tap prompt.If left blank, the Google docs indicate the One Tap prompt will be displayed ["in the top-right corner of the window"](https://developers.google.com/identity/gsi/web/reference/js-reference#prompt_parent_id). The default behaviour could lead to unexpected results or a strange UI appearance, so setting the parent ID is highly recommended. **This ID should never be set to `'g_id_signin'` or `'g_id_onload'`,** which are special values Google uses in its HTML API (see above). Setting it to these values could result in unexpected behaviour.

This value will be ignored if the One Tap button is to be displayed.

#### `onScriptLoad` (function)

**Optional**
**Default Value: noop**

Function that will be called after the client script has been successfully loaded in a script tag in your document. Takes one argument, the script load event.

#### `onScriptLoadError` (function)

**Optional**
**Default Value: noop**

##### Arguments

The callback takes a single argument: a [`CredentialResponse`](https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse) object returned from Google on successful login. Of the values included in this response, the one you will be most interested in is `response.credential`, which is a base6-encoded JSON Web Token (JWT) string. The Google [docs](https://developers.google.com/identity/gsi/web/reference/js-reference#credential) show an example of the data found in the JWT when it is decrypted.

#### [`stateCookieDomain`](https://developers.google.com/identity/gsi/web/reference/js-reference#state_cookie_domain) (string)

**Required if using One Tap on both parent domain and subdomains**

Your second-level domain (SLD) name, used if you need One Tap in both the SLD (parent domain) and its subdomains. Enables a single shared-state cookie to be used for all domains. The value of this param is the name of your second-level domain, not including any subdomains or scheme (HTTP/HTTPS): `"example.com"`.

#### [`uxMode`](https://developers.google.com/identity/gsi/web/reference/js-reference#ux_mode) (string)

**Optional**
**Default Value: `popup`**

| Possible Values | Result                                              |
| --------------- | --------------------------------------------------- |
| 'popup'         | Performs sign-in UX flow in a pop-up window         |
| 'redirect'      | Performs sign-in UX flow by a full page redirection |

Determine the UX flow - pop-up window or full redirect - used by the Sign in with Google button. Does not affect One Tap button behaviour. Use `'popup'` if your main authentication flow is in your front end. For authentication handled mainly on the server side, use `'redirect'`.

### Sign in with Google [Button Options](https://developers.google.com/identity/gsi/web/reference/js-reference#GsiButtonConfiguration)

The following options are only used if the Sign in with Google button is to be displayed. If only the One Tap prompt is to be displayed, then they are ignored and can be omitted.

#### [`buttonLocale`](https://developers.google.com/identity/gsi/web/reference/js-reference#locale) (string)

**Optional**

Set the locale of the button text. If not set, defaults to the browser's default location or the Google session user's preference. Therefore, different users might see different versions of localised buttons, possibly with different sizes.

#### [`buttonLogoAlignment`](https://developers.google.com/identity/gsi/web/reference/js-reference#logo_alignment) (string)

**Optional**
**Default Value:** `'left'`

Indicate where to to align the Google logo in the button. Possible values are `'left'` (default) and `'center'`. Right-aligned logos are apparently no longer supported.

#### [`buttonParentId`](https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.renderButton) (string)

**Required to display the Sign in with Google button**

Specifies the ID of the parent element of the Sign in with Google button so that the button will be rendered inside the element with that ID when you call the `displaySignInButton` function included in the hook's return value. `buttonParentId` is used to obtain the DOM element that is passed in as the first argument to [`google.accounts.id.renderButton`](https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.renderButton) This value should not be set to `g_id_signin` or `g_id_onload`, which could interfere with Google's HTML API (see above) and have unexpected results.

This value is only required if the Sign in with Google button is displayed. If only the One Tap prompt is to be displayed, it may be omitted.

#### [`buttonShape`](https://developers.google.com/identity/gsi/web/reference/js-reference#shape) (string)

**Optional**
**Default Value:** `'rectangular'`

Set the shape of the button.

| Possible Value- | Description                 |
| --------------- | --------------------------- |
| `'rectangular'` | Default, rectangular button. Equivalent to `'square'` if used with [`buttonType`](#buttontypehttpsdevelopersgooglecomidentitygsiwebreferencejs-referencetype-string) `'standard'` |
| `'pill'`        | Button with rounded ends. Equivalent to `'circle'` if used with `buttonType` `'icon'` |
| `'circle'`      | Circular button. Equivalent to `'pill'` if used with `buttonType` `'standard'` |
| `'square'`      | Square button. Equivalent to `'rectangular'` if used with `buttonType` `'standard'` |

#### [`buttonSize`](https://developers.google.com/identity/gsi/web/reference/js-reference#size) (string)

**Optional**
**Default Value:** `'large'`

Possible values:

* `'large'`
* `'medium'`
* `'small'`

Set the size of the Sign in with Google button. The default, `'large'` size is recommended as it is more accessible to those with visual impairments.

#### [`buttonText`](https://developers.google.com/identity/gsi/web/reference/js-reference#text) (string)

**Optional**
**Default Value:** `'signin_with'`

Set the text on the Sign in with Google button. Possible values:

| Value             | Button Text            |
| ----------------- | ---------------------- |
| `'signin_with'`   | "Sign in with Google"  |
| `'signup_with'`   | "Sign up with Google"  |
| `'continue_with'` | "Continue with Google" |
| `'signin'`        | "Sign in"              |

There is no way that we are aware of to set the button text to other values. This value is meaningless and will be ignored if your `buttonType` is set to `'icon'`.

#### [`buttonTheme`](https://developers.google.com/identity/gsi/web/reference/js-reference#theme) (string)

**Optional**
**Default Value: `'outline'`**

The button's colour scheme (see docs linked in heading for visual guide).

| Value            | Result                                                                  |
| ---------------- | ----------------------------------------------------------------------- |
| `'outline'`      | The button is predominantly white with a grey border and dark grey text |
| `'filled_blue'`  | The button is predominantly medium-blue with white text                 |
| `'filled_black'` | The button is predominantly black with white text                       |

#### [`buttonType`](https://developers.google.com/identity/gsi/web/reference/js-reference#type) (string)

**Optional**
**Default Value: `'standard'`**

The style of the button.

| Value        | Result |
| ------------ | ------ |
| `'standard'` | The button will contain an icon and text set with [`buttonText`](#buttontexthttpsdevelopersgooglecomidentitygsiwebreferencejs-referencetext-string) |
| `'icon'`     | The button will consist of only an icon with no text |

#### [`buttonWidth`](https://developers.google.com/identity/gsi/web/reference/js-reference#width)

**Optional**

The minimum button width, in pixels. The maximum value is `400`.

### Hook Options

#### `onScriptLoad`

**Optional**
**Default Value: noop**

Callback that runs when the Google identity client script has loaded.

#### `onScriptLoadError`

**Optional**
**Default Value: noop**

Callback that runs when there is an error loading the Google identity client script.

#### `scriptSrc`

**Optional**

The `src` attribute to be passed to the Google identity client script. This defaults to the URI at which Google hosts the script. In general, you should not need to use this option unless you've decided to host the script with your application or elsewhere.

