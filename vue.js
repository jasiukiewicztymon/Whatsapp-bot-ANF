Vue.createApp({
    data() {
      return {
        datecollection: {
            notdate:  ['20/02/2022'],
            date: [],
            takendate: []
        },
        personalcollection: {
            name: 'Jasiukiewicz Tymon',
            region: ['Le Locle']
        }
      }
    }
}).mount('#app')
