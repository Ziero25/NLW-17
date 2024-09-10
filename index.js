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

const { select, input } = require('@inquirer/prompts')

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
                console.log("Vamos listar")
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }
    }
    
}

start()