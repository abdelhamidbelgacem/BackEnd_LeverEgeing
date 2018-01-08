/**
 * @author:Abdelhamid.belgacem
 */

'use strict';

const appErrors = require('../appErrors');

class profilesService {
    constructor(profilesDAO) {
        this.profilesDAO = profilesDAO;
    }

    /**
     * Creates a new profile
     * @param {*} profile 
     * @throws appErrors.NotAcceptableError if new profiles shortname is already used
     */
    post(profile) {
        var _self = this;
        return _self.profilesDAO.post(profile)
            .then((item) => {
                item._links = {
                    self: {
                        href: '/profiles/' + item.shortName,
                        linkBuilder: '/profiles/{idProfile}',
                        linkBuilderParameters: {
                            profile: item.shortName
                        }
                    }
                };
            })
            .catch((error) => {
                error = new appErrors.NotAcceptableError();
                error.addError({
                    code: "PROFILE_SHORTNAME_EXISTS", 
                    message: "PROFILE_SHORTNAME_EXISTS" 
                });
                throw error;
            });
    }

    update(idProfile) {
        var _self = this;
        return _self.profilesDAO.update(idProfile)
            .then((item) => {
                item._links = {
                    self: {
                        href: '/profiles/' + item.shortName,
                        linkBuilder: '/profiles/{idProfile}',
                        linkBuilderParameters: {
                            profile: item.shortName
                        }
                    }
                };
            })
            .catch((error) => {
                error = new appErrors.NotAcceptableError();
                error.addError({
                    code: "PROFILE_SHORTNAME_EXISTS", 
                    message: "PROFILE_SHORTNAME_EXISTS" 
                });
                throw error;
            });
    }
}
module.exports = profilesService;