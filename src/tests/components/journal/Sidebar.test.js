import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//ayudas
import '@testing-library/jest-dom';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/jorunal/Sidebar';


jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid:'1',
        name: 'Stiven'
    },
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
store.dispatch = jest.fn();

const wrapper= mount( 
    <Provider store={ store }>
        <Sidebar /> 
    </Provider>
     
);

describe('Pruebas en <Sidebar />', () => {
    
    beforeEach( () => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('debe de mostrarse corretamente ', () => {
        expect( wrapper ).toMatchSnapshot();
    })

    test('debe de llamar el startLogout', () => {
        //debe de llamar la acción del logout
         wrapper.find('button').prop('onClick')();

         expect( startLogout ).toHaveBeenCalled();
        
    })

    test('debe de llamar el startNewNote ', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();

        expect( startNewNote ).toHaveBeenCalled();
    });
    
})
