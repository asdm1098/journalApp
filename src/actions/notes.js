import Swal from 'sweetalert2';

import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from '../helpers/fileUpload';

//react-journal


//Tarea asíncrona, crear nueva nota
export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        
        const {uid} = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        try {
            const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
            
            dispatch( activeNote( doc.id, newNote ));
            //activar nota creada
            dispatch( addNewNote( doc.id, newNote ));    

        } catch (error) {
            console.log(error);
        }

    }
}

//Activar nota creada de una vez
export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
});

//Activar nota
export const activeNote = ( id, note ) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});


//cargar notas, función asincrona
export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );

    }
}


//Grabar notas obtenidas de firestore en nuestro store
export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes 
});


//Grabar en la base de datos los cambios de la nota activa, firestore 
//tarea asíncrona
export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        if( !note.url ){
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        //acción que actualiza
        dispatch( refreshNote( note.id, noteToFirestore ));
        Swal.fire('Saved', note.title, 'success');
    }
}


//Actualizar únicamente la nota que cambio en el store, la que se actualizo
export const refreshNote = ( id, note ) => ({
     type: types.notesUpdated,
     payload: {
         id, 
         note: {
             id,
             ...note
         }
     }
});

//SUBIR IMAGÉN A CLOUDFIRE USANDO EL HELPER
export const startUploading = ( file ) => {
    return async ( dispatch, getState ) => {
        
        const { active: activeNote } = getState().notes;
        
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
        //petición asincrona del url de la imagen subida, helpers
        const fileUrl = await fileUpload( file );
        //console.log(fileUrl);

        //ACTUALIZAR URL DE LA NOTA ACTIVA
        activeNote.url = fileUrl;
        dispatch( startSaveNote( activeNote ));

        Swal.close();
    
    }
}


//BORRAR UNA NOTA, asíncrona

export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {

        //borrar de firestore
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/journal/notes/${ id  }`).delete();

        //borrar del store
        dispatch( deleteNote(id));

    }
}

//Borrar de mi store la nota
export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})


//PURGAR LAS NOTAS AL REALIZAR LOGOUT
export const notesLogout = () => ({
    type: types.notesLogoutCleaning
})