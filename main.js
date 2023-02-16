const { createApp } = Vue;

createApp({
    data() {
        return {
            username: '',
            password: '',
            message: '',
            users: [],
            userLogin: [],
            alert: false,
            packets: [
                { name: 'Basico', img: 'images/morty.jpeg', amount: 100, price: 10000 },
                { name: 'Medio', img: 'images/summer.jpeg', amount: 200, price: 18000 },
                { name: 'Alto', img: 'images/rick.jpeg', amount: 300, price: 25000 }
            ],
            characters: [],
            valueAuction: '',
            noCoins: false,
            buyedCards: [],

        }
    },
    methods: {

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
            this.noCoins = false;
        },

        auction(card) {
            if (this.valueAuction !== '') {
                console.log(this.valueAuction);
                const numbersAuction = Math.floor(Math.random() * (2))
                if (numbersAuction == 1) {
                    //card.price = this.changePrice(card.price);
                }
                if (0 > this.valueAuction) {
                    this.user.price = this.user.price - this.valueAuction;
                    this.message = 'Compra exitosa!!!';

                } else {
                    this.message = 'Coins insuficientes';
                    console.log('Coins insuficientes')
                    this.noCoins = true;
                    this.alert = true;
                }
                console.log(numbersAuction);
            } else {
                console.log('Debe ingresar una cantidad');
                this.message = 'Debe ingresar una cantidad';
                this.alert = true;
            }
        },

        changePrice(card) {

            const newPrice = card + (Math.round(card * (Math.floor(Math.random() * (32 - 1) + 1) / 100)))
            console.log(newPrice);
            return newPrice;
        },

    },
    mounted() {
        this.userLogin = JSON.parse(localStorage.getItem("userLogin"));
    },
    created() {

    }
}).mount("#root");


