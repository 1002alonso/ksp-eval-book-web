import { Observable } from "rxjs";
import { IPrestamo } from "../shared/interface/responseRequestPrestamoService";
import { ResponseDefaultError } from "../shared/interface/responseService";
import { TEXT_FORM } from '../shared/constant/textForm';

const textAPI = TEXT_FORM["api"];

class prestamoService {
    
    postCreatePrestamo(nuevoPrestamo:IPrestamo): Observable<ResponseDefaultError>{
    
     
        return new Observable <ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/prestamo`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoPrestamo),
            })
            .then(response => response.json())
            .then (data =>{
                objerver.next(data);
                objerver.complete();
            })
            .catch(err => objerver.error(err));
        });
     }

     getUsuarioPrestamoReadAll(id:string): Observable<Array<IPrestamo> | ResponseDefaultError>{
        return new Observable <Array<IPrestamo> | ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/prestamo`+ `/${id}`,{
            })
            .then(response => response.json())
            .then (data =>{
                objerver.next(data);
                objerver.complete();
            })
            .catch(err => objerver.error(err));
        });
    }

    putUsuarioPrestamoUpdate(id:string, updatePrestamo:IPrestamo): Observable<ResponseDefaultError>{
        return new Observable <ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/prestamo`+ `/${id}`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatePrestamo),
            })
            .then(response => response.json())
            .then (data =>{
                objerver.next(data);
                objerver.complete();
            })
            .catch(err => objerver.error(err));
        });
    }
}

export const servicePrestamoLibro= new prestamoService();