/**
 * Contrôleur de défi
 * @param {?} $scope - Variable de contexte
 * @param {*} histo - Service historique
 */
function defiController($scope, $rootScope, defi, socket)
{
    $scope.defiS = defi;    //Référence à defiService

    $scope.getDefi = function(idDefi)
    {
        defi.getDefi(idDefi)
        .then(function(response)
        {
            $scope.curDefi = response.data;
            return response.data;
        });
    }

    $scope.lancerDefi = function(id, ident, quizzQuestions, quizzScore)
    {
        defi.initDefi(id, ident, quizzQuestions, quizzScore)
        .then(function()
         {
            $scope.confirmDefi = socket.confirmDefi;
            $scope.displayConfirm = true;
         });
    };

    $scope.execDefi = function(idDefi)
    {
        defi.getDefi(idDefi)
        .then(function(defi)
        {
            $rootScope.$broadcast('quizzLaunch', defi);
            $scope.defiS.deleteDefi(idDefi);
        })
    }

    $scope.recupDefi = function(idDefi)
    {
        defi.getDefi(idDefi)
        .then(function(response)
        {
           return response.data;
        });
    };

    $scope.supprDefi = function(idDefi)
    {
        defi.deleteDefi(idDefi);
    };

    $scope.saveRes = function(defiant)
    {
        defi.saveResult(defiant, defiant);
    }
};