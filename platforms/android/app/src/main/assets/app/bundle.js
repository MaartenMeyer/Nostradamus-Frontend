module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = global["webpackJsonp"] = global["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Break.native.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/axios/index.js");
/* harmony import */ var axios_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios_index__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Dashboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./views/Dashboard.native.vue");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/tns-core-modules/http/http.js");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nativescript_localstorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../node_modules/nativescript-localstorage/localstorage.js");
/* harmony import */ var nativescript_localstorage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nativescript_localstorage__WEBPACK_IMPORTED_MODULE_4__);
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Break.native",

  data() {
    return {
      props: [currentUser]
    };
  },

  methods: {
    clickValidatePause() {
      if (this.personNumber == null) {
        this.alert("Er is geen personeelsnummer ingevoerd.");
      } else {
        this.clickStartPause();
      }
    },

    clickStartPause() {
      console.log("pause");
      this.alert(this.personNumber + " is het personeels nummer.");
      axios_index__WEBPACK_IMPORTED_MODULE_0___default()({
        method: 'post',
        url: 'http://145.49.8.169:3000/api/clocking',
        data: {
          userNumber: this.currentUser.userNumber
        },
        config: {
          headers: {
            'Authorization': "bearer " + localStorage.token
          }
        }
      });
      this.toHome();
    },

    toHome() {
      console.log("going home");
      this.$navigateTo(_Dashboard__WEBPACK_IMPORTED_MODULE_1__["default"], {
        props: {
          currentUser
        },
        animated: true,
        transition: {
          name: "slideTop",
          duration: 380,
          curve: "easeIn"
        }
      });
    },

    alert(message) {
      return confirm({
        title: "Test message",
        okButtonText: "OK",
        message: message
      });
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Clock.native.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/axios/index.js");
/* harmony import */ var axios_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios_index__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/tns-core-modules/http/http.js");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nativescript_localstorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/nativescript-localstorage/localstorage.js");
/* harmony import */ var nativescript_localstorage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nativescript_localstorage__WEBPACK_IMPORTED_MODULE_3__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Clock.native",

  data() {
    return {
      listBranch: ["Locatie", "Breda", "Amsterdam", "Rotterdam", "Bergen op Zoom"],
      listDepartment: ["Afdeling", "DKW", "Kassa", "Magazijn", "AGF"],
      selectedItemBranch: 0,
      selectedItemDepartment: 0,
      personNumber: null,
      displayDepartment: 0,
      displayBranch: 0,
      displayButton: 0
    };
  },

  methods: {
    changeBranch() {
      if (this.selectedItemBranch != 0) {
        this.displayDepartment = 1;
      }
    },

    changeDepartment() {
      if (this.selectedItemDepartment != 0) {
        this.displayButton = 1;
      }
    },

    changeNumber() {
      if (this.personNumber != null) {
        this.displayBranch = 1;
      }
    },

    clickClockingValidate() {
      if (this.personNumber == "") {
        this.alert("Er is geen personeelsnummer ingevoerd.");
      } else if (this.selectedItemDepartment == 0) {
        this.alert("Er is geen afdeling ingevoerd.");
      } else if (this.selectedItemBranch == 0) {
        this.alert("Er is geen locatie ingevoerd.");
      } else {
        this.clickStartClocking();
      }
    },

    clickStartClocking() {
      this.alert(this.personNumber + " is het personeels nummer." + "\n" + this.listBranch[this.selectedItemBranch] + " is de locatie." + "\n" + this.listDepartment[this.selectedItemDepartment] + " is de afdeling.");
      axios_index__WEBPACK_IMPORTED_MODULE_0___default()({
        method: 'post',
        url: 'http://145.49.8.169:3000/api/clocking',
        data: {
          userNumber: this.currentUser.userNumber
        },
        config: {
          headers: {
            'Authorization': "bearer " + localStorage.token
          }
        }
      });
      this.toHome();
    },

    toHome() {
      console.log("going home");
      this.$goto('dashboard');
    },

    alert(message) {
      return alert({
        title: "Test message",
        okButtonText: "OK",
        message: message
      });
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Dashboard.native.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/axios/index.js");
/* harmony import */ var axios_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios_index__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Break_native_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./views/Break.native.vue");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/tns-core-modules/http/http.js");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nativescript_localstorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../node_modules/nativescript-localstorage/localstorage.js");
/* harmony import */ var nativescript_localstorage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nativescript_localstorage__WEBPACK_IMPORTED_MODULE_4__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//




 //const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Dashboard",

  data() {
    return {//props:[currentUser]
    };
  },

  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_3__["mapGetters"])({
    currentUser: 'currentUser'
  })),
  methods: {
    clickLogout() {
      this.$goto('login');
    },

    clickPause() {
      this.$goto('break');
    },

    clickClocking() {
      this.$goto('clock');
    },

    alert(message) {
      return alert({
        title: "Oops",
        okButtonText: "OK",
        message: message
      });
    }

  },

  mounted() {//this.getUserData()
  }

});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Login.native.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Dashboard_native_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./views/Dashboard.native.vue");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/tns-core-modules/http/http.js");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nativescript_localstorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../node_modules/nativescript-localstorage/localstorage.js");
/* harmony import */ var nativescript_localstorage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nativescript_localstorage__WEBPACK_IMPORTED_MODULE_4__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




 // Deprecated consts, remove during cleanup
