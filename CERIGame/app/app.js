/******** Application
 *
 ********/
var app = angular.module('app', ["ngRoute"]);
app.controller('defiController', defiController);
app.controller('histoController', histoController);
app.controller('loginController', loginController);
app.controller('quizzController', quizzController);
app.controller('socketController', socketController);
app.controller('userController', userController);
app.factory('socket', socketService);
app.service('auth', authService);
app.service('defi', defiService);
app.service('histo', histoService);
app.service('localStorage', localStorageService);
app.service('quizz', quizzService);
app.service('session', sessionService);
app.service('user', userService);