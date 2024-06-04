import React, { useEffect, useState } from 'react'
import { serviceLibro } from '../../services/libroService';
import { ILibro } from '../../shared/interface/responseRequestLibroService';
import { ResponseDefaultError } from '../../shared/interface/responseService';
import { Button, Card, CardBody, CardTitle, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import { TEXT_FORM } from '../../shared/constant/textForm';
import { Link, useNavigate } from 'react-router-dom';

const LibroPage = () => {
    const navigate = useNavigate();
    let deleteLibro:ILibro={};
    const textForm = TEXT_FORM["formLibro"];
    const textGeneric = TEXT_FORM["formGeneric"];
    const [listLibros, setListLibros] = useState(Array<ILibro>);
    const [modal, setModal] = useState(false);
    const [msgModal, setMsgModal] = useState("");
    const toggle = () => setModal(!modal);
    const [selectLibro, setSelectLibro]= useState(deleteLibro);



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

    useEffect(() => {
        getLibrosAll();
    }, []);

    const confirmarEliminarLibro = (editorial: ILibro) => {
        setModal(true);
        setMsgModal(`${textForm.msgEliminarEditorial} ${editorial.titulo}`);
        setSelectLibro(editorial);
    }

    const eliminarLibro = async ()=>{
        let id = selectLibro.idLibro? selectLibro.idLibro :"";
        setModal(false);
        serviceLibro.deleteLibroDelete(id).subscribe({
            next: (getEditorial: ResponseDefaultError) => {
                navigate(textForm.urlCrudHomeLibro);
               
            },
            error: (_error: any) => { },
            complete: () => {
                navigate(textForm.urlCrudHomeLibro);
             },
        });
    }

    return (

        <>
            <Row>
                <Col lg="12">
                    <Card>
                        <CardTitle tag="h3" className="border-bottom p-3 mb-0">
                            {textForm.titleCardLibro}
                        </CardTitle>
                        <CardBody className="">
                            <div className="button-group">
                                <Link to={textForm.urlCrudNuevoLibro} className="btn btn btn-outline-success" color="success">
                                    {textForm.titleCrudAddLibro}
                                </Link>
                            </div>

                            <Table bordered striped>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>{textForm.titleCrudClaveLibro}</th>
                                        <th>{textForm.titleCrudLibro}</th>
                                        <th>{textForm.titleCrudAutor}</th>
                                        <th>{textForm.titleCrudNumCopias}</th>
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
                                        <td>{item.numCopias}</td>
                                        <td>
                                                <div className="button-group">

                                                    <Link to={textForm.urlCrudEditLibro} state={item} className="btn btn btn-outline-info" color="success">
                                                        {textGeneric.btnTextActualizar}
                                                    </Link>

                                                    <Button className="btn" outline color="warning" onClick={() => confirmarEliminarLibro(item)}>
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
                <ModalHeader toggle={toggle}>{textForm.titleCardLibro}</ModalHeader>
                <ModalBody>
                    {msgModal}
                </ModalBody>
                <ModalFooter>
                    <Button className="btn" onClick={eliminarLibro} outline color="danger">
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

export default LibroPage;
