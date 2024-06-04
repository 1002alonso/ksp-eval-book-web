import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { TEXT_FORM } from "../../shared/constant/textForm";
import { ILibro } from '../../shared/interface/responseRequestLibroService';
import { useEffect, useState } from "react";
import { IEditorial } from "../../shared/interface/responseRequestEditorialService";
import { serviceEditorial } from '../../services/bookEditorialService';
import { serviceLibro } from '../../services/libroService';
import { ResponseDefaultError } from "../../shared/interface/responseService";

interface ILibroProps {
    createLibro: boolean, libroForm:ILibro
}

const LibroForm:React.FC<ILibroProps> = (props:ILibroProps)=>{
    const navigate = useNavigate();
    const textForm = TEXT_FORM["formLibro"];
    const textGeneric = TEXT_FORM["formGeneric"];
    const [formData, setFormData] = useState(props.libroForm);
    const [listEditoriales, setListEditoriales] = useState(Array<IEditorial>);
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      
      };

      const handleSubmit = () => {
        console.log(formData);
        if (formData.titulo === '' || formData.folio === '' || formData.autor === '' || formData.numCopias === 0){
           
            setMsgModal(textGeneric.msgDatosNulos);
            setModal(true)
            return
        }

        if (props.createLibro) {
            createLibro(formData);
            navigate(textForm.urlCrudHomeLibro);
          }
          
          const idLibro:string=formData.idLibro ? formData.idLibro : "";
          updateLibro(idLibro, formData)
          navigate(textForm.urlCrudHomeLibro);
        
      }

      const createLibro = async (nuevoLibro: ILibro) => {
        serviceLibro.postLibroCreate(nuevoLibro).subscribe({
          next: (getLibro: ILibro | ResponseDefaultError) => {
            navigate(textForm.urlCrudHomeLibro);
          },
          error: (_error: any) => { },
          complete: () => { },
        });
    
      };

      const updateLibro = async (id:string , editarLibro:ILibro )=>{
        serviceLibro.putLibroUpdate(id, editarLibro).subscribe({
            next: (getLibro: ResponseDefaultError) => {
                
            },
            error: (_error: any) => { },
            complete: () => { navigate(textForm.urlCrudHomeLibro);},
        });
    }

    

    return (<>
        <Form>
           <FormGroup >
               <Label for={textForm.textFolio}>{textForm.textFolio}</Label>
               <Input
                  value={formData.folio}
                  id={textForm.formFolio}
                  name={textForm.formFolio}
                  placeholder={textForm.textFolioHolder}
                  type="text"
                  onChange={handleInputChange}
                />
           </FormGroup>

           <FormGroup >
               <Label for={textForm.textTitulo}>{textForm.textTitulo}</Label>
               <Input
                  value={formData.titulo}
                  id={textForm.formTitulo}
                  name={textForm.formTitulo}
                  placeholder={textForm.textTituloHolder}
                  type="text"
                  onChange={handleInputChange}
                />
           </FormGroup>

           <FormGroup >
               <Label for={textForm.textDescripcion}>{textForm.textDescripcion}</Label>
               
               <Col sm={12}>
               <Input
                  value={formData.descripcion}
                  id={textForm.formDescripcion}
                  name={textForm.formDescripcion}
                  placeholder={textForm.textDescripcionHolder}
                  type="textarea"
                  onChange={handleInputChange}
                />
                </Col>
           </FormGroup>
            
           <FormGroup >
               <Label for={textForm.textAutor}>{textForm.textAutor}</Label>
               <Input
                  value={formData.autor}
                  id={textForm.formAutor}
                  name={textForm.formAutor}
                  placeholder={textForm.textAutorHolder}
                  type="text"
                  onChange={handleInputChange}
                />
           </FormGroup>

           <FormGroup >
               <Label for={textForm.textEditorial}>{textForm.textEditorial}</Label>
               <Input
                  value={formData.fkEditorial}
                  id={textForm.formFkEditorial}
                  name={textForm.formFkEditorial}
                  placeholder={textForm.textEditorislHolder}
                  type="select"
                  onChange={handleInputChange}
                >
                    {listEditoriales.map((item, index) => (
                        <option value={item.id}>{item.nombre}</option>
                    ))}
                
                </Input>
           </FormGroup>

           <FormGroup >
               <Label for={textForm.textAnio}>{textForm.textAnio}</Label>
               <Input
                  value={formData.anio}
                  id={textForm.formAnio}
                  name={textForm.formAnio}
                  placeholder={textForm.textAniolHolder}
                  type="text"
                  onChange={handleInputChange}
                />
           </FormGroup>

           <FormGroup >
               <Label for={textForm.textNumCopias}>{textForm.textNumCopias}</Label>
               <Input
                  value={formData.numCopias}
                  id={textForm.formNumCopias}
                  name={textForm.formNumCopias}
                  placeholder={textForm.textNumCopiasHolder}
                  type="text"
                  onChange={handleInputChange}
                />
           </FormGroup>

           <div className="button-group">
                <Button onClick={handleSubmit} outline color="success">{textGeneric.btnTextEnviar}</Button>
         
                <Link to={textForm.urlCrudHomeLibro} className="btn btn btn-outline-warning" color="warning">
                {textGeneric.btnTextCancelar}
                </Link>

              </div>
        </Form>

        <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>{textForm.titleCardLibro}</ModalHeader>
                <ModalBody>
                    {msgModal}
                </ModalBody>
                <ModalFooter>

                    <Button color="info" onClick={toggle}>
                        {textGeneric.btnTextCerrar}

                    </Button>
                </ModalFooter>
            </Modal>

    </>)

}

export default LibroForm;