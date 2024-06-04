import {  Link, useNavigate } from "react-router-dom";

import { Button, FormGroup, Input, Label,Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { TEXT_FORM } from "../../shared/constant/textForm";
import { IEditorial } from "../../shared/interface/responseRequestEditorialService";
import { useState } from "react";
import { serviceEditorial } from '../../services/bookEditorialService';
import { ResponseDefaultError } from "../../shared/interface/responseService";

interface IEditorialProps {createEditorial: boolean, editorialData:IEditorial}

const EditorialForm:React.FC<IEditorialProps> = (props:IEditorialProps) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(props.editorialData);
    const textForm = TEXT_FORM["formEditorial"];
    const textGeneric = TEXT_FORM["formGeneric"];
    const [modal, setModal] = useState(false);
    const [msgModal, setMsgModal] = useState("");
    const toggle = () => setModal(!modal);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      

      };

      const handleSubmit = () => {
       
        if (formData.nombre === ''){
           
            setMsgModal(textGeneric.msgDatosNulos);
            setModal(true)
            return
        }
      
        if (props.createEditorial) {
          createEditorial(formData);
          navigate('/editorial');
        } 
        const idEditorial:string=formData.id ? formData.id : "";

        updateEditorial(idEditorial, formData)
        navigate('/editorial');
      };

  const createEditorial = async (nuevaEditorial: IEditorial) => {
    serviceEditorial.postEditorialCreate(nuevaEditorial).subscribe({
      next: (getEditoriale: IEditorial | ResponseDefaultError) => {

      },
      error: (_error: any) => { },
      complete: () => { },
    });

  };

    const updateEditorial = async (id:string , editarEditorial:IEditorial )=>{
        serviceEditorial.putEditorialUpdate(id, editarEditorial).subscribe({
            next: (getEditorial: ResponseDefaultError) => {
              
            },
            error: (_error: any) => { },
            complete: () => { },
        });
    }

    return (
        <>
        <Form>
              <FormGroup >
                <Label for={textForm.textNombre}>{textForm.textNombre}</Label>
                <Input
                  value={formData.nombre}
                  id={textForm.idNombre}
                  name={textForm.idNombre}
                  placeholder={textForm.textNombrexHolder}
                  type="text"
                  onChange={handleInputChange}
                />
              </FormGroup>



              <div className="button-group">
                <Button onClick={handleSubmit} outline color="success">{textGeneric.btnTextEnviar}</Button>
         
                <Link to={textForm.urlCrudHomeEditorial} className="btn btn btn-outline-warning" color="warning">
                {textGeneric.btnTextCancelar}
                </Link>

              </div>
            </Form>
            
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>{textForm.titleCardEditorial}</ModalHeader>
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
}
export default EditorialForm;

