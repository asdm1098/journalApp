import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//ayudas
import '@testing-library/jest-dom';
import { JournalEntry } from '../../../components/jorunal/JournalEntry';
import { activeNote } from '../../../actions/notes';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

//función que me permite crearme un store
let store = mockStore( initState );
store.dispatch = jest.fn();

//parametros que recibe el JournalEntry
const nota = {
    id: 10,
    date: 0,
    title: 'Hola',
    body: 'Mundo',
    url: 'https://sucasa.com/casa.jpg'
} 

const wrapper= mount( 
    <Provider store={ store }>
        <JournalEntry { ...nota } /> 
    </Provider>
     
);

describe('Pruebas en el <JournalEntry />', () => {

    test('debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de activar la nota ', () => {

        wrapper.find('.journal__entry').prop('onClick')();

        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( nota.id, { ...nota })
        );
        
    })
    
    
    
})
