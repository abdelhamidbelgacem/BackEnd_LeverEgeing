'use strict';

const appErrors = require('appErrors');

class feedsService {
    constructor(feedsDAO) {
        this.feedsDAO = feedsDAO;
    }

    /**
     * Creates a new feed
     * @param {*} feed 
     * @throws appErrors.NotAcceptableError if new feeds shortname is already used
     */
    post(feed) {
        var _self = this;
        return _self.feedsDAO.post(feed)
            .then((item) => {
                item._links = {
                    self: {
                        href: '/feeds/' + item.shortName,
                        linkBuilder: '/feeds/{feed}',
                        linkBuilderParameters: {
                            feed: item.shortName
                        }
                    }
                };
            })
            .catch((error) => {
                error = new appErrors.NotAcceptableError();
                error.addError({
                    code: "feed_SHORTNAME_EXISTS", // TODO Make an enum
                    message: "feed_SHORTNAME_EXISTS" // TODO i18n
                });
                throw error;
            });
    }
}

module.exports = feedsService;