// const Toast = require('nativescript-toast');
// const axios = require('axios/index');
// const Dashboard = require('./Dashboard.native.vue');
// const { request } = require('http');
// const { mapGetters } = require('vuex');

const userService = {
  login(user) {
    return new Promise(resolve => {
      resolve(user);
    });
  }

};
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Login',

  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },

  //TODO; dunk deprecated data, remove console.log()
  //checking for current user does not work at this time
  //using similar methods to web version
  //throws error; undefined mapGetters
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_3__["mapGetters"])({
    currentUser: 'currentUser'
  })),
  // //Checks if user is already logged in when loading site
  // created(){
  //     this.checkLogin();
  // },
  // //Checks if user is already logged in when refreshing site
  // updated(){
  //     this.checkLogin();
  // },
  methods: {
    // checkLogin(){
    //     if(this.currentUser){
    //         this.$navigateTo(Dashboard);
    //     }
    //},
    focusPassword() {
      this.$refs.password.nativeView.focus();
    },

    submit() {
      //this.alert("pressed");
      if (!this.user.username || !this.user.password) {
        console.log("invoer niet goed");
        this.$goto('dashboard');
        this.alert("Email en/of wachtwoord vergeten in te voeren.");
        return;
      } else {
        this.validate();
      }
    },

    validate() {
      // CHECK DATA
      //
      //url needs to be changed to server IP
      //local IP does not work with emulator/phys. device
      //Using 145.49.8.169:3000/api for testing
      //check local IP of device running back-end before testing yourself
      //https://www.whatismybrowser.com/detect/what-is-my-local-ip-address
      //
      // axios.interceptors.request.use(function (config){
      //     let token = localStorage.token;
      // },
      // function (response){
      //     return Promise.resolve(response);
      // })
      var self = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: 'post',
        url: 'http://145.49.8.169:3000/api/login',
        data: {
          userName: this.user.username,
          password: this.user.password
        },
        config: {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(response => {
        //console.log(response)
        this.login(response);
      }).catch(() => this.loginFailed());
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.interceptors.response.use(function (response) {
        return response;
      }); // postLogin().then(request => userService.login(request).then(request => this.login(request)));
      // console.log("post-async");
      // axios({
      // method: 'post',
      // url: 'http://145.49.8.169:3000/api/login',
      // data: { userName: this.user.username, password: this.user.password },
      // config: { headers: {'Content-Type': 'application/json' }}
      // })
      // .then(request => {
      //     console.log(request.status);
      //     this.login(request);
      // })
      // .catch(() => this.loginFailed());
      // console.log(request.status);
    },

    login(response) {
      //console.log("Request : "+response.status);
      //console.log("Log redata: "+req.data);
      if (!response.data.token) {
        this.loginFailed();
        return;
      }

      this.error = false;
      localStorage.token = response.data.token; //console.log('token ' + localStorage.token);

      this.$store.dispatch('login'); //this.$goto('dashboard');

      this.loadData();
    },

    alert(message) {
      //console.log("fired");
      return alert({
        title: "Oops",
        okButtonText: "OK",
        message: message
      });
    },

    loginFailed() {
      this.error = true;
      this.alert("Er ging iets mis met het verbinden van de applicatie.");
      delete localStorage.token;
    },

    loadData() {
      // console.log(localStorage.userId);
      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        method: 'get',
        url: 'http://145.49.8.169:3000/api/data/' + localStorage.userId,
        config: {
          headers: {
            "Authorization": "Bearer " + localStorage.token + ""
          }
        }
      }).then(request => this.loadDataSuccessful(request)).catch(err => {
        if (err.response) {
          console.log("res " + err.response);
        } else {
          console.log("req " + err.request.status);
        } //console.log(err);


        this.loadDataFailed();
      });
    },

    loadDataSuccessful(req) {
      console.log("Load succes"); // this.$router.push('dasboard');

      this.$goto('dashboard'); // localStorage.setItem('company', JSON.stringify(req.data));
      //console.log("user service");
      // userService
      //     .login(this.user)
      //     .then(() => {
      //         console.log("navigate");
      //         this.$navigateTo(Dashboard, {
      //             props: {
      //                 currentUser
      //             },
      //             animated: true,
      //             transition: {
      //                 name: "slideTop",
      //                 duration: 380,
      //                 curve: "easeIn"
      //             }
      //         });
      //console.log("navigate");
      // this.$navigateTo(Dashboard, {
      //             props: {
      //                 currentUser
      //             },
      //             animated: true,
      //             transition: {
      //                 name: "slideTop",
      //                 duration: 380,
      //                 curve: "easeIn"
      //             }
      // });
      //console.log("push-error")
      // })
      // .catch(() => {
      //     this.alert(
      //         "Er ging iets mis met het verbinden van de applicatie."
      //     );
      //});
    },

    loadDataFailed() {
      console.log("Load-data Failed"); //Needs to be filled with something
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Register.native.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//Do we even need this
//No requirement from Productowner for mobile registration
//Nice-to-have?
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Register.native"
});

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Break.native.vue?vue&type=style&index=0&id=9820f6d6&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.page[data-v-9820f6d6] {\n    align-items: center;\n    flex-direction: column;\n}\n.form[data-v-9820f6d6] {\n    margin-left: 30;\n    margin-right: 30;\n    flex-grow: 2;\n    vertical-align: middle;\n}\n.logo[data-v-9820f6d6] {\n    margin-bottom: 12;\n    height: 90;\n    font-weight: bold;\n}\n.header[data-v-9820f6d6] {\n    horizontal-align: center;\n    font-size: 25;\n    font-weight: 600;\n    margin-bottom: 70;\n    text-align: center;\n    color: #00A2D3;\n}\n.input-field[data-v-9820f6d6] {\n    margin-bottom: 25;\n}\n.input[data-v-9820f6d6] {\n    font-size: 18;\n    placeholder-color: #A8A8A8;\n}\n.input-field .input[data-v-9820f6d6] {\n    font-size: 54;\n}\n.btn-primary[data-v-9820f6d6] {\n    height: 50;\n    margin: 30 5 15 5;\n    background-color: #00A2D3;\n    border-radius: 5;\n    font-size: 20;\n    font-weight: 600;\n}\n.login-label[data-v-9820f6d6] {\n    horizontal-align: center;\n    color: #A8A8A8;\n    font-size: 16;\n}\n.sign-up-label[data-v-9820f6d6] {\n    margin-bottom: 20;\n}\n.bold[data-v-9820f6d6] {\n    color: #000000;\n}\n", ""]);

// exports

    const application = __webpack_require__("../node_modules/tns-core-modules/application/application.android.js");
    __webpack_require__("../node_modules/tns-core-modules/ui/styling/style-scope.js");

    exports.forEach(cssExport => {
        if (cssExport.length > 1 && cssExport[1]) {
            // applying the second item of the export as it contains the css contents
            application.addCss(cssExport[1]);
        }
    });
    ;
    if (false) {}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Clock.native.vue?vue&type=style&index=0&id=2a0cd226&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.page[data-v-2a0cd226] {\n    align-items: center;\n    flex-direction: column;\n}\n.form[data-v-2a0cd226] {\n    margin-left: 30;\n    margin-right: 30;\n    flex-grow: 2;\n    vertical-align: middle;\n}\n.logo[data-v-2a0cd226] {\n    margin-bottom: 12;\n    height: 90;\n    font-weight: bold;\n}\n.header[data-v-2a0cd226] {\n    horizontal-align: center;\n    font-size: 25;\n    font-weight: 600;\n    margin-bottom: 70;\n    text-align: center;\n    color: #00A2D3;\n}\n.input-field[data-v-2a0cd226] {\n    margin-bottom: 25;\n}\n.input[data-v-2a0cd226] {\n    font-size: 18;\n    placeholder-color: #A8A8A8;\n}\n.input-field .input[data-v-2a0cd226] {\n    font-size: 54;\n}\n.btn-primary[data-v-2a0cd226] {\n    height: 50;\n    margin: 30 5 15 5;\n    background-color: #00A2D3;\n    border-radius: 5;\n    font-size: 20;\n    font-weight: 600;\n}\n.login-label[data-v-2a0cd226] {\n    horizontal-align: center;\n    color: #A8A8A8;\n    font-size: 16;\n}\n.sign-up-label[data-v-2a0cd226] {\n    margin-bottom: 20;\n}\n.bold[data-v-2a0cd226] {\n    color: #000000;\n}\n", ""]);

// exports

    const application = __webpack_require__("../node_modules/tns-core-modules/application/application.android.js");
    __webpack_require__("../node_modules/tns-core-modules/ui/styling/style-scope.js");

    exports.forEach(cssExport => {
        if (cssExport.length > 1 && cssExport[1]) {
            // applying the second item of the export as it contains the css contents
            application.addCss(cssExport[1]);
        }
    });
    ;
    if (false) {}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Dashboard.native.vue?vue&type=style&index=0&id=704d9f40&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.page[data-v-704d9f40] {\n    align-items: center;\n    flex-direction: column;\n}\n.form[data-v-704d9f40] {\n    margin-left: 30;\n    margin-right: 30;\n    flex-grow: 2;\n    vertical-align: middle;\n}\n.logo[data-v-704d9f40] {\n    margin-bottom: 12;\n    height: 90;\n    font-weight: bold;\n}\n.header[data-v-704d9f40] {\n    horizontal-align: center;\n    font-size: 25;\n    font-weight: 600;\n    margin-bottom: 70;\n    text-align: center;\n    color: #00A2D3;\n}\n.input-field[data-v-704d9f40] {\n    margin-bottom: 25;\n}\n.input[data-v-704d9f40] {\n    font-size: 18;\n    placeholder-color: #A8A8A8;\n}\n.input-field .input[data-v-704d9f40] {\n    font-size: 54;\n}\n.btn-primary[data-v-704d9f40] {\n    height: 50;\n    margin: 30 5 15 5;\n    background-color: #00A2D3;\n    border-radius: 5;\n    font-size: 20;\n    font-weight: 600;\n}\n.btn-secondary[data-v-704d9f40] {\n    height: 50;\n    margin: 30 5 15 5;\n    background-color: #eaeaea;\n    border-radius: 5;\n    color: #00A2D3;\n    font-size: 20;\n    font-weight: 600;\n}\n.login-label[data-v-704d9f40] {\n    horizontal-align: center;\n    color: #A8A8A8;\n    font-size: 16;\n}\n.sign-up-label[data-v-704d9f40] {\n    margin-bottom: 20;\n}\n.bold[data-v-704d9f40] {\n    color: #000000;\n}\n", ""]);

// exports

    const application = __webpack_require__("../node_modules/tns-core-modules/application/application.android.js");
    __webpack_require__("../node_modules/tns-core-modules/ui/styling/style-scope.js");

    exports.forEach(cssExport => {
        if (cssExport.length > 1 && cssExport[1]) {
            // applying the second item of the export as it contains the css contents
            application.addCss(cssExport[1]);
        }
    });
    ;
    if (false) {}


/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Login.native.vue?vue&type=style&index=0&id=760eb02a&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.page[data-v-760eb02a] {\n    align-items: center;\n    flex-direction: column;\n}\n.form[data-v-760eb02a] {\n    margin-left: 30;\n    margin-right: 30;\n    flex-grow: 2;\n    vertical-align: middle;\n}\n.logo[data-v-760eb02a] {\n    margin-bottom: 12;\n    height: 90;\n    font-weight: bold;\n}\n.header[data-v-760eb02a] {\n    horizontal-align: center;\n    font-size: 25;\n    font-weight: 600;\n    margin-bottom: 70;\n    text-align: center;\n    color: #00A2D3;\n}\n.input-field[data-v-760eb02a] {\n    margin-bottom: 25;\n}\n.input[data-v-760eb02a] {\n    font-size: 18;\n    placeholder-color: #A8A8A8;\n}\n.input-field .input[data-v-760eb02a] {\n    font-size: 54;\n}\n.btn-primary[data-v-760eb02a] {\n    height: 50;\n    margin: 30 5 15 5;\n    background-color: #00A2D3;\n    border-radius: 5;\n    font-size: 20;\n    font-weight: 600;\n}\n.login-label[data-v-760eb02a] {\n    horizontal-align: center;\n    color: #A8A8A8;\n    font-size: 16;\n}\n.sign-up-label[data-v-760eb02a] {\n    margin-bottom: 20;\n}\n.bold[data-v-760eb02a] {\n    color: #000000;\n}\n", ""]);

// exports

    const application = __webpack_require__("../node_modules/tns-core-modules/application/application.android.js");
    __webpack_require__("../node_modules/tns-core-modules/ui/styling/style-scope.js");

    exports.forEach(cssExport => {
        if (cssExport.length > 1 && cssExport[1]) {
            // applying the second item of the export as it contains the css contents
            application.addCss(cssExport[1]);
        }
    });
    ;
    if (false) {}


/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Break.native.vue?vue&type=template&id=9820f6d6&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    {
      attrs: { actionBarHidden: "false", backgroundSpanUnderStatusBar: "true" }
    },
    [
      _c(
        "ActionBar",
        { staticClass: "action-bar" },
        [
          _c("Label", {
            staticClass: "action-bar-title",
            attrs: { text: "Pauze" }
          })
        ],
        1
      ),
      _c(
        "FlexboxLayout",
        { staticClass: "page", attrs: { verticalAlignment: "center" } },
        [
          _c("TextField", {
            staticClass: "input",
            staticStyle: { width: "75%" },
            attrs: {
              hint: "Personeels nummer",
              keyboardType: "number",
              fontSize: "18",
              text: _vm.personNumber
            },
            on: {
              textChange: function($event) {
                _vm.personNumber = $event.value
              }
            }
          }),
          _c("Button", {
            staticClass: "btn btn-primary m-t-20",
            attrs: { text: "Pauze" },
            on: { tap: _vm.clickValidatePause }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Clock.native.vue?vue&type=template&id=2a0cd226&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    {
      attrs: { actionBarHidden: "false", backgroundSpanUnderStatusBar: "true" }
    },
    [
      _c(
        "ActionBar",
        { staticClass: "action-bar" },
        [
          _c("Label", {
            staticClass: "action-bar-title",
            attrs: { text: "In / Uit klokken" }
          })
        ],
        1
      ),
      _c(
        "FlexboxLayout",
        { staticClass: "page", attrs: { verticalAlignment: "center" } },
        [
          _c("TextField", {
            class: _vm.input,
            staticStyle: { width: "75%" },
            attrs: {
              hint: "Personeels nummer",
              keyboardType: "number",
              fontSize: "18",
              text: _vm.personNumber
            },
            on: {
              textChange: [
                function($event) {
                  _vm.personNumber = $event.value
                },
                _vm.changeNumber
              ]
            }
          }),
          _vm.displayBranch
            ? _c("ListPicker", {
                staticStyle: { width: "75%" },
                attrs: {
                  items: _vm.listBranch,
                  selectedIndex: _vm.selectedItemBranch
                },
                on: {
                  selectedIndexChange: [
                    function($event) {
                      _vm.selectedItemBranch = $event.value
                    },
                    _vm.changeBranch
                  ]
                }
              })
            : _vm._e(),
          _vm.displayDepartment
            ? _c("ListPicker", {
                staticStyle: { width: "75%" },
                attrs: {
                  items: _vm.listDepartment,
                  disabled: "true",
                  selectedIndex: _vm.selectedItemDepartment
                },
                on: {
                  selectedIndexChange: [
                    function($event) {
                      _vm.selectedItemDepartment = $event.value
                    },
                    _vm.changeDepartment
                  ]
                }
              })
            : _vm._e(),
          _vm.displayButton
            ? _c("Button", {
                staticClass: "btn btn-primary m-t-20",
                attrs: { text: "Klokken" },
                on: { tap: _vm.clickClockingValidate }
              })
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Dashboard.native.vue?vue&type=template&id=704d9f40&scoped=true&native=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    {
      attrs: { actionBarHidden: "false", backgroundSpanUnderStatusBar: "true" }
    },
    [
      _c(
        "ActionBar",
        { staticClass: "action-bar" },
        [
          _c("Label", {
            staticClass: "action-bar-title",
            attrs: { text: "Dashboard" }
          }),
          _c("NavigationButton", { attrs: { visibility: "collapsed" } })
        ],
        1
      ),
      _c(
        "FlexboxLayout",
        { staticClass: "page", attrs: { verticalAlignment: "center" } },
        [
          _c("Button", {
            staticClass: "btn btn-primary m-t-20",
            attrs: { text: "In/Uit Klokken" },
            on: { tap: _vm.clickClocking }
          }),
          _c("Button", {
            staticClass: "btn btn-primary m-t-20",
            attrs: { text: "Pauze" },
            on: { tap: _vm.clickPause }
          }),
          _c("Button", {
            staticClass: "btn btn-secondary",
            attrs: { text: "Log out" },
            on: { tap: _vm.clickLogout }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Login.native.vue?vue&type=template&id=760eb02a&scoped=true&native=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    { attrs: { actionBarHidden: "true" } },
    [
      _c(
        "FlexboxLayout",
        { staticClass: "page" },
        [
          _c(
            "StackLayout",
            { staticClass: "form" },
            [
              _c("Image", {
                staticClass: "logo",
                attrs: { src: "~/assets/logos.png" }
              }),
              _c("Label", {
                staticClass: "header",
                attrs: { text: "ClockSystem" }
              }),
              _c(
                "StackLayout",
                { staticClass: "input-field", attrs: { marginBottom: "25" } },
                [
                  _c("TextField", {
                    staticClass: "input",
                    attrs: {
                      hint: "Gebruikersnaam",
                      keyboardType: "text",
                      autocorrect: "false",
                      autocapitalizationType: "none",
                      returnKeyType: "next",
                      fontSize: "18",
                      text: _vm.user.username
                    },
                    on: {
                      returnPress: _vm.focusPassword,
                      textChange: function($event) {
                        _vm.$set(_vm.user, "username", $event.value)
                      }
                    }
                  }),
                  _c("StackLayout", { staticClass: "hr-light" })
                ],
                1
              ),
              _c(
                "StackLayout",
                { staticClass: "input-field", attrs: { marginBottom: "25" } },
                [
                  _c("TextField", {
                    ref: "password",
                    staticClass: "input",
                    attrs: {
                      hint: "Password",
                      secure: "true",
                      returnKeyType: "done",
                      fontSize: "18",
                      text: _vm.user.password
                    },
                    on: {
                      textChange: function($event) {
                        _vm.$set(_vm.user, "password", $event.value)
                      }
                    }
                  }),
                  _c("StackLayout", { staticClass: "hr-light" })
                ],
                1
              ),
              _c("Button", {
                staticClass: "btn btn-primary m-t-20",
                attrs: { text: "Log In" },
                on: {
                  tap: function($event) {
                    _vm.submit()
                  }
                }
              })
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Register.native.vue?vue&type=template&id=8f4dea3a&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$";

/***/ }),

/***/ "./main.native.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-vue/dist/index.js");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _router_native__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./router.native.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./store/index.js");

        let applicationCheckPlatform = __webpack_require__("../node_modules/tns-core-modules/application/application.android.js");
        if (applicationCheckPlatform.android && !global["__snapshot"]) {
            __webpack_require__("../node_modules/tns-core-modules/ui/frame/frame.android.js");
__webpack_require__("../node_modules/tns-core-modules/ui/frame/activity.android.js");
        }

        
            
        if (false) {}
        
            const context = __webpack_require__("./ sync recursive (root|page)\\.(xml|css|js|ts|scss)$");
            global.registerWebpackModules(context);
            
        __webpack_require__("../node_modules/tns-core-modules/bundle-entry-points.js");
        

 // Set the following to `true` to hide the logs created by nativescript-vue

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.config.silent = false; // Set the following to `false` to not colorize the logs created by nativescript-vue
// disabled in template due to typing issue for Typescript projects....NEEDS TO BE FIXED
// Vue.config.debug = true;

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$router = _router_native__WEBPACK_IMPORTED_MODULE_1__["default"];

nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$goto = function (to, options) {
  this.$navigateTo(this.$router[to], options);
};

new nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  store: _store__WEBPACK_IMPORTED_MODULE_2__["default"],
  render: h => h('frame', [h(_router_native__WEBPACK_IMPORTED_MODULE_1__["default"]['login'])])
}).$start();
    
        
    
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./models/User.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return User; });
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/jwt-decode/lib/index.js");
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jwt_decode__WEBPACK_IMPORTED_MODULE_0__);

class User {
  static from(token) {
    try {
      let object = jwt_decode__WEBPACK_IMPORTED_MODULE_0___default()(token);
      localStorage.userId = object.data.UserId;
      return new User(object.data);
    } catch (_) {
      return null;
    }
  }

  constructor(_ref) {
    let {
      UserId
    } = _ref;
    this.id = UserId;
  } // constructor({ user_id, userName, accountType}){
  //   this.id = user_id;
  //   this.userName = userName;
  //   this.accountType = accountType;
  // }


  get userId() {
    return this.id;
  }

}

/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = {"android":{"v8Flags":"--expose_gc","markingMode":"none"},"main":"main.native","name":"project-frontend","version":"0.1.0"};

/***/ }),

/***/ "./router.native.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _views_Login_native_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./views/Login.native.vue");
/* harmony import */ var _views_Dashboard_native_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./views/Dashboard.native.vue");
/* harmony import */ var _views_Clock_native_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./views/Clock.native.vue");
/* harmony import */ var _views_Break_native_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./views/Break.native.vue");
/* harmony import */ var _views_Register_native_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./views/Register.native.vue");





const router = {
  login: _views_Login_native_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  dashboard: _views_Dashboard_native_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
  clock: _views_Clock_native_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
  break: _views_Break_native_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
  register: _views_Register_native_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./store/auth.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./models/User.js");
/* harmony import */ var _mutation_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./store/mutation-types.js");


const state = {
  user: _models_User__WEBPACK_IMPORTED_MODULE_0__["default"].from(localStorage.token)
};
const mutations = {
  [_mutation_types__WEBPACK_IMPORTED_MODULE_1__["LOGIN"]](state) {
    state.user = _models_User__WEBPACK_IMPORTED_MODULE_0__["default"].from(localStorage.token);
  },

  [_mutation_types__WEBPACK_IMPORTED_MODULE_1__["LOGOUT"]](state) {
    state.user = null;
  }

};
const getters = {
  currentUser(state) {
    return state.user;
  }

};
const actions = {
  login(_ref) {
    let {
      commit
    } = _ref;
    commit(_mutation_types__WEBPACK_IMPORTED_MODULE_1__["LOGIN"]);
  },

  logout(_ref2) {
    let {
      commit
    } = _ref2;
    commit(_mutation_types__WEBPACK_IMPORTED_MODULE_1__["LOGOUT"]);
  }

};
/* harmony default export */ __webpack_exports__["default"] = ({
  state,
  mutations,
  getters,
  actions
});

/***/ }),

/***/ "./store/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-vue/dist/index.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./store/auth.js");



vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({
  modules: {
    auth: _auth__WEBPACK_IMPORTED_MODULE_2__["default"]
  }
}));

/***/ }),

/***/ "./store/mutation-types.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGIN", function() { return LOGIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGOUT", function() { return LOGOUT; });
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

/***/ }),

/***/ "./views/Break.native.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Break_native_vue_vue_type_template_id_9820f6d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./views/Break.native.vue?vue&type=template&id=9820f6d6&scoped=true&");
/* harmony import */ var _Break_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./views/Break.native.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Break_native_vue_vue_type_style_index_0_id_9820f6d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./views/Break.native.vue?vue&type=style&index=0&id=9820f6d6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Break_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Break_native_vue_vue_type_template_id_9820f6d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Break_native_vue_vue_type_template_id_9820f6d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "9820f6d6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "views/Break.native.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./views/Break.native.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Break_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Break.native.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Break_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./views/Break.native.vue?vue&type=style&index=0&id=9820f6d6&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Break_native_vue_vue_type_style_index_0_id_9820f6d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Break.native.vue?vue&type=style&index=0&id=9820f6d6&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Break_native_vue_vue_type_style_index_0_id_9820f6d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Break_native_vue_vue_type_style_index_0_id_9820f6d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Break_native_vue_vue_type_style_index_0_id_9820f6d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Break_native_vue_vue_type_style_index_0_id_9820f6d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Break_native_vue_vue_type_style_index_0_id_9820f6d6_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./views/Break.native.vue?vue&type=template&id=9820f6d6&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Break_native_vue_vue_type_template_id_9820f6d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Break.native.vue?vue&type=template&id=9820f6d6&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Break_native_vue_vue_type_template_id_9820f6d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Break_native_vue_vue_type_template_id_9820f6d6_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./views/Clock.native.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Clock_native_vue_vue_type_template_id_2a0cd226_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./views/Clock.native.vue?vue&type=template&id=2a0cd226&scoped=true&");
/* harmony import */ var _Clock_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./views/Clock.native.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Clock_native_vue_vue_type_style_index_0_id_2a0cd226_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./views/Clock.native.vue?vue&type=style&index=0&id=2a0cd226&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Clock_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Clock_native_vue_vue_type_template_id_2a0cd226_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Clock_native_vue_vue_type_template_id_2a0cd226_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "2a0cd226",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "views/Clock.native.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./views/Clock.native.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Clock_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Clock.native.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Clock_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./views/Clock.native.vue?vue&type=style&index=0&id=2a0cd226&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Clock_native_vue_vue_type_style_index_0_id_2a0cd226_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Clock.native.vue?vue&type=style&index=0&id=2a0cd226&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Clock_native_vue_vue_type_style_index_0_id_2a0cd226_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Clock_native_vue_vue_type_style_index_0_id_2a0cd226_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Clock_native_vue_vue_type_style_index_0_id_2a0cd226_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Clock_native_vue_vue_type_style_index_0_id_2a0cd226_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Clock_native_vue_vue_type_style_index_0_id_2a0cd226_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./views/Clock.native.vue?vue&type=template&id=2a0cd226&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Clock_native_vue_vue_type_template_id_2a0cd226_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Clock.native.vue?vue&type=template&id=2a0cd226&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Clock_native_vue_vue_type_template_id_2a0cd226_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Clock_native_vue_vue_type_template_id_2a0cd226_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./views/Dashboard.native.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dashboard_native_vue_vue_type_template_id_704d9f40_scoped_true_native_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./views/Dashboard.native.vue?vue&type=template&id=704d9f40&scoped=true&native=true&");
/* harmony import */ var _Dashboard_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./views/Dashboard.native.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Dashboard_native_vue_vue_type_style_index_0_id_704d9f40_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./views/Dashboard.native.vue?vue&type=style&index=0&id=704d9f40&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Dashboard_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_native_vue_vue_type_template_id_704d9f40_scoped_true_native_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dashboard_native_vue_vue_type_template_id_704d9f40_scoped_true_native_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "704d9f40",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "views/Dashboard.native.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./views/Dashboard.native.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Dashboard_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Dashboard.native.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Dashboard_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./views/Dashboard.native.vue?vue&type=style&index=0&id=704d9f40&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Dashboard_native_vue_vue_type_style_index_0_id_704d9f40_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Dashboard.native.vue?vue&type=style&index=0&id=704d9f40&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Dashboard_native_vue_vue_type_style_index_0_id_704d9f40_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Dashboard_native_vue_vue_type_style_index_0_id_704d9f40_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Dashboard_native_vue_vue_type_style_index_0_id_704d9f40_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Dashboard_native_vue_vue_type_style_index_0_id_704d9f40_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Dashboard_native_vue_vue_type_style_index_0_id_704d9f40_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./views/Dashboard.native.vue?vue&type=template&id=704d9f40&scoped=true&native=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Dashboard_native_vue_vue_type_template_id_704d9f40_scoped_true_native_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Dashboard.native.vue?vue&type=template&id=704d9f40&scoped=true&native=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Dashboard_native_vue_vue_type_template_id_704d9f40_scoped_true_native_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Dashboard_native_vue_vue_type_template_id_704d9f40_scoped_true_native_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./views/Login.native.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_native_vue_vue_type_template_id_760eb02a_scoped_true_native_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./views/Login.native.vue?vue&type=template&id=760eb02a&scoped=true&native=true&");
/* harmony import */ var _Login_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./views/Login.native.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Login_native_vue_vue_type_style_index_0_id_760eb02a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./views/Login.native.vue?vue&type=style&index=0&id=760eb02a&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Login_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_native_vue_vue_type_template_id_760eb02a_scoped_true_native_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_native_vue_vue_type_template_id_760eb02a_scoped_true_native_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "760eb02a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "views/Login.native.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./views/Login.native.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Login_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Login.native.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Login_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./views/Login.native.vue?vue&type=style&index=0&id=760eb02a&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Login_native_vue_vue_type_style_index_0_id_760eb02a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Login.native.vue?vue&type=style&index=0&id=760eb02a&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Login_native_vue_vue_type_style_index_0_id_760eb02a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Login_native_vue_vue_type_style_index_0_id_760eb02a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Login_native_vue_vue_type_style_index_0_id_760eb02a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Login_native_vue_vue_type_style_index_0_id_760eb02a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_0_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Login_native_vue_vue_type_style_index_0_id_760eb02a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./views/Login.native.vue?vue&type=template&id=760eb02a&scoped=true&native=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Login_native_vue_vue_type_template_id_760eb02a_scoped_true_native_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Login.native.vue?vue&type=template&id=760eb02a&scoped=true&native=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Login_native_vue_vue_type_template_id_760eb02a_scoped_true_native_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Login_native_vue_vue_type_template_id_760eb02a_scoped_true_native_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./views/Register.native.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Register_native_vue_vue_type_template_id_8f4dea3a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./views/Register.native.vue?vue&type=template&id=8f4dea3a&scoped=true&");
/* harmony import */ var _Register_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./views/Register.native.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Register_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Register_native_vue_vue_type_template_id_8f4dea3a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Register_native_vue_vue_type_template_id_8f4dea3a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "8f4dea3a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "views/Register.native.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./views/Register.native.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Register_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Register.native.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Register_native_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./views/Register.native.vue?vue&type=template&id=8f4dea3a&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Register_native_vue_vue_type_template_id_8f4dea3a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../node_modules/string-replace-loader/index.js?!./views/Register.native.vue?vue&type=template&id=8f4dea3a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Register_native_vue_vue_type_template_id_8f4dea3a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_string_replace_loader_index_js_ref_6_1_Register_native_vue_vue_type_template_id_8f4dea3a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./main.native.js");


/***/ })

/******/ });