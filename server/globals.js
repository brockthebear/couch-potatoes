const prod = process.env.NODE_ENV === "production";

const hostname = prod
  ? "www.couch-potatoes-app.herokuapp.com"
  : "www.couch-potatoes-app-staging.herokuapp.com";

module.exports = {
    navigator: {},
    window: {
        innerWidth: 1024,
        innerHeight: 768,
        location: {
            hostname,
        },
    },
};
