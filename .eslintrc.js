module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest/globals": true
    },
    "extends": ["eslint:recommended", "plugin:jest/recommended", "plugin:jest/style"],
    "plugins": ["jest"],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "warn",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "warn",
            "always"
        ]
    },
    "globals": {
      page: true,
      browser: true,
      context: true,
      jestPuppeteer: true,
    }
};
