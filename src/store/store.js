import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

//aplicar diferentes middlewares
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


//Para poder usar multiples reducers, ya que por defecto solo admite 1
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})

//Configuración para trabajar acciones asíncronas en nuestra aplicación
export const store = createStore(
    reducers, 
    composeEnhancers(
        applyMiddleware( thunk )
    )
);