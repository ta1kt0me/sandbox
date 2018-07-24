module.exports = {
  env: {
    firebaseConfig: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    }
  },
  head: {
    title: 'Todo sample',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { href: "https://use.fontawesome.com/releases/v5.1.1/css/all.css", rel: "stylesheet", integrity: "sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ", crossorigin: "anonymous" }
    ]
  },
  plugins: [
    '~/plugins/firebase'
  ],
  modules: [
    '@nuxtjs/vuetify'
  ],
  vuetify: {
  }
}
