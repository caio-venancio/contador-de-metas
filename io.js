import fs from "fs/promises"

export async function readFiles() {
  try {
    const arquivos = await fs.readdir('.'); 
    return arquivos;
  } catch (err) {
    console.error('Erro ao ler o diretório:', err);
  }
}


