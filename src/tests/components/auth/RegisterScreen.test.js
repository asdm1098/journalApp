import React from 'react';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//ayudas
import '@testing-library/jest-dom';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../../types/types';



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        notes: [],
        active: null
    }
};

//función que me permite crearme un store
let store = mockStore( initState );
//store.dispatch = jest.fn();

const wrapper= mount( 
    <Provider store = { store } >
        <MemoryRouter>
            <RegisterScreen /> 
        </MemoryRouter>
    </Provider>
);


describe('Pruebas en <RegisterScreen />', () => {

    test('debe mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de hacer el dispatch de la acción respectiva', () => {
        //Obtener input por name
        const emailField = wrapper.find('input[name="email"]');
            //console.log(emailField.exists());
        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        //console.log(actions);

        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        });

    });

    test('debe de mostrar la caja de alerta con el error', () => {
        
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email no es correcto'
            },
        };
        
        //función que me permite crearme un store
        const store = mockStore( initState );
        
        const wrapper= mount( 
            <Provider store = { store } >
                <MemoryRouter>
                    <RegisterScreen /> 
                </MemoryRouter>
            </Provider>
        );

        expect( wrapper.find('.auth__alert-error').exists() ).toBe(true);
        
        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe( initState.ui.msgError );

    })
    
    
    
    
})
