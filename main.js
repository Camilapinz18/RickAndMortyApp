const { createApp } = Vue;

createApp({
    data() {
        return {
            username: '',
            password: '',
            message: '',
            users: [],
            userLogin: [],
            alert: false
        }
    },
    methods: {

        async getData() {
            const response = await fetch('https://rickandmortyapi.com/api/location/3')
                .then(resp => resp.json())
                .then(data => data)
            console.log(response)
        },

        login() {
            if (this.password !== '' && this.username !== '') {
                const user = this.users.filter(user => user.password == this.password && user.username == this.username)
                if (user.length > 0) {
                    console.log('ingresaste')
                    localStorage.setItem("userLogin", JSON.stringify(user));
                } else {
                    this.message = 'Error en la contraseña o username';
                    this.alert = true;
                }
            } else {
                this.message = 'Todos los campos son obligatorios';
                this.alert = true;
            }
        },

        closeAlert() {
            this.alert = false;
        }








    },
    mounted() {
        this.userLogin = JSON.parse(localStorage.getItem("userLogin"));
    },
    created() {

    }
}).mount("#root");


