/**
 * Service historique
 * @return {Object}
 */
function histoService($http)
{

    /**
     * Récupère le top10 des joueurs
     * @returns {Promise} Réponse serveur (top10)
     */   
   this.getTop10 = function()
   {
       return $http
       .get('http://localhost:3131/getTop10')
       .then(function(response)
       {
           return response;
       });
   };

   this.getHisto = function(id)
   {
        return $http
        .post('http://localhost:3131/getHisto', {'id': id})
        .then(function(response)
        {
            for (var i = 0; i < response.data.rows.length; i++)
            {
                response.data.rows[i].date = response.data.rows[i].date.substring(0, 10) + " (" + response.data.rows[i].date.substring(11, 19) + ")";
                console.log(response.data.rows[i].date);
            }

            return response;
        });
   };

   this.saveResult = function(infoToSave)
   {
       return $http
       .post('http://localhost:3131/saveResult', {'info': infoToSave})
       .then(function(response)
       {
           return response;
       });
   };
}