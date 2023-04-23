import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Form, Modal, Table } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ToastContainer from "react-bootstrap/esm/ToastContainer";
import Toast from 'react-bootstrap/Toast'
import Categoria from "../types/Categoria";
import { HiPencilSquare } from 'react-icons/hi2';
import { IoTrashBin } from 'react-icons/io5';

const URL = 'http://localhost:8080/categorias';

function Categorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [show, setShow] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: '' });

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const getCategorias = () => {
        axios.get(URL)
            .then(response => {
                setCategorias(response.data)
            });
    }

    useEffect(() => {
        document.title = 'Categorias'
        getCategorias();
    }, []);

    const excluir = async (id?: number) => {
        try {
            await axios.delete(URL + `/${id}`);
            setMensagem('Excluído com sucesso');
            getCategorias();
        } catch (e: any) {
            setMensagem(e.response?.data?.mensagem ?? 'Erro ao salvar categoria');
        }

        setShow(true);
    }

    const getCategoria = async (id?: number) => {
        const data = await axios.get(URL + `/${id}`);
        const categoria: Categoria = data.data;

        if (categoria) {
            setCategoria(categoria);
            setShowModal(true);
        }
    }

    const salvar = async () => {
        try {
            if (categoria.id) {
                await axios.put(URL + `/${categoria.id}`, categoria);
            } else {
                await axios.post(URL, categoria);
            }
            setShowModal(false);
            getCategorias();
            setMensagem("Categoria salva com sucesso!")
        } catch (e: any) {
            setMensagem(e.response?.data?.mensagem ?? 'Erro ao salvar categoria');
        }

        setShow(true);
    }

    return (
        <>
            <div className="m-4">
                <Row>
                    <Col md='3'>
                        <Button variant="success" onClick={() => {
                            setCategoria({ nome: '' });
                            handleShowModal();
                        }}> + Categoria</Button>
                    </Col>
                </Row>

                <Table striped hover>
                    <thead>
                        <tr>
                            <td>Código</td>
                            <td>Nome</td>
                            <td>#</td>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map(cat => {
                            return <tr key={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.nome}</td>
                                <td>
                                    <a onClick={() => excluir(cat.id)}><IoTrashBin /></a>
                                    <a onClick={() => getCategoria(cat.id)}><HiPencilSquare /></a>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de categorias</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Nome" value={categoria?.nome} onChange={(e) => { setCategoria({ id: categoria.id, nome: e.target.value }) }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={salvar}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position="bottom-start" className="m-5">
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Categorias</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {mensagem}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}

export default Categorias;