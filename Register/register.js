const { createApp } = Vue

createApp({
  data () {
    return {
      username: null,
      name: null,
      email: null,
      phone: null,
      password: null,
      alert: false,
      message: null,
      users: [],
      duration: 3000
    }
  },
  methods: {
    onLoadPage () {
      this.syncLocalStorage()
    },
    syncLocalStorage () {
      if (
        localStorage.getItem('users') === null ||
        localStorage.getItem('users') === undefined
      ) {
        localStorage.setItem('users', JSON.stringify(this.users))
      } else {
        localStorage.setItem('users', localStorage.getItem('users'))
        const toUpdateUsers = JSON.parse(localStorage.getItem('users'))
        this.users = toUpdateUsers
      }

      console.log('USERS', this.users)
    },
    goToLogin () {
      window.location.href = '../index.html'
    },
    validateInputFormat (input, type) {
      switch (type) {
        case 'text':
          return /^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$/.test(input)
          break
        case 'mixed':
          return /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9]+$/.test(input)
          break
        default:
          console.log('Invalid input')
      }
    },
    signup () {
      if (
        this.username === '' ||
        this.username === null ||
        this.username === undefined ||
        this.name === '' ||
        this.name === null ||
        this.name === undefined ||
        this.email === '' ||
        this.email === null ||
        this.email === undefined ||
        this.phone === '' ||
        this.phone === null ||
        this.phone === undefined ||
        this.password === '' ||
        this.password === null ||
        this.password === undefined
      ) {
        this.alert = true
        this.message = 'Debes completar todos los datos para continuar'
        setTimeout(() => {
          this.alert = false
          this.message = null
        }, this.duration)
      } else {
        console.log('egitro')
        let alreadyExists = this.users.find(user => {
          return user.username === this.username
        })
        console.log(alreadyExists, 'alreadyExists')
        if (alreadyExists) {
          this.alert = true
          this.message =
            'El nombre de usuario ingresado ya existe! Intenta con uno nuevo'
          setTimeout(() => {
            this.alert = false
            this.message = null
          }, this.duration)
        } else {
          let validateUsername = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9]+$/.test(
            this.username
          )
          let validateName = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$/.test(this.name)
          let validateEmail =
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
              this.email
            )

          let validatePhone = /^[0-9]+$/.test(this.phone)
          const validatePassword = /^.{8,}$/.test(this.password)

          console.log(
            validateUsername,
            validateName,
            validateEmail,
            validatePhone,
            validatePassword
          )
          if (validateUsername === false) {
            this.alert = true
            this.message = 'El nombre de usuario no puede contener simbolos'
            setTimeout(() => {
              this.alert = false
              this.message = null
            }, this.duration)
          } else if (validateName === false) {
            this.alert = true
            this.message = 'El nombre no puede contener números'
            setTimeout(() => {
              this.alert = false
              this.message = null
            }, this.duration)
          } else if (validateEmail === false) {
            this.alert = true
            this.message = 'Email no valido'
            setTimeout(() => {
              this.alert = false
              this.message = null
            }, this.duration)
          } else if (validatePhone === false) {
            this.alert = true
            this.message = 'El número de teléfono no puede contener letras'
            setTimeout(() => {
              this.alert = false
              this.message = null
            }, this.duration)
          } else if (validatePassword === false) {
            this.alert = true
            this.message =
              'La contraseña debe tener al menos 8 caracteres de longitud'
            setTimeout(() => {
              this.alert = false
              this.message = null
            }, this.duration)
          } else if (
            validateUsername === true &&
            validateName === true &&
            validateEmail === true &&
            validatePhone === true &&
            validatePassword === true
          ) {
            this.users.push({
              username: this.username,
              name: this.name,
              email: this.email,
              phone: this.phone,
              password: this.password,
              coins:0
            })

            console.log('USERS', this.users)
            Swal.fire({
              title: 'Usuario creado exitosamente',
              icon: 'success',
              timer: 2000
            })

            localStorage.setItem('users', JSON.stringify(this.users))
            localStorage.setItem(
              'userLogin',
              JSON.stringify([
                {
                  username: this.username,
                  password: this.password,
                  coins: 0
                }
              ])
            )
            this.name = ''
            this.username = ''
            this.email = ''
            this.phone = ''
            this.password = ''
            setTimeout(() => {
              window.location.href = '../LandingPage/index.html'
            }, 2000)
          }
        }
      }
    }
  },
  created () {
    this.onLoadPage()
  }
}).mount('#root')
