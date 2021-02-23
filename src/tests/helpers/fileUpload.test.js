import cloudinary from 'cloudinary';

import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'ddhgmsz5k', 
    api_key: '944642932123651', 
    api_secret: '9c1PnmyoYLBhBjXtnXNsTrz1Bgw' 
});

describe('Pruebas en fileUpload', () => {

    test('debe cargar un archivo y retornar el url', async( done ) => {

        //creación de archivo
        const resp = await fetch('data:image/png;base64,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');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');

        //uso de la función fileUpload
        //el fileUpload retorna un url que es una promesa
        const url = await fileUpload( file );
                 //console.log(url);

        expect( typeof url ).toBe('string');

        //BORAR IMAGEN POR ID
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1].replace('.png', '');
        
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done();
        });

    });

    test('debe de retornar un error', async() => {

        const file = new File([], 'foto.png');

        //uso de la función fileUpload
        //el fileUpload retorna un url que es una promesa
        const url = await fileUpload( file );
                 //console.log(url);

        expect( url ).toBe(null);

    });
    
    
})
