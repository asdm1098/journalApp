const { types } = require("../../types/types")

describe('Pruebas en types', () => {

    test('debe tener estos types', () => {
        
        expect( types ).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        
            //Tipos errores uiReducer
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
        
            //Loading
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
        
            //JournalScreen - NOTES
            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Updated note',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
        })
    });
    
})
