/**
 * Service session
 * @param {?} $log - ?
 * @param {Object} localStorage - Objet stockage local
 * @return {Object|localService}
 */
function sessionService($log, localStorage)
{
    this.exists = false;

    /**
     * Getter utilisateur
     * @returns {Object} Utilisateur
     */
    this.getUser = function()
    {
        return this.user;
    };

    /**
     * Setter utilisateur
     * @returns {Object} Session
     */
    this.setUser = function(user)
    {
        this.user = user;
        localStorage.setItem('sessionUser', JSON.stringify(user));
        console.log(localStorage);
        this.exists = true;
    };
}