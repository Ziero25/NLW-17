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

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas =[ meta ]

const cadastrarMeta = async () => {
    const meta = await input({ message:"Digite a meta que deseja inserir:"})

    if(meta.length == 0){
        console.log('A meta não pode ser vazia')
        return cadastrarMeta()
    }
        metas.push(
            { value: meta, checked: false }
        )
    
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })
    if(respostas.length ==0 ){
        console.log("Nenhuma meta selecionada!")
        return listarMetas()
    }

    metas.forEach((m) =>{
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcadas como concluída(s)')
}

const start = async () => {
    while(true){
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
                    name: "Sair",
                    value: "sair"
                }
            ]   
                
        })

        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                console.log("Vamos listar")
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }
    }
    
}

start()