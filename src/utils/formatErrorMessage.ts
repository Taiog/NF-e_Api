export function formatErrorMessage(rawError: string) {
  const errorMappings: [string, string][] = [
    ["cvc-complex-type.2.4.a", "Faltando elemento obrigatório ou ordem incorreta."],
    ["cvc-complex-type.2.4.b", "Elemento inesperado encontrado."],
    ["cvc-attribute.3", "Atributo obrigatório ausente."],
    ["cvc-attribute.4", "Atributo possui valor inválido."],
    ["cvc-datatype-valid.1.2.1", "Valor inválido para o tipo esperado."],
    ["cvc-elt.1.a", "Elemento não declarado no schema."],
    ["cvc-elt.1", "Elemento obrigatório ausente."],
    ["cvc-type.3.1.3", "Conteúdo inválido para o tipo do elemento."],
    ["cvc-pattern-valid", "Valor não corresponde ao padrão esperado."],
    ["cvc-enumeration-valid", "Valor não está entre os permitidos (enumeração)."],
    ["cvc-minLength-valid", "Valor menor que o mínimo permitido."],
    ["cvc-maxLength-valid", "Valor maior que o máximo permitido."],
    ["cvc-id.1", "Valor duplicado para um identificador único (ID)."],
    ["cvc-identity-constraint.4.1", "Referência inválida para chave primária ou estrangeira."],
    ["cvc-facet-valid", "Valor fora dos limites definidos."],
  ];

  // Identifica mensagem amigável
  const mapping = errorMappings.find(([code]) => rawError.includes(code));
  const userMessage = mapping?.[1] ?? "Erro de validação desconhecido.";

  // Extrai linha (ex: (9:21) → 9)
  const lineMatch = rawError.match(/\((\d+):\d+\)/);
  const lineNumber = lineMatch ? parseInt(lineMatch[1], 10) : undefined;

  return {
    message: lineNumber ? `${userMessage} | Linha: ${lineNumber}` : userMessage,
    original: rawError,
  };
}
