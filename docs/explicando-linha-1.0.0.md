# Explicando o código da versão 1.0.0

`const fs = require("fs");`

require é um comando no Node.js, e aqui ele é utilizado para importar o módulo File System (Sistema de Arquivos), permitindo que seu código interaja com o sistema de arquivos do computador.

`const readline = require("readline");`

require é um comando no Node.js, e aqui ele é utilizado para importar o módulo readline. Este módulo
provê uma interface para ler dados de streams, usado para criar interative command-line interfaces.

```
const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
```

.createInterface é um método do módulo readline que retorna uma instância de readline.Interface, e recebe como argumento um objeto do tipo option, que necessarimaente necessita da chave input para funcionar. Neste caso, process.stdin vai ser o fluxo de entrada padrão do node.js e process.stdout é fluxo de saída padrão do node.js.

```
const askQuestion = (question) => {
    return new Promise((resolve) => {
      userInput.question(question, (answer) => {
        resolve(answer);
      });
    });
  };
```

`const lines = fs.readFileSync(".todo-16112025" + ".txt").toString().split("\n");`

```
let oldchanges = [];
let newchanges = [];
```

`const regex = /(?:-\s*)?\[.*?\]|(?:-\s*)?.*?\|/;`

```
let contadorConclusao = 0
const regexConclusao = /\[\s*[^ ]+\s*\]/
```

```
let contadorNovaMeta = 0
const regexNovaMeta = /^[ \t]*-.*/;
```

`(async () => {`

```
    for(let i = 0; i<lines.length; i+=1){
        if(lines[i].match(regexNovaMeta)){
            oldchanges.push(lines[i])
            console.log(lines[i])
            contadorNovaMeta++
        }
    }
    console.log(contadorNovaMeta, "novas metas ontem.")
```

`const resposta1 = await askQuestion("Deseja continuar?")`

```
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
```

```
    for(let j = 0; j<lines.length; j+=1){
        if(lines[j].match(regexConclusao)){
            oldchanges.push(lines[j])
            console.log(lines[j])
            contadorConclusao++
        }
    }
    console.log(contadorConclusao, "concluídos ontem.")
```

`const resposta2 = await askQuestion("Deseja continuar?")`

```
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
```

Primeiro, verifica a resposta do usuário em resposta1 e resposta2 (seria bom trocar para nomes mais intuitivos).
updatedLines é uma variável no escopo da função asíncrona. então ele usa o método .map para que em cada linha ele:
regexconclusão.test() testa a regex e adiciona em new changes e retorna substítuido. ou retorna normal se não for diferentes
por fim ele junta as linhas em \n e depois escreve com .txt

```
//({...

    userInput.close()
    console.log(oldchanges)
    console.log("-" + contadorConclusao + "-" + contadorNovaMeta + "-")
})();
```