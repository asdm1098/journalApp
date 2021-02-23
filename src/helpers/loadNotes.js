import { db } from "../firebase/firebase-config"


export const loadNotes = async ( uid ) => {
    //Referencia a la db
    const notesSnap = await db.collection( `${ uid }/journal/notes` ).get();
    const notes = [];

    //console.log(notesSnap);

    notesSnap.forEach( snapHijo => {
        
        //console.log(snapHijo.data());

        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    //console.log(notes);
    return notes;
}