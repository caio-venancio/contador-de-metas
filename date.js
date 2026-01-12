export function isValidDDMMYYYY(dateString) {
    // 1. Verificar o formato usando uma expressão regular (ddmmyyyy)
    // Garante exatamente 8 dígitos numéricos
    const formatRegex = /^\d{8}$/;
    if (!formatRegex.test(dateString)) {
        return false;
    }

    // 2. Extrair dia, mês e ano da string
    const day = parseInt(dateString.substring(0, 2), 10);
    const month = parseInt(dateString.substring(2, 4), 10);
    const year = parseInt(dateString.substring(4, 8), 10);

    // 3. Verificar os limites básicos (mês entre 1 e 12, dia entre 1 e 31)
    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    }

    // 4. Verificar o número de dias em meses específicos (incluindo anos bissextos)
    const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Lógica para ano bissexto:
    // Um ano é bissexto se for divisível por 4, exceto se for divisível por 100,
    // mas não se for divisível por 400.
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        daysInMonth[2] = 29;
    }

    // Verificar se o dia está dentro do intervalo válido para o mês e ano específicos
    if (day > daysInMonth[month]) {
        return false;
    }

    // Se todas as verificações passarem, a data é válida
    return true;
}

// Exemplos de uso:
// console.log(`"25122024" é válido? ${isValidDDMMYYYY("25122024")}`); // true
// console.log(`"31022024" é válido? ${isValidDDMMYYYY("31022024")}`); // false (fevereiro só tem 29 dias em 2024)
// console.log(`"29022024" é válido? ${isValidDDMMYYYY("29022024")}`); // true (2024 é bissexto)
// console.log(`"29022023" é válido? ${isValidDDMMYYYY("29022023")}`); // false (2023 não é bissexto)
// console.log(`"010124" é válido? ${isValidDDMMYYYY("010124")}`);     // false (formato incorreto, apenas 6 dígitos)
// console.log(`"abcde" é válido? ${isValidDDMMYYYY("abcde")}`);       // false (não é numérico)
// console.log(`"12122024" é válido? ${isValidDDMMYYYY("12122024")}`); // true

export function extractDateDDMMYYYY(string){
    try {
        const reDDMMYYYY = /(\d{2})(\d{2})(\d{4})/;
        const correspondencia = string.match(reDDMMYYYY);
        return correspondencia[0]
    } catch (err) {
        return false;
    }   
}

export function parseDate(str) {
  const digits = str.replace(/\D/g, ""); // remove letras
  const day = Number(digits.slice(0, 2));
  const month = Number(digits.slice(2, 4)) - 1; // JS começa em 0
  const year = Number(digits.slice(4, 8));

  return new Date(year, month, day);
}