module.exports = {
  app: {
    port: process.env.PORT || 9000,
  },
  session: {
    secret: 'keyboard cat'
  },
    db: {
      uri: "mongodb+srv://UWEAST-ADMIN:EltonKelly12345Soumya@cluster0.5mowv.mongodb.net/cse135?retryWrites=true&w=majority" || "mongodb://127.0.0.1:27017/",
    },
    auth:{
      jwt_secret: 'random spongebob'
    }
  };