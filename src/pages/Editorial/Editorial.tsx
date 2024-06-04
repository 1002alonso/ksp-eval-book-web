import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardTitle, Col, List, Modal, ModalBody, ModalFooter, ModalHeader, NavLink, Row, Table } from 'reactstrap';
import { serviceEditorial } from '../../services/bookEditorialService';
import { IEditorial } from '../../shared/interface/responseRequestEditorialService';
import { ResponseDefaultError } from '../../shared/interface/responseService';
import { TEXT_FORM } from '../../shared/constant/textForm';
import { Link, useNavigate } from 'react-router-dom';




const EditorialPage = () => {
    const navigate = useNavigate();
    let deleteEditorial:IEditorial={};
    const textForm = TEXT_FORM["formEditorial"];
    const textGeneric = TEXT_FORM["formGeneric"];
    const [listEditoriales, setListEditoriales] = useState(Array<IEditorial>);
    const [editorial, setEditorial]= useState(deleteEditorial);
    const [modal, setModal] = useState(false);
    const [msgModal, setMsgModal] = useState("");
    const toggle = () => setModal(!modal);


    const getEditorialesAll = async () => {
        serviceEditorial.getEditorialReadAll().subscribe({
            next: (getListEditoriales: Array<IEditorial> | ResponseDefaultError) => {
                if (Array.isArray(getListEditoriales)) {
                    setListEditoriales(getListEditoriales);
                }

            },
            error: (_error: any) => { },
            complete: () => { },
        });

    }

    useEffect(() => {
        getEditorialesAll();
    }, []);

    const confirmarEliminarEditorial = (editorial: IEditorial) => {
        setModal(true);
        setMsgModal(`${textForm.msgEliminarEditorial} ${editorial.nombre}`);
        setEditorial(editorial);
    }

    const eliminarEditorial = async ()=>{
        let id = editorial.id? editorial.id :"";
        setModal(false);
        serviceEditorial.deleteEditorialDelete(id).subscribe({
            next: (getEditorial: ResponseDefaultError) => {
                navigate('/editorial');
               
            },
            error: (_error: any) => { },
            complete: () => {
                navigate('/editorial');
             },
        });
    }

    return (

        <>
            <Row>
                <Col lg="12">
                    <Card>
                        <CardTitle tag="h3" className="border-bottom p-3 mb-0">
                            {textForm.titleCardEditorial}
                        </CardTitle>

                        <CardBody className="">
                            <div className="button-group">

                                <Link to={textForm.urlCrudNuevoEditorial} className="btn btn btn-outline-success" color="success">
                                    {textForm.titleCrudAddEditorial}
                                </Link>

                            </div>

                            <Table bordered striped>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>{textForm.titleCrudEditorial}</th>
                                        <th>{textGeneric.titleCrudAccion}</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {listEditoriales.map((item, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.nombre}</td>
                                            <td>
                                                <div className="button-group">

                                                    <Link to={textForm.urlCrudEditEditorial} state={item} className="btn btn btn-outline-info" color="success">
                                                        {textGeneric.btnTextActualizar}
                                                    </Link>

                                                    <Button className="btn" outline color="warning" onClick={() => confirmarEliminarEditorial(item)}>
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
                <ModalHeader toggle={toggle}>{textForm.titleCardEditorial}</ModalHeader>
                <ModalBody>
                    {msgModal}
                </ModalBody>
                <ModalFooter>
                    <Button className="btn" onClick={eliminarEditorial} outline color="danger">
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

export default EditorialPage;
