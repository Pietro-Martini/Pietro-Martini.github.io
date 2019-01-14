var SidebarToggle = (function () {
  // DOM references

  var _menuToggleDOM = document.querySelector('.menu-toggle')
  var _sideNavDOM = document.querySelector('.side-nav')

  // Handlers

  var _handleMenuToggleClick = function() {
    _menuToggleDOM.classList.toggle('menu-toggle--active')
    _sideNavDOM.classList.toggle('side-nav--active')
  }

  _menuToggleDOM.addEventListener('click', _handleMenuToggleClick, false)
})()

var FormValidation = (function () {
  var _inputGroup = Array.prototype.slice.call(document.querySelectorAll('.form__input-group input[type="text"]'))

  var _cannotBeBlank = function(name, val) {
    if (val === '') return name + ' cannot be blank'
  }

  var _validEmail = function(name, val) {
    var emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRE.test(val)) {
      return name + ' must be a valid email address'
    }
  }

  var _validationFns = {
    name: [_cannotBeBlank],
    email: [_cannotBeBlank, _validEmail]
  }

  var _handleInputBlur = function (e) {
    var inputName = e.target.name
    var val = e.target.value

    var inputValidations = _validationFns[inputName]

    var inputMsgs = inputValidations.reduce(function(coll, validationFn) {
      var inputNameCapitalized = inputName[0].toUpperCase() + inputName.slice(1)
      var validationMsg = validationFn(inputNameCapitalized, val)

      if (validationMsg) coll += '<p>' + validationMsg + '</p>'
      return coll
    }, '')

    var inputDOM = document.querySelector('input[name="' + inputName + '"]')
    var inputMsgDOM = inputDOM.nextElementSibling

    inputMsgDOM.innerHTML = inputMsgs

    if (inputMsgs) {
      inputMsgDOM.classList.add('message--active')
    } else {
      inputMsgDOM.classList.remove('message--active')
    }
  }

  _inputGroup.forEach(function(input) {
    input.addEventListener('blur', _handleInputBlur)
    input.addEventListener('keyup', _handleInputBlur)
  })
})()

var PasswordToggle = (function () {
  var state = {passwordReveal: false}

  var _passwordIcon = document.querySelector('.password-icon')
  var _passwordIconHide = document.querySelector('.password-icon-hide')
  var _passwordInputField = document.querySelector('.form__input:nth-of-type(3)')
  var _passwordInput = _passwordInputField.querySelector('input')

  var _handlePasswordToggleClick = function () {
    if (!state.passwordReveal) {
      state.passwordReveal = true

      _passwordInput.type = 'text'

      _passwordIconHide.classList.remove('password-icon--inactive')
      _passwordIcon.classList.add('password-icon--inactive')
    } else {
      state.passwordReveal = false

      _passwordInput.type = 'password'

      _passwordIcon.classList.remove('password-icon--inactive')
      _passwordIconHide.classList.add('password-icon--inactive')
    }
  }

  document.querySelector('.password-icon-wrapper').addEventListener('click', _handlePasswordToggleClick, false)
})()
