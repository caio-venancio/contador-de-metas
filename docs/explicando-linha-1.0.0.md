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