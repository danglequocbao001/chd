import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalService {

    constructor(
        // private toastr: ToastrService,
    ) { }

    // convert base64/URLEncoded data component to a file
    dataURItoBlob(dataURI: any, fileName: string): File {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new File([ia], fileName, { type: mimeString });
    }
    
}
