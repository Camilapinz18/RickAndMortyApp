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
      users: []
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
    },
    goToLogin () {
      window.location.href = '../index.html'
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
        }, 2000)
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
          }, 2000)
        } else {
          this.users.push({
            username: this.username,
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password
          })

          console.log('USERS', this.users)
          alert('usuario creado exitosamente')
          
          localStorage.setItem('users', JSON.stringify(this.users))
          localStorage.setItem(
            'userLogin',
            JSON.stringify({
              username: this.username,
              password: this.password
            })
          )
          this.name = ''
          this.username = ''
          this.email = ''
          this.phone = ''
          this.password = ''
          window.location.href = '../LandingPage/index.html'
        }
      }
    }
  },
  created () {
    this.onLoadPage()
  }
}).mount('#root')
