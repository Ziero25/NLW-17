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

const start = () => {
    while(true){
        let opcao = "Sair"
        switch(opcao) {
            case "Cadastrar":
                console.log("Vamos cadastrar")
                break
            case "Listar":
                console.log("Vamos listar")
                break
            case "Sair":
                return
        }
    }
    
}

start()