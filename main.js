const { createApp } = Vue

createApp({
  data () {
    return {
      username: '',
      password: '',
      message: '',
      users: [{
        username:'a',
        password:'a'

      }],
      userLogin: [],
      alert: false
    }
  },
  methods: {
     login () {
      if (this.password !== '' && this.username !== '') {
        const user = this.users.filter(
          user =>
            user.password == this.password && user.username == this.username
        )
        if (user.length > 0) {
          console.log('ingresaste')
          localStorage.setItem('userLogin', JSON.stringify(user))
          window.location.href = './LandingPage/index.html';
        } else {
          this.message = 'Error en la contraseña o username'
          this.alert = true
        }
      } else {
        this.message = 'Todos los campos son obligatorios'
        this.alert = true
      }
    },
    goToSignup(){
      console.log("go")
      window.location.href = '/Register/register.html';
    },
    closeAlert () {
      this.alert = false
    }
  },
  mounted () {
    this.userLogin = JSON.parse(localStorage.getItem('userLogin'))
  },
  created () {}
}).mount('#root')
