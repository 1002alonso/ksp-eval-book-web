import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle, Col, List, Modal, ModalBody, ModalFooter, ModalHeader, NavLink, Row, Table } from 'reactstrap';
import { TEXT_FORM } from '../../shared/constant/textForm';
import { IUsuarioLibro } from '../../shared/interface/responseRequestUserLibroService';
import { serviceUsuarioLibro } from '../../services/usuarioLibroService';
import { ResponseDefaultError } from '../../shared/interface/responseService';
import { Link, useNavigate } from 'react-router-dom';


const UsuarioLibroPage = () => {
    const navigate = useNavigate();
    const textForm = TEXT_FORM["formUsuarioLibro"];
    const textGeneric = TEXT_FORM["formGeneric"];
    let deleteUsuarioLibro:IUsuarioLibro={
        claveUsuario:"",
        nombre:"",
        direccion:"",
        telefono:""

    };
    const [listUsuarioLibro, setUsuarioLibro] = useState(Array<IUsuarioLibro>);
    const [modal, setModal] = useState(false);
    const [msgModal, setMsgModal] = useState("");
    const toggle = () => setModal(!modal);
    const [deleteUser, setUser]= useState(deleteUsuarioLibro);

    const getUsuarioLibrosAll = async () => {
        serviceUsuarioLibro.getUsuarioLibroReadAll().subscribe({
            next: (getListUsuarioLibro: Array<IUsuarioLibro> | ResponseDefaultError) => {
                if (Array.isArray(getListUsuarioLibro)) {
                    setUsuarioLibro(getListUsuarioLibro);
                }

            },
            error: (_error: any) => { },
            complete: () => { },
        });
    }

    useEffect(() => {
        getUsuarioLibrosAll();
    }, []);

    const confirmarEliminarUsuarioLibro = (usuarioLibro: IUsuarioLibro) => {
        setModal(true);
        setMsgModal(`${textForm.msgEliminarUsuarioLibro} ${usuarioLibro.nombre}`);
        setUser(usuarioLibro);
    }

    const eliminarUsuarioLibro = async ()=>{
        let id = deleteUser.idLibroUsuario? deleteUser.idLibroUsuario :"";
        setModal(false);
        serviceUsuarioLibro.deleteUsuarioLibroDelete(id).subscribe({
            next: (getEditorial: ResponseDefaultError) => {
                navigate(textForm.urlCrudHomeUsuarioLibro);
               
            },
            error: (_error: any) => { },
            complete: () => {
                navigate(textForm.urlCrudHomeUsuarioLibro);
             },
        });
    }

    return (

        <>
            <Row>
                <Col lg="12">
                    <Card>
                        <CardTitle tag="h3" className="border-bottom p-3 mb-0">
                            {textForm.titleCardUsuarioLibro}
                        </CardTitle>

                        <CardBody className="">
                            <div className="button-group">

                                <Link to={textForm.urlCrudNuevoUsuarioLibro} className="btn btn btn-outline-success" color="success">
                                    {textForm.titleCrudAddUsuarioLibro}
                                </Link>

                            </div>

                            <Table bordered striped>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>{textForm.titleCrudClave}</th>
                                        <th>{textForm.titleCrudUsuarioLibro}</th>
                                        <th>{textGeneric.titleCrudAccion}</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {listUsuarioLibro.map((item, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.claveUsuario}</td>
                                            <td>{item.nombre}</td>
                                            <td>
                                                <div className="button-group">

                                                    <Link to={textForm.urlCrudEditarUsuarioLibro} state={item} className="btn btn btn-outline-info" color="success">
                                                        {textGeneric.btnTextActualizar}
                                                    </Link>

                                                    <Button className="btn" outline color="warning" onClick={() => confirmarEliminarUsuarioLibro(item)}>
                                                        {textGeneric.btnTextEliminar}
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
                <ModalHeader toggle={toggle}>{textForm.titleCardUsuarioLibro}</ModalHeader>
                <ModalBody>
                    {msgModal}
                </ModalBody>
                <ModalFooter>
                    <Button className="btn" onClick={eliminarUsuarioLibro} outline color="danger">
                    {textGeneric.btnTextEliminar}

                        
                    </Button>

                    <Button color="info" onClick={toggle}>
                        {textGeneric.btnTextCerrar}

                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
};

export default UsuarioLibroPage;
