import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import { TEXT_FORM } from '../../shared/constant/textForm';
import { Link, useLocation } from 'react-router-dom';
import { IUsuarioLibro } from '../../shared/interface/responseRequestUserLibroService';
import { serviceLibro } from '../../services/libroService';
import { ILibro } from '../../shared/interface/responseRequestLibroService';
import { ResponseDefaultError } from '../../shared/interface/responseService';
import { servicePrestamoLibro } from '../../services/prestamoService';
import { IPrestamo } from '../../shared/interface/responseRequestPrestamoService';


const PrestamoPage = () => {

    let deleteLibro:ILibro={};
    const textForm = TEXT_FORM["formUsuarioLibro"];
    const textGeneric = TEXT_FORM["formGeneric"];
    const textPrestamo = TEXT_FORM["formPrestamo"];
    const textFormLibro = TEXT_FORM["formLibro"];
    const [listLibros, setListLibros] = useState(Array<ILibro>);
    const [listPrestamo, setListPrestamo] = useState(Array<IPrestamo>);
    const [modal, setModal] = useState(false);
    const [msgModal, setMsgModal] = useState("");
    const toggle = () => setModal(!modal);


    const location = useLocation();
    const dataUsuarioLibro: IUsuarioLibro = location.state;
    

    const getLibrosAll = async () => {
        serviceLibro.getLibroReadAll().subscribe({
            next: (getListLibros: Array<ILibro> | ResponseDefaultError) => {
                if (Array.isArray(getListLibros)) {
                    setListLibros(getListLibros);
                }

            },
            error: (_error: any) => { },
            complete: () => { },
        });
    }

    const getLibrosPrestamoAll = async () => {
        let idUsuario:string= dataUsuarioLibro.idLibroUsuario? dataUsuarioLibro.idLibroUsuario:"";
       
        servicePrestamoLibro.getUsuarioPrestamoReadAll(idUsuario).subscribe({
            next: (getListLibrosPrestamo: Array<IPrestamo> | ResponseDefaultError) => {
                if (Array.isArray(getListLibrosPrestamo)) {
                    setListPrestamo(getListLibrosPrestamo);
                }

            },
            error: (_error: any) => { },
            complete: () => { },
        });
    }



    useEffect(() => {
        getLibrosAll();
        getLibrosPrestamoAll();
    }, []);

    const nuevoPrestamoLibro=(selectLibro : ILibro)=>{
        
        let nuevoPrestamo:IPrestamo={
            fkLibro:selectLibro.idLibro,
            fkLibroUsuario:dataUsuarioLibro.idLibroUsuario
        }
        
        createPrestamoLibro(nuevoPrestamo);
       
    }

    const createPrestamoLibro = async (nuevoPrestamo: IPrestamo) => {
        console.log(nuevoPrestamo)
        servicePrestamoLibro.postCreatePrestamo(nuevoPrestamo).subscribe({
          next: (getPrestamo: ResponseDefaultError) => {
     
      
            let codigoError:string = getPrestamo.code? getPrestamo.code : "";
            setModal(true);
            setMsgModal(`${codigoError} ${getPrestamo.mesage}`);
            getLibrosPrestamoAll();
          
          },
          error: (_error: any) => { },
          complete: () => { },
        });
    
      };

      const updatePrestamoLibro = async (editarPrestamo:IPrestamo )=>{
        let idPrestamo:string= editarPrestamo.idPrestamo? editarPrestamo.idPrestamo:"";
        servicePrestamoLibro.putUsuarioPrestamoUpdate(idPrestamo, editarPrestamo).subscribe({
            next: (getPrestamo: ResponseDefaultError) => {

                setModal(true);
                setMsgModal(textPrestamo.textMensaje);
                getLibrosPrestamoAll();
            },
            error: (_error: any) => { },
            complete: () => { },
        });
    }

    return (


        <>
            <Row>
                <Col lg="12">

                    <Card>
                        <CardTitle tag="h3" className="border-bottom p-3 mb-0">{textPrestamo.titleCardPrestamo}</CardTitle>
                        <CardBody>

                            <Form>
                                <FormGroup >
                                    <Label for={textForm.textClaveUsuario}>{textForm.textClaveUsuario}</Label>
                                    <Label for={textForm.textClaveUsuario}>{`:  ${dataUsuarioLibro.claveUsuario}`}</Label>
                                </FormGroup>
                                <FormGroup >
                                    <Label for={textForm.textNombreUsuario}>{textForm.textNombreUsuario}</Label>
                                    <Label for={textForm.textNombreUsuario}>{`:  ${dataUsuarioLibro.nombre}`}</Label>
                                </FormGroup>
                            </Form>
                            <CardTitle tag="h5" className="border-bottom p-3 mb-0">{textPrestamo.titleLibrosPrestamo}</CardTitle>
                            
                            <Table bordered striped>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>{textFormLibro.titleCrudClaveLibro}</th>
                                        <th>{textFormLibro.titleCrudLibro}</th>
                                        <th></th>
                                        
                                    </tr>
                            </thead>
                            <tbody>
                                
                                {listPrestamo.map((item, index) => (
                                   <tr>
                                       <th scope="row">{index + 1}</th>
                                       <th scope="row">{item.fechaPrestamo}</th>
                                       <th scope="row">{item.tituloLibro}</th>
                                       <th><Button className="btn" outline color="info" onClick={()=>updatePrestamoLibro(item)}>
                                                     {textGeneric.btnTextDevolucion}
                                        </Button>
                                        </th>
                                   </tr>
                                ))}

                            </tbody>
                            </Table>

                            <CardTitle tag="h5" className="border-bottom p-3 mb-0">{textPrestamo.titleSeleccionarLibros}</CardTitle>

                            <Table bordered striped>
                            <thead>
                                    <tr>
                                        <th></th>
                                        <th>{textFormLibro.titleCrudClaveLibro}</th>
                                        <th>{textFormLibro.titleCrudLibro}</th>
                                        <th>{textFormLibro.titleCrudAutor}</th>
                                        <th>{textGeneric.titleCrudAccion}</th>
                                    </tr>


                                </thead>
                                <tbody>
                                {listLibros.map((item, index) => (
                                     <tr>
                                     <th scope="row">{index + 1}</th>
                                     <td>{item.folio}</td>
                                     <td>{item.titulo}</td>
                                     <td>{item.autor}</td>
                                     <td>
                                             <div className="button-group">

                                                
                                                 <Button className="btn" outline color="warning" onClick={()=>nuevoPrestamoLibro(item)}>
                                                     {textGeneric.btnTextPrestamo}
                                                 </Button>
                                             </div>

                                         </td>

                                 </tr>
                                ))}
                                
                                </tbody>
                            </Table>
                        
                        </CardBody>
                    </Card>


                </Col>

            </Row>

            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>{textPrestamo.titleCardPrestamo}</ModalHeader>
                <ModalBody>
                    {msgModal}
                </ModalBody>
                <ModalFooter>
                   

                    <Button color="info" onClick={toggle}>
                        {textGeneric.btnTextCerrar}

                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
};

export default PrestamoPage;