import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { STATUS } from './http';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        @Inject(Injector) private readonly injector: Injector
    ) {}
    handleError(error) {
        console.log(error, 'error');
        // this.toastrService.error(error.error, STATUS.FAIL, { onActivateTick: true });
        // if (error.fields && error.fields.length > 0) {
        //     this.toastrService.error(error.fields[0].message || error.fields, STATUS.FAIL, { onActivateTick: true });
        // } else if (error.message) {
        //     this.toastrService.error(error.error, STATUS.FAIL, { onActivateTick: true });
        // }
    }
    /**
     * Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
     * @returns {} 
     */
    // private get toastrService(): ToastrService {
    //     return this.injector.get(ToastrService);
    // }
}
