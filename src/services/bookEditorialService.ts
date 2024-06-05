import {Observable} from "rxjs";
import { ResponseDefaultError } from "../shared/interface/responseService";
import { IEditorial } from "../shared/interface/responseRequestEditorialService";

import { TEXT_FORM } from '../shared/constant/textForm';

const textAPI = TEXT_FORM["api"];

class bookEditorialService{
    getEditorialReadAll(): Observable<Array<IEditorial> | ResponseDefaultError>{
        return new Observable <Array<IEditorial> | ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/editorial`,{})
            .then(response => response.json())
            .then (data =>{
                objerver.next(data);
                objerver.complete();
            })
            .catch(err => objerver.error(err));
        });
    }

    postEditorialCreate(nuevaEdidorial:IEditorial): Observable<IEditorial | ResponseDefaultError>{
        return new Observable <IEditorial | ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/editorial`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaEdidorial),
            })
            .then(response => response.json())
            .then (data =>{
                objerver.next(data);
                objerver.complete();
            })
            .catch(err => objerver.error(err));
        });
    }

    putEditorialUpdate(id:string, updateEdidorial:IEditorial): Observable<ResponseDefaultError>{
        return new Observable <ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/editorial`+ `/${id}`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateEdidorial),
            })
            .then(response => response.json())
            .then (data =>{
                objerver.next(data);
                objerver.complete();
            })
            .catch(err => objerver.error(err));
        });
    }

    deleteEditorialDelete(id:string): Observable<ResponseDefaultError>{
        return new Observable <ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/editorial`+ `/${id}`,{
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



export const serviceEditorial= new bookEditorialService();