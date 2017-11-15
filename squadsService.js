'use strict';

const appErrors = require('appErrors');

class SquadsService {
    constructor(squadsDAO) {
        this.squadsDAO = squadsDAO;
    }

    post(squad) {
        var _self = this;
        return _self.squadsDAO.post(squad)
            .then((item) => {
                item._links = {
                    self: {
                        href: '/squads/' + item.shortName,
                        linkBuilder: '/squads/{squad}',
                        linkBuilderParameters: {
                            squad: item.shortName
                        }
                    }
                };
            })
            .catch((error) => {
                error = new appErrors.NotAcceptableError();
                error.addError({
                    code: "SQUAD_SHORTNAME_EXISTS", // TODO Make an enum
                    message: "SQUAD_SHORTNAME_EXISTS" // TODO i18n
                });
                throw error;
            });
    }
}

module.exports = SquadsService;