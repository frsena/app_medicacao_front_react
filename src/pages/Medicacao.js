import { useState } from "react";
import Header from "../components/Header/Header";
import Tabela from "../components/Tabela/Tabela";
import Pesquisa from "../components/Pesquisa/Pesquisa";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import Input from "../components/Input/Input";
import listaMedicacoes from '../medicacoes.json'
import listaRemedios from '../remedios.json'
import Select from "../components/Select/Select";
import './Medicacao.css'
import './Style.css'


export default function Medicacao() {

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
        },
        { 
            "codigo" : "Rem",
            "nome": "Remedio",
            "type": "text",
            "readOnly":false
        }
    ]

    const medicacao = { 
        "codigo" : "",
        "remedio": "",
        "descricao": "",
        "qtdVezesDias": "",
        "qtdDias": "",
        "dataInicio": "",
        "obs":""
    };

    const header = [{"tam":"10px", "desc":"Código"}, {"tam":"300px","desc":"Remédio"},{"tam":"300px","desc":"Descrição"},{"tam":"10px","desc":"Quantidade vezes ao dia"},
                    {"tam":"10px", "desc":"Quantidade de dias"}, {"tam":"170px","desc":"Data inicio"},{"tam":"300px","desc":"Observação"},{"tam":"10px","desc":"Ações"}];

               
    const [medicacoes, setMedicacoes] = useState(listaMedicacoes.medicacoes);
    const [formData, setFormData] = useState(medicacao);
                
    const [showBotaoAtualizar, setShowBotaoAtualizar] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
                
                
                
    const mostrarBotaoAtualizar = (mostrar) => setShowBotaoAtualizar(mostrar)



    const pesquisar = (opcaoPesquisa, conteudoPesquisa) =>{

        if(opcaoPesquisa === "TD"){
            setMedicacoes(listaMedicacoes.medicacoes);
        } else{
            setMedicacoes(listaMedicacoes.medicacoes.filter(m => {
                if(opcaoPesquisa === "ID"){
                    if(m.codigo === conteudoPesquisa){
                        return m; 
                    }
                }else
                if(opcaoPesquisa === "DESC"){
                    if(m.descricao.includes(conteudoPesquisa)){
                        return m; 
                    }
                }else
                    if(opcaoPesquisa === "Rem"){
                        if(m.remedio.includes(conteudoPesquisa)){
                            return m; 
                        }
                    }
            })); 
        }
    }

    const iniciarIncluir = () =>{
        setFormData(medicacao)
        mostrarBotaoAtualizar(false);
        setIsOpen(true);
    }               

    const iniciarAlteracao = (medicacaoAterar) =>{
   
        medicacaoAterar.dataInicio =  medicacaoAterar.dataInicio.split('-').reverse().join('-');
        setFormData(medicacaoAterar);
        mostrarBotaoAtualizar(true);
        setIsOpen(true);
    }


    const excluir = (medicacaoExcluir) =>{
        setMedicacoes(medicacoes.filter(m => m.codigo !== medicacaoExcluir.codigo));
        listaMedicacoes.medicacoes = listaMedicacoes.medicacoes.filter(m => m.codigo !== medicacaoExcluir.codigo);
        console.log(medicacaoExcluir);
    }

    const incluir = (evento) =>{
       
        evento.preventDefault();
        // Formatar a data e exibir na tabela o nome do remedio
        let valor = {...formData, dataInicio: formData.dataInicio.split('-').reverse().join('-'), 
            remedio :   listaRemedios.remedios.map(rem => {  if(rem.codigo === formData.remedio){ return  rem.nome } })}

        setMedicacoes([...medicacoes,valor])
        listaMedicacoes.medicacoes.push(valor);
        setIsOpen(false);
        alert("Incluido com sucesso!!")
    }

    const alterar = (evento) =>{
        
        evento.preventDefault();
        // Formatar a data e exibir na tabela o nome do remedio
        let lista = medicacoes.map(element => {
                    if(element.codigo === formData.codigo){
                        return {...formData, dataInicio: formData.dataInicio.split('-').reverse().join('-'), 
                                             remedio :   listaRemedios.remedios.map(rem => {  if(rem.codigo === formData.remedio){ return  rem.nome } })
                        };
                    }else{
                        return element
                    }
        });
        setMedicacoes(lista);
        listaMedicacoes.medicacoes = lista;
        setFormData(medicacao);
        mostrarBotaoAtualizar(false);
        setIsOpen(false);
        alert("Alterado com sucesso!!")
    }

    return (
        <div className="content">
            <Header titulo='Controle da Medicação'></Header>
            <Main>
                <Pesquisa iniciarIncluir={iniciarIncluir} pesquisar={pesquisar} listaOpcoesPesquisa={listaOpcoesPesquisa}></Pesquisa>
                <Tabela lista={medicacoes} header={header} iniciarAlteracao={iniciarAlteracao} excluir={excluir}></Tabela>
            </Main>
            <Footer></Footer>
            <Modal titulo="Cadastro da Medicação" isOpen={isOpen} onClose={() => setIsOpen(false)} showBotaoAtualizar={showBotaoAtualizar} incluir={incluir} alterar={alterar}>
                <form className="form">
                    <div className="divLinha">
                        <div className="divIdentificador">
                            <Input 
                            type="text"
                            label="Código:"
                            //readOnly
                            onChange =  {(e) => setFormData({...formData, codigo: e.target.value})}
                            value={formData.codigo}
                            className="inputDialog"
                            />
                        </div>
                        <div className="divRemedio" >
                            <Select  label='Remedio:'
                                itens={listaRemedios.remedios}
                                valor={formData.remedio}
                                className="inputDialog"
                                labelOption="Selecione Remedio"
                                onChange={(e) => setFormData({...formData, remedio: e.target.value })}
                            />
                        </div>
                        <div className="divDataInicio">                       
                            <Input 
                                onChange =  {(e) => setFormData({...formData, dataInicio: e.target.value})}
                                type="date"
                                label="Data de inicio:"
                                required
                                value={formData.dataInicio}
                                className="inputDialog"
                            />
                        </div>
                    </div>
                    <div className="divDescricao">
                        <Input 
                            onChange =  {(e) => setFormData({...formData, descricao: e.target.value})}
                            type="text"
                            label="Descrição:"
                            size="40"
                            required
                            value={formData.descricao}
                            className="inputDescricao"
                        />
                    </div>
                    <div className="divLinha">
                        <div className="divQuantidadeVezes">
                            <Input 
                                onChange =  {(e) => setFormData({...formData, qtdVezesDias: e.target.value})}
                                type="number"
                                label="Quantidade de vezes ao dia:"
                                required
                                value={formData.qtdVezesDias}
                                className="inputQuantidade"
                            />
                        </div>
                        <div className="divQuantidadeDias">
                            <Input 
                                onChange =  {(e) => setFormData({...formData, qtdDias: e.target.value})}
                                type="number"
                                label="Quantidade de dias:"
                                required
                                value={formData.qtdDias}
                                className="inputQuantidade" 
                            />
                        </div>
                    </div>
                    <div className="divDescricao">
                        <Input 
                            onChange =  {(e) => setFormData({...formData, obs: e.target.value})}
                            type="text"
                            label="Observação:"
                            required
                            value={formData.obs}
                            className="inputDescricao"
                        />
                    </div>
                </form>
            </Modal>
        </div>
 


    )


}