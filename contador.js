// import dependecies
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Cria uma função que retorna uma Promise para perguntar algo ao usuário
const askQuestion = (question) => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  };

// read the text and split it on new lines
// const lines = fs.readFileSync("todo-18012025" + ".txt").toString().split("\r\n");
const lines = fs.readFileSync("todo-20102025" + ".txt").toString().split("\n");
// const lines = fs.readFileSync("Novo Documento" + ".txt").toString().split("\n");

// All of the parse topics
let oldchanges = [];
let newchanges = [];

const regex = /(?:-\s*)?\[.*?\]|(?:-\s*)?.*?\|/;
// [ alguma coisa ]
// - [ alguma coisa ]
// alguma coisa|
// - alguma coisa|

// const regex = /\[X\]/
// [X]

// const regex = /\[\s*x\s*\]|\[\s*X\s*\]/
// [x], [X], [ x ], [ X ]

let contadorConclusao = 0
const regexConclusao = /\[\s*[^ ]+\s*\]/
// [x], [X], [ x ], [ X ], [ nao ]

let contadorNovaMeta = 0
const regexNovaMeta = /^[ \t]*-.*/;
// linhas que começam com traços mas pode ter tabulações ou espaços antes.

(async () => {
    for(let i = 0; i<lines.length; i+=1){
        if(lines[i].match(regexNovaMeta)){
            oldchanges.push(lines[i])
            console.log(lines[i])
            contadorNovaMeta++
        }
    }
    console.log(contadorNovaMeta, "novas metas ontem.")
    const resposta1 = await askQuestion("Deseja continuar?")

    let updatedLines
    if(resposta1 == 1){
        updatedLines = lines.map(line => {
            // Verifica se a linha corresponde ao padrão
            if (regexNovaMeta.test(line)) {
              // Faz o replace apenas se o padrão for encontrado
            //   newchanges.push(line)
              return line.replace(/-\s*/, '');
            }
            // Retorna a linha original se não corresponder ao padrão
            return line;
          });
        // console.log(updatedLines)
    }
    // process.exit(0);

    for(let j = 0; j<lines.length; j+=1){
        if(lines[j].match(regexConclusao)){
            oldchanges.push(lines[j])
            console.log(lines[j])
            contadorConclusao++
        }
    }
    console.log(contadorConclusao, "concluídos ontem.")
    const resposta2 = await askQuestion("Deseja continuar?")

    if(resposta2 == 1 && resposta2 == 1){

        updatedLines = updatedLines.map(line => {
            // Verifica se a linha corresponde ao padrão
            if (regexConclusao.test(line)) {
              // Faz o replace apenas se o padrão for encontrado
            //   newchanges.push(line)
              return line.replace(/\[\s*[^ ]+\s*\]/, 'X|');
            } 
            // Retorna a linha original se não corresponder ao padrão
            return line;
          });
        // console.log(updatedLines)
        
        let txt = updatedLines.join("\n")
        // console.log(txt)
        fs.writeFileSync('Novo Documento' + '.txt', txt)
    }

    rl.close()
    console.log(oldchanges)
})();


