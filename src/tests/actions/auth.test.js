import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

//ayudas
import '@testing-library/jest-dom';

const { login, logout, startLogout, startLoginEmailPassword } = require("../../actions/auth");
const { types } = require("../../types/types");



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

//función que me permite crearme un store
let store = mockStore( initState );

describe('Pruebas con las acciones de Auth', () => {

    beforeEach( () => {
        store = mockStore(initState);
    });

    test('Login y logout deben de crear la acción respectiva', () => {

        const uid = 'ABC123';
        const displayName = 'Stiven';

        const loginAction  = login( uid, displayName );
        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        expect( logoutAction ).toEqual({
            type: types.logout
        })
        
    });

    test('debe de realizar el logout', async() => {
        
        await store.dispatch( startLogout() );

        const actions = store.getActions();
        //console.log(actions);

        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });
    });

    test('debe iniciar el startLoginEmailPassword', async() => {
        
        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );

        const actions = store.getActions();
        //console.log(actions);

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'JWzaDHRCkRbY80NbXMirCT4CEuI3',
                displayName: null
            }
        })

    });

});
