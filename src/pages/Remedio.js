import { useState } from "react";
import Header from "../components/Header/Header";
import Tabela from "../components/Tabela/Tabela";
import Input from "../components/Input/Input";
import Modal from "../components/Modal/Modal";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import Pesquisa from "../components/Pesquisa/Pesquisa";
import listaRemedios from '../remedios.json'
import './Remedio.css'
import './Style.css'



export default function Remedio() {

    const listaOpcoesPesquisa = [
        { 
            "codigo" : "TD",
            "nome": "Todos",
            "type": "text",
            "readOnly":true
        },
        { 
            "codigo" : "ID",
            "nome": "Código",
            "type": "number",
            "readOnly":false
        },
        { 
            "codigo" : "DESC",
            "nome": "Descrição",
            "type": "text",
            "readOnly":false
        }
    ]

    const remedio = {"codigo" : "", "nome": ""};

    const header = [{"tam":"10px", "desc":"Código"}, {"tam":"300px","desc":"Nome"},{"tam":"10px","desc":"Ações"}];

    const [remedios, setRemedios] = useState(listaRemedios.remedios)
    const [formData, setFormData] = useState(remedio)

    const [showBotaoAtualizar, setShowBotaoAtualizar] = useState(false)
    const [isOpen, setIsOpen] = useState(false)



    const mostrarBotaoAtualizar = (mostrar) => setShowBotaoAtualizar(mostrar)

    const pesquisar = (opcaoPesquisa, conteudoPesquisa) =>{

         if(opcaoPesquisa === "TD"){
            setRemedios(listaRemedios.remedios);
        } else{
            setRemedios(listaRemedios.remedios.filter(m => {
                if(opcaoPesquisa === "ID"){
                    if(m.codigo === conteudoPesquisa){
                        return m; 
                    }
                }else
                if(opcaoPesquisa === "DESC"){
                    //if(m.descricao.toLowerCase().indexOf(conteudoPesquisa) >=0){
                    if(m.nome.includes(conteudoPesquisa)){
                        return m; 
                    }
                } 
            })); 
        } 
    }

    const iniciarAlteracao = (remedioAlterado) =>{
        setFormData(remedioAlterado)
        mostrarBotaoAtualizar(true);
        setIsOpen(true);
        
    }

    const iniciarIncluir = () =>{
        setFormData(remedio)
        mostrarBotaoAtualizar(false);
        setIsOpen(true);
    }

    const excluir = (remedioExcluido) =>{
        setRemedios(listaRemedios.remedios.filter(m => m.codigo !== remedioExcluido.codigo));
        listaRemedios.remedios = listaRemedios.remedios.filter(m => m.codigo !== remedioExcluido.codigo);
        
    }

    const incluir = (evento) =>{
       
        evento.preventDefault();
        setRemedios([...remedios,formData]);
        listaRemedios.remedios.push(formData);
        setIsOpen(false);
        alert("Incluido com sucesso!!")
    }

    const alterar = (evento) =>{
        
        evento.preventDefault();
        let lista = remedios.map(element => {
                    console.log(element);
                    if(element.codigo === formData.codigo){
                        return formData;
                    }else{
                        return element
                    }
        });
        setRemedios(lista);
        listaRemedios.remedios = lista;
        setFormData(remedio);
        mostrarBotaoAtualizar(false);
        setIsOpen(false);
        alert("Alterado com sucesso!!")
    }
    
   

    return (
        <div className="content">
            
            <Header titulo='Remédio'></Header>
            <Main>
                <Pesquisa iniciarIncluir={iniciarIncluir} pesquisar={pesquisar} listaOpcoesPesquisa={listaOpcoesPesquisa}></Pesquisa>
                <Tabela lista={remedios} header={header} iniciarAlteracao={iniciarAlteracao} excluir={excluir}></Tabela>
            </Main>
            <Footer></Footer>            
            <Modal titulo="Cadastro de Remédio" isOpen={isOpen} onClose={() => setIsOpen(false)} showBotaoAtualizar={showBotaoAtualizar} incluir={incluir} alterar={alterar}>
                <form className="form">
                    <Input 
                        type="text"
                        id="id"
                        name="id"
                        label="Código:"
                        //readOnly
                        onChange =  {(e) => setFormData({...formData, codigo: e.target.value})}
                        value={formData.codigo}
                    />
                    <Input 
                        onChange =  {(e) => setFormData({...formData, nome: e.target.value})}
                        type="text"
                        id="nome"
                        name="nome"
                        label="Nome:"
                        size="40"
                        required
                        value={formData.nome}
                    />
                    
                </form>
            </Modal>
            
        </div>
    )
}