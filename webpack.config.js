const Dotenv = require('dotenv-webpack');

module.exports = {
    // Otras configuraciones de Webpack...
    plugins: [
        new Dotenv()
    ]
};