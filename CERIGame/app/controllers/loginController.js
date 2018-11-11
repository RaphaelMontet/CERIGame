/**
 * Contrôleur de connexion
 * @param {?} $scope - Variable de contexte
 * @param {*} auth - Service authentification
 */
function loginController($scope, auth)
{
    $scope.login = null;
    $scope.password = null;

    $scope.formLogin = function()
    {
        auth.logIn($scope.login, $scope.password)
        .then(function(data)
        {
            if (auth.isLoggedIn())
            {
                $scope.logged = true;
                console.log(auth.isLoggedIn());
            }
            else
            {
                $scope.logged = false;
            }
        });
    };
};