import { userService } from '../services/user.service.js';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
};

function login(username, password, from) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: 'LOGIN_REQUEST', user } }
    function success(user) { return { type: 'LOGIN_SUCCESS', user } }
    function failure(error) { return { type: 'LOGIN_FAILURE', error } }
}

function logout() {
    userService.logout();
    return { type: 'LOGOUT' };
}
