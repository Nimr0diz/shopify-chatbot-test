module.exports = {
 "extends": "airbnb",
 "env": {
 "node": true,
 "es6": true,
 "browser": true,
 "jquery": true,
 },
 "rules": {
  "no-use-before-define":["warn"],
  "arrow-parens": ["error", "always"],
  "consistent-return":["warn"],
  "max-len": ["error", { "code": 80, "ignoreTemplateLiterals": true, "ignoreStrings": true }],
 }
}