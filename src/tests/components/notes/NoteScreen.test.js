import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//ayudas
import '@testing-library/jest-dom';
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';


jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
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
        active: {
            id: 1234,
            title: 'Hola',
            body: 'Mundo',
            date: 0
        },
        notes: []
    }

};

//función que me permite crearme un store
let store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper= mount( 
    <Provider store={ store }>
        <NoteScreen /> 
    </Provider>
     
);

describe('Pruebas en <NoteScreen />', () => {

    test('debe de mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de disparar el active Note ', () => {

        //simulación del cambio en la caja de texto
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });

        //simular si el activeNote fue llamado
        //expect( activeNote ).toHaveBeenCalled();
        /*expect( activeNote ).toHaveBeenCalledWith(
            1234,
            {
                body: 'body',
                title: 'title',
                id: 1234,
                date: 0
            }
        );*/

        //ver la ultima vez que se ejecuta
        expect( activeNote ).toHaveBeenLastCalledWith(
            1234,
            {
                body: 'Mundo',
                title: 'Hola de nuevo',
                id: 1234,
                date: 0
            }
        );




        
    })
    
    
    
})
