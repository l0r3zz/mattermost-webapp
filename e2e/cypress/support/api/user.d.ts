// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/// <reference types="cypress" />

// ***************************************************************
// Each command should be properly documented using JSDoc.
// See https://jsdoc.app/index.html for reference.
// Basic requirements for documentation are the following:
// - Meaningful description
// - Specific link to https://api.mattermost.com
// - Each parameter with `@params`
// - Return value with `@returns`
// - Example usage with `@example`
// Custom command should follow naming convention of having `api` prefix, e.g. `apiLogin`.
// ***************************************************************

declare namespace Cypress {
    interface Chainable<Subject = any> {

        /**
         * Login to server via API.
         * See https://api.mattermost.com/#tag/users/paths/~1users~1login/post
         * @param {string} user.username - username of a user
         * @param {string} user.password - password of  user
         * @returns {UserProfile} out.user: `UserProfile` object
         *
         * @example
         *   cy.apiLogin({username: 'sysadmin', password: 'secret'});
         */
        apiLogin(user: UserProfile): Chainable<UserProfile>;

        /**
         * Login as admin via API.
         * See https://api.mattermost.com/#tag/users/paths/~1users~1login/post
         * @returns {UserProfile} out.user: `UserProfile` object
         *
         * @example
         *   cy.apiAdminLogin();
         */
        apiAdminLogin(): Chainable<UserProfile>;

        /**
         * Logout a user's active session from server via API.
         * See https://api.mattermost.com/#tag/users/paths/~1users~1logout/post
         * Clears all cookies espececially `MMAUTHTOKEN`, `MMUSERID` and `MMCSRF`.
         *
         * @example
         *   cy.apiLogout();
         */
        apiLogout();

        /**
         * Gets current user
         * See https://api.mattermost.com/#tag/users/paths/~1users~1{user_id}/get
         * @returns {UserProfile} out.user: `UserProfile` object
         *
         * @example
         *   cy.apiGetMe().then(({user}) => {
         *       // do something with user
         *   });
         */
        apiGetMe(): Chainable<UserProfile>;

        /**
         * Get a user by email
         * See https://api.mattermost.com/#tag/users/paths/~1users~1email~1{email}/get
         * @param {String} email - email address of a user to get profile
         * @returns {UserProfile} out.user: `UserProfile` object
         *
         * @example
         *   cy.apiGetUserByEmail().then(({user}) => {
         *       // do something with user
         *   });
         */
        apiGetUserByEmail(email: string): Chainable<UserProfile>;

        /**
         * Get users by usernames
         * See https://api.mattermost.com/#tag/users/paths/~1users~1usernames/post
         * @param {String[]} usernames - list of usernames to get profiles
         * @returns {UserProfile[]} out.users: list of `UserProfile` objects
         *
         * @example
         *   cy.apiGetUsersByUsernames().then(({users}) => {
         *       // do something with users
         *   });
         */
        apiGetUsersByUsernames(usernames: string[]): Chainable<UserProfile[]>;

        /**
         * Patch a user.
         * See https://api.mattermost.com/#tag/users/paths/~1users~1{user_id}~1patch/put
         * @param {String} userId - ID of user to patch
         * @param {UserProfile} userData - user profile to be updated
         * @param {string} userData.email
         * @param {string} userData.username
         * @param {string} userData.first_name
         * @param {string} userData.last_name
         * @param {string} userData.nickname
         * @param {string} userData.locale
         * @param {Object} userData.timezone
         * @param {string} userData.position
         * @param {Object} userData.props
         * @param {Object} userData.notify_props
         * @returns {UserProfile} out.user: `UserProfile` object
         *
         * @example
         *   cy.apiPatchUser('user-id', {locale: 'en'}).then(({user}) => {
         *       // do something with user
         *   });
         */
        apiPatchUser(userId: string, userData: UserProfile): Chainable<UserProfile>;

        /**
         * Convenient command to patch a current user.
         * See https://api.mattermost.com/#tag/users/paths/~1users~1{user_id}~1patch/put
         * @param {UserProfile} userData - user profile to be updated
         * @param {string} userData.email
         * @param {string} userData.username
         * @param {string} userData.first_name
         * @param {string} userData.last_name
         * @param {string} userData.nickname
         * @param {string} userData.locale
         * @param {Object} userData.timezone
         * @param {string} userData.position
         * @param {Object} userData.props
         * @param {Object} userData.notify_props
         * @returns {UserProfile} out.user: `UserProfile` object
         *
         * @example
         *   cy.apiPatchMe({locale: 'en'}).then(({user}) => {
         *       // do something with user
         *   });
         */
        apiPatchMe(userData: UserProfile): Chainable<UserProfile>;

        /**
         * Creates an admin account based from the env variables defined in Cypress env
         * @param {string} options.namePrefix - 'user' (default) or any prefix to easily identify a user
         * @param {boolean} options.bypassTutorial - true (default) or false for user to go thru tutorial steps
         * @returns {UserProfile} `out.sysadmin` as `UserProfile` object
         *
         * @example
         *   cy.apiCreateAdmin(options);
         */
        apiCreateAdmin(options: Record<string, any>): Chainable<UserProfile>;

        /**
         * Creates a new user with an options to set name prefix and be able to bypass tutorial steps
         * @param {string} options.user - predefined `user` object instead on random user
         * @param {string} options.prefix - 'user' (default) or any prefix to easily identify a user
         * @param {boolean} options.bypassTutorial - true (default) or false for user to go thru tutorial steps
         * @returns {UserProfile} `out.user` as `UserProfile` object
         *
         * @example
         *   cy.apiCreateUser(options);
         */
        apiCreateUser(options: Record<string, any>): Chainable<UserProfile>;

        /**
         * Creates a new guest user with an options to set name prefix and be able to bypass tutorial steps
         * @param {string} options.prefix - 'guest' (default) or any prefix to easily identify a guest
         * @param {string} options.activate - true (default) to activate guest user
         * @param {boolean} options.bypassTutorial - true (default) or false for guest to go thru tutorial steps
         * @returns {UserProfile} `out.guest` as `UserProfile` object
         *
         * @example
         *   cy.apiCreateGuestUser(options);
         */
        apiCreateGuestUser(options: Record<string, any>): Chainable<UserProfile>;

        /**
         * Revoke all active sessions for a user.
         * See https://api.mattermost.com/#tag/users/paths/~1users~1{user_id}~1sessions~1revoke~1all/post
         * @param {String} userId - ID of a user
         * @returns {Object} `out.data` as response status
         *
         * @example
         *   cy.apiRevokeUserSessions('user-id');
         */
        apiRevokeUserSessions(userId: string): Chainable<Record<string, any>>;

        /**
         * Get list of users that are not team members
         * See https://api.mattermost.com/#tag/users/paths/~1users/post
         * @param {String} queryParams.teamId - Team ID
         * @param {String} queryParams.page - Page to select, 0 (default)
         * @param {String} queryParams.perPage - The number of users per page, 60 (default)
         * @returns {UserProfile[]} `out.users` as `UserProfile[]` object
         *
         * @example
         *   cy.apiGetUsersNotInTeam({teamId: 'team-id'}).then(({users}) => {
         *       // do something with users
         *   });
         */
        apiGetUsersNotInTeam(queryParams: Record<string, any>): Chainable<UserProfile[]>;

        /**
         * Deactivate a user account.
         * See https://api.mattermost.com/#tag/users/paths/~1users~1{user_id}/delete
         * @param {string} userId - User ID
         *
         * @example
         *   cy.apiDeactivateUser('user-id');
         */
        apiDeactivateUser(userId: string);
    }
}
