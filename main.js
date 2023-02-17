const { createApp } = Vue

createApp({
  data () {
    return {
      username: '',
      password: '',
      message: '',
      users: [
        {
          username: 'a',
          password: 'a',
          coins:20000
        },
        {
          username: 'b',
          password: 'b',
          coins:0
        }
        ,
        {
          username: 'c',
          password: 'c',
          coins:15000
        }
      ],
      userLogin: [],
      alert: false
    }
  },
  methods: {
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
    login () {
      if (this.password !== '' && this.username !== '') {
        const user = this.users.filter(
          user =>
            user.password == this.password && user.username == this.username
        )
        if (user.length > 0) {
          console.log('ingresaste')
          localStorage.setItem('userLogin', JSON.stringify(user))
          window.location.href = './LandingPage/index.html'
        } else {
          this.message = 'Error en la contraseña o username'
          this.alert = true
        }
      } else {
        this.message = 'Todos los campos son obligatorios'
        this.alert = true
      }
    },
    goToSignup () {
      console.log('go')
      window.location.href = './Register/register.html'
    },
    closeAlert () {
      this.alert = false
    }
  },
  mounted () {
    this.syncLocalStorage()
    this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
    localStorage.setItem('users', JSON.stringify(this.users))
  },
  created () {}
}).mount('#root')
