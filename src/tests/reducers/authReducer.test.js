const { authReducer } = require("../../reducers/authReducer");
const { types } = require("../../types/types");


describe('Pruebas en authReducer', () => {
    
    test('debe de realizar el login', () => {
        
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'stiven'
            }
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({
            uid: 'abc',
            name: 'stiven'
        })
    });

    test('debe de realizar el logout', () => {
        
        const initState = {
            uid: 'abc123',
            name: 'Stiven'
        };

        const action = {
            type: types.logout,
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({});
    });

    test('No debe hacer cambios en el state', () => {
        
        const initState = {
            uid: 'abc123',
            name: 'Stiven'
        };

        const action = {
            type: types.sdsd,
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );
    });

});
