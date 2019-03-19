module.exports={
  "env": {
      "node": true, // this is the best starting point
      "browser": true, // for react web
      "es6": true // enables es6 features
  },
  "parser": "babel-eslint", // needed to make babel stuff work properly
  "extends": "airbnb", 
  "rules": {
    semi: [2, "never"],
    "react/prop-types": 0, 
    "react/destructuring-assignment": 0,
    "max-len": [1, 120],
    "no-nested-ternary": 1
  }
};