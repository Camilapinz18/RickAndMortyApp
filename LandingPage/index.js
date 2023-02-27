const app = Vue.createApp({
  data() {
    return {
      pages: null,
      selectedPage: null,
      charactersList: [],
      characters: [],
      buyedCards: [],
      cardsToShow: [],
      isLandPage: false,
      isCollecion: false,
      isPurchases: false,
      isPayCredits: false,
      currentUser: JSON.parse(localStorage.getItem('userLogin')),
      launchAlert: false,
      packets: [
        { name: 'Basico', img: 'images/morty.jpeg', amount: 100, price: 10000 },
        { name: 'Medio', img: 'images/summer.jpeg', amount: 200, price: 18000 },
        { name: 'Bueno', img: 'images/beth.jpeg', amount: 300, price: 25000 },
        { name: 'Alto', img: 'images/rick.jpeg', amount: 500, price: 35000 }
      ],
      packet: [],
      valueAuction: '',
      message: '',
      alert: false,
      noCoins: false,
      buyedCard: false,
      card: '',
      allCards: [],
      myCards: [],
      norepeatedCards: [],
      isMyCards: false,
      myPayments: [],
      allPayments: [],
      users: []
    }
  },
  methods: {
    onLoadPage() {
      this.syncLocalStorage()
      this.fetchData()
      this.isLandPage = true
      console.log('CURRENT', this.currentUser[0])
    },
    syncLocalStorage() {
      if (
        localStorage.getItem('buyedCards') === null ||
        localStorage.getItem('buyedCards') === undefined ||
        localStorage.getItem('allPayments') === null ||
        localStorage.getItem('allPayments') === undefined 
      ) {
        localStorage.setItem('buyedCards', JSON.stringify(this.buyedCards))
        localStorage.setItem('allPayments', JSON.stringify(this.allPayments))
      } else {
        localStorage.setItem('buyedCards', localStorage.getItem('buyedCards'))
        const toUpdateBuyedCards = JSON.parse(
          localStorage.getItem('buyedCards')
        )
        this.buyedCards = toUpdateBuyedCards;

        localStorage.setItem('allPayments', localStorage.getItem('allPayments'))
        const toUpdateAllPayments = JSON.parse(
          localStorage.getItem('allPayments')
        )
        this.allPayments = toUpdateAllPayments;
      }
      const toUpdateUsers = JSON.parse(
        localStorage.getItem('users')
      )
      this.users = toUpdateUsers;
    },
    showPaymentsWindow() { },
    async fetchData() {
      let page = this.assignRandomPage()
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        )
        const chars = await response.json()

        this.characters = chars.results

        this.charactersList = characters.results
      } catch (error) {
        console.log(error)
      }

      this.characters.map(char => {
        this.charactersList.push({
          id: char.id,
          name: char.name,
          image: char.image,
          species: char.species,
          status: char.status,
          amount: 1,
          price: this.assignRandomPrice(),
          cardStatus: this.assignRandomCardStatus()
        })
      })

      console.log('charasedit', this.charactersList)

      localStorage.setItem('cards', JSON.stringify(this.charactersList))
    },
    addToCart(char) {

      let finalPrice = 0

      if (this.currentUser[0].coins >= char.price) {
        if (this.valueAuction != '') {
          finalPrice = Number(this.valueAuction)
          this.currentUser[0].coins =
            this.currentUser[0].coins - this.valueAuction
        } else {
          finalPrice = char.price
          this.currentUser[0].coins = this.currentUser[0].coins - char.price
        }
        console.log('coins', this.currentUser[0].coins)
        localStorage.setItem('userLogin', JSON.stringify(this.currentUser))
        this.currentUser = JSON.parse(localStorage.getItem('userLogin'))
        console.log(this.currentUser[0]);
        console.log('FINAL', finalPrice)
        let date = new Date()
        let formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        console.log('formattedDate', formattedDate)
        this.buyedCards.push({
          user: this.currentUser[0].username,
          card: char,
          date: formattedDate,
          purshasedPrice: finalPrice
        })
        console.log('buyedCards', this.buyedCards)
        localStorage.setItem('buyedCards', JSON.stringify(this.buyedCards))
        this.message = 'Compra exitosa!!!'

        this.users.forEach(user => {
          if (user.password == this.currentUser[0].password) {
            user.coins = this.currentUser[0].coins;
          }
        })
        localStorage.setItem('users', JSON.stringify(this.users))
        this.users = JSON.parse(localStorage.getItem('users'))

        Swal.fire({
          title: `Has comprado el NFT de ${char.name} exitosamente!`,
          text: '¿Que tal si sigues adquiriendo mas tarjetas?',
          width: 600,
          padding: '3em',
          color: 'white',
          background: '#272B33',

          backdrop: `
            rgba(0,176,200,0.4)
            left top
            no-repeat
          `
        })
        this.myBuyedCards()
      } else {
        Swal.fire({
          title: `Parece que aún no cuentas con MortyCoins`,
          text: '¿Que tal si adquieres algunas? Dirígete a "Mi Cuenta" y luego da click a "Comprar créditos"',
          width: 600,
          padding: '3em',
          color: 'white',
          background: '#272B33 url("./images/back.png")',

          backdrop: `
            rgba(0,176,200,0.4)
            left top
            no-repeat
          `
        })
      }
    },
    assignCardsToCurrentUser() {
      this.isLandPage = false
      this.isPurchases = true
      console.log('aca')
      this.cardsToShow = this.buyedCards.filter(card => {
        return card.user === this.currentUser[0].username
      })

      console.log('cardsToShow', this.cardsToShow.length)

      if (this.cardsToShow.length === 0) {
        Swal.fire({
          title: `Parece que aún no cuentas con ningún NFT!`,
          text: '¿Que tal si adquieres algunos MortyCoins?',
          width: 600,
          padding: '3em',
          color: 'white',
          background: '#272B33 url("./images/back.png")',

          backdrop: `
            rgba(0,176,200,0.4)
            left top
            no-repeat
          `
        })
      }
    },

    assignRandomPage() {
      let randPage = Math.round(Math.random() * 42)
      return randPage
    },
    assignRandomPrice() {
      let minPrice = 20
      let maxPrice = 500
      let randPrice = Math.floor(
        Math.random() * (maxPrice - minPrice + 1) + minPrice
      )

      return randPrice
    },
    assignRandomCardStatus() {
      const cardStatus = ['inAuction', 'forSale']
      let randStatus = cardStatus[Math.floor(Math.random() * cardStatus.length)]
      return randStatus
    },
    generatePayment() {
      
      let date = new Date()
      let formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

      this.allPayments.push({
        user: this.currentUser[0].username,
        card: this.packet,
        date: formattedDate
      })

      // asignar MortyCoins al usario
      this.currentUser[0].coins = this.currentUser[0].coins + this.packet.amount
      console.log('currentUser', this.currentUser[0])
      localStorage.setItem('userLogin', JSON.stringify(this.currentUser))
      this.currentUser = JSON.parse(localStorage.getItem('userLogin'))
      console.log(this.currentUser[0]);
      localStorage.setItem('allPayments', JSON.stringify(this.allPayments))
      this.users.forEach(user => {
        if (user.password == this.currentUser[0].password) {
          user.coins = this.currentUser[0].coins;
        }
      })
      localStorage.setItem('users', JSON.stringify(this.users))
      this.users = JSON.parse(localStorage.getItem('users'))

      Swal.fire({
        title: `Has comprado MortyCoins exitosamente!`,
        text: '¿Que tal si adquieres algunos NFTs?',
        width: 600,
        padding: '3em',
        color: 'white',
        background: '#272B33',

        backdrop: `
          rgba(0,176,200,0.4)
          left top
          no-repeat
        `
      })
      this.isPurchases = false
      this.myPayment()

       
    },

    logout() {
      this.isLandPage = false
      localStorage.removeItem('userLogin')
      window.location.href = '../index.html'
    },

    payPacket(packet) {
      this.packet = packet
    },

    viewMyCards() {
      this.isLandPage = false
      this.isMyCards = true
    },

    auction(card) {
      this.closeAlert()
      this.card = card
      if (this.valueAuction !== '') {
        const numbersAuction = Math.floor(Math.random() * 2)
        if (numbersAuction == 1) {
          card.price = this.changePrice(card.price)
        }
        if (
          this.currentUser[0].coins >= this.valueAuction &&
          this.valueAuction >= card.price
        ) {
          this.addToCart(card)
          this.valueAuction = ''
          this.message = 'Compra exitosa!!!'
          //this.buyedCard = true
          this.alert = false
          console.log('compara exitosa')
        } else {
          this.message = 'Coins insuficientes'
          console.log('Coins insuficientes')
          this.noCoins = true
          this.alert = true
          Swal.fire({
            title: `Parece que aún no cuentas MortyCoins`,
            text: '¿Que tal si adquieres algunos?',
            width: 600,
            padding: '3em',
            color: 'white',
            background: '#272B33 url("./images/back.png")',

            backdrop: `
              rgba(0,176,200,0.4)
              left top
              no-repeat
            `
          })
        }
      } else {
        console.log('Debe ingresar una cantidad')
        this.message = 'Debe ingresar una cantidad'
        this.alert = true
        this.noCoins = false
      }
      this.valueAuction = '';
    },

    changePrice(price) {
      const newPrice =
        price +
        Math.round(price * (Math.floor(Math.random() * (32 - 1) + 1) / 100))
      return newPrice
    },

    myBuyedCards() {
      //se filtran todas la tarjetas asociadas al actual usuario
      this.allCards = JSON.parse(localStorage.getItem('buyedCards'))
      this.myCards = this.allCards?.filter(
        myCards => myCards.user == this.currentUser[0].username
      )

      //contar tarjetas repetidas
      let res = []
      this.myCards?.forEach(element => {
        res.push(element.card)
      })
      this.myCards = res
      const resultado = []
      this.myCards?.forEach(
        card => (resultado[card.id] = resultado[card.id] + 1 || 1)
      )

      //formar array para visualizar
      this.norepeatedCards = []
      const aux = []
      this.myCards?.forEach(card => {
        if (aux.includes(card.id)) {
          aux.push(card.id)
        } else {
          aux.push(card.id)
          this.norepeatedCards.push(card)
        }
      })

      //Si son repetidas indicar la cantidad y asosiarlo a la propiedad amount
      this.myCards?.forEach(card => {
        if (resultado[card.id]) {
          card.amount = resultado[card.id]
        }
      })

      console.log(this.norepeatedCards)
      console.log(this.myCards)
    },

    myPayment() {
      //se filtran todas los pagos asociados al actual usuario
      this.allPayments = JSON.parse(localStorage.getItem('allPayments'))
      this.myPayments = this.allPayments?.filter(
        myPayments => myPayments.user == this.currentUser[0].username
      )
    },

    closeAlert() {
      this.alert = false
      this.noCoins = false
      this.buyedCard = false
    }
  },

  created() {
    this.onLoadPage()
    this.myBuyedCards()
    this.myPayment()
  }
})

app.mount('#app')
