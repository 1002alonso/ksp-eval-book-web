import {Observable} from "rxjs";
import { ResponseDefaultError } from "../shared/interface/responseService";
import { ILibro } from "../shared/interface/responseRequestLibroService";
import { TEXT_FORM } from '../shared/constant/textForm';

const textAPI = TEXT_FORM["api"];


class libroService{
    getLibroReadAll(): Observable<Array<ILibro> | ResponseDefaultError>{
        return new Observable <Array<ILibro> | ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/libro`,{})
            .then(response => response.json())
            .then (data =>{
                objerver.next(data);
                objerver.complete();
            })
            .catch(err => objerver.error(err));
        });
    }

    postLibroCreate(nuevoLibro:ILibro): Observable<ILibro | ResponseDefaultError>{
        return new Observable <ILibro | ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/libro`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoLibro),
            })
            .then(response => response.json())
            .then (data =>{
                objerver.next(data);
                objerver.complete();
            })
            .catch(err => objerver.error(err));
        });
    }

    putLibroUpdate(id:string, updateLibro:ILibro): Observable<ResponseDefaultError>{
        return new Observable <ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/libro`+ `/${id}`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateLibro),
            })
            .then(response => response.json())
            .then (data =>{
                objerver.next(data);
                objerver.complete();
            })
            .catch(err => objerver.error(err));
        });
    }

    deleteLibroDelete(id:string): Observable<ResponseDefaultError>{
        return new Observable <ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/libro`+ `/${id}`,{
                method: "DELETE",
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

export const serviceLibro= new libroService();