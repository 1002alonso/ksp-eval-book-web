import {Observable} from "rxjs";
import { ResponseDefaultError } from "../shared/interface/responseService";
import { IUsuarioLibro } from "../shared/interface/responseRequestUserLibroService";
import { TEXT_FORM } from '../shared/constant/textForm';

const textAPI = TEXT_FORM["api"];

class usuarioLibroService{

    getUsuarioLibroReadAll(): Observable<Array<IUsuarioLibro> | ResponseDefaultError>{
        return new Observable <Array<IUsuarioLibro> | ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/usuario-libro`,{})
            .then(response => response.json())
            .then (data =>{
                objerver.next(data);
                objerver.complete();
            })
            .catch(err => objerver.error(err));
        });
    }

    postUsuarioLibroCreate(nuevoUsuarioLibro:IUsuarioLibro): Observable<IUsuarioLibro | ResponseDefaultError>{
        return new Observable <IUsuarioLibro | ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/usuario-libro`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoUsuarioLibro),
            })
            .then(response => response.json())
            .then (data =>{
                objerver.next(data);
                objerver.complete();
            })
            .catch(err => objerver.error(err));
        });
    }

    putUsuarioLibroUpdate(id:string, updateUsuarioLibro:IUsuarioLibro): Observable<ResponseDefaultError>{
        return new Observable <ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/usuario-libro`+ `/${id}`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateUsuarioLibro),
            })
            .then(response => response.json())
            .then (data =>{
                objerver.next(data);
                objerver.complete();
            })
            .catch(err => objerver.error(err));
        });
    }

    deleteUsuarioLibroDelete(id:string): Observable<ResponseDefaultError>{
        return new Observable <ResponseDefaultError>(objerver =>{
            fetch(`${textAPI.localhost}/control-biblioteca/usuario-libro`+ `/${id}`,{
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

export const serviceUsuarioLibro= new usuarioLibroService();