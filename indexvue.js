Vue.createApp({
    data() {
      return {
        author: {
          name: 'John Doe',
          books: [
              "ok"
          ]
        }
      }
    },
    computed: {
      // a computed getter
      publishedBooksMessage() {
        // `this` points to the component instance
        return this.author.books.length > 0 ? 'Yes' : 'No'
      }
    }
}).mount('#app')
