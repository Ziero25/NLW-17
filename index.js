// hello world
//const mensagem = "Hello Gui!"
//console.log(mensagem);
//{
//    const mensagem = "olá mundo"
//    console.log(mensagem)
//}
//console.log(mensagem);

// arrays, objetos
//let metas = ["Gui", "alo"]

//console.log(metas[1] + ", " + metas[0])

//let meta ={
 //   value: 'ler um livro todo mês',
    //address: 2,
  //  checked: true,
    //log: (info) => {
    //    console.log(info)
    //}
//}

//let metas = [
  //  meta,
   // {
    //    value: "caminhar 20 minutos todos os dias",
     //   checked: false
    //}
//]

// console.log(metas[1].value)

// function // arrow function

const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem vindo ao App de Metas";

let metas 

const carregarMetas = async () =>{
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

carregarMetas()

const cadastrarMeta = async () => {
    const meta = await input({ message:"Digite a meta que deseja inserir:"})

    if(meta.length == 0){
        mensagem = "A meta não pode ser vazia"
        return
    }
        metas.push(
            { value: meta, checked: false }
        )
    mensagem = "Meta cadastrada com sucesso!"
    
}

const listarMetas = async () => {
    if(metas.length == 0){
        mensagem = "Não existem metas"
        return
    }
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })
    metas.forEach((m) =>{
        m.checked = false
    })

    if(respostas.length ==0 ){
        mensagem = "Nenhuma meta selecionada!"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) marcada(s) como concluída(s)"
}

const metasRealizadas = async () =>{
    if(metas.length == 0){
        mensagem = "Não existem metas"
        return
    }
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = "Não existem metas realizadas! :( "
        return
    }

    await select({
        message: "Metas realizadas -> " + realizadas.length,
        choices: [...realizadas]
    })
    mensagem = "A meta concluída com sucesso!"
}

const metasAbertas = async () =>{
        if(metas.length == 0){
        mensagem = "Não existem metas"
        return
    }
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        mensagem = "Não existem metas abertas! :) "
        return
    }

    await select({
        message: "Metas Abertas -> " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () =>{
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    if(metasDesmarcadas.length == 0){
        mensagem = "Não há meta(s) a serem deletada(s)"
        return
    }

    const itemsADeletar = await checkbox({
        message: "Selecione o item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itemsADeletar.length == 0){
        mensagem = "Nenhum item para deletar!"
        return
    }

    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Metas(s) deletada(s) com sucesso!"
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    await carregarMetas()

    while(true){
        await salvarMetas()
        mostrarMensagem()

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar abertas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]   
                
        })

        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                await salvarMetas()
                break
            case "listar":
                await listarMetas()
                await salvarMetas()
                console.log("Vamos listar")
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                await salvarMetas()
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }
    }
    
}

start()