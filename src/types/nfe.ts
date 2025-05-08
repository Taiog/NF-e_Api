export interface NFeDB {
  chave: string;
  emitente: string;
  destinatario: string;
  dataEmissao: Date;
  valorTotal: number;
  xml: string;
}
export interface NFeInput {
  NFe: {
    $?: {
      xmlns?: string;
    };
    infNFe: InfNFe;
  };
}

export interface InfNFe {
  $: {
    Id: string;
    versao: string;
  };
  ide: Ide;
  emit: Emitente;
  dest?: Destinatario;
  det: DetalheProduto[];
  total?: Total;
  transporta?: Transporte;
  infAdic?: InformacoesAdicionais;
}

export interface Ide {
  cUF: string;
  natOp: string;
  mod: string;
  serie: string;
  nNF: string;
  dhEmi: string;
  tpNF: string;
  idDest: string;
  cMunFG: string;
  tpImp: string;
  tpEmis: string;
  cDV: string;
  tpAmb: string;
  finNFe: string;
  indFinal: string;
  indPres: string;
  procEmi: string;
  verProc: string;
}

export interface Emitente {
  CNPJ: string;
  xNome: string;
  enderEmit: {
    xLgr: string;
    nro: string;
    xBairro: string;
    cMun: string;
    xMun: string;
    UF: string;
    CEP: string;
    cPais: string;
    xPais: string;
    fone?: string;
  };
  IE: string;
  CRT: string;
}

export interface Destinatario {
  CNPJ?: string;
  CPF?: string;
  xNome: string;
  enderDest: {
    xLgr: string;
    nro: string;
    xBairro: string;
    cMun: string;
    xMun: string;
    UF: string;
    CEP: string;
    cPais: string;
    xPais: string;
    fone?: string;
  };
  indIEDest: string;
  IE?: string;
}

export interface DetalheProduto {
  $: { nItem: string };
  prod: {
    cProd: string;
    xProd: string;
    NCM: string;
    CFOP: string;
    uCom: string;
    qCom: string;
    vUnCom: string;
    vProd: string;
    uTrib: string;
    qTrib: string;
    vUnTrib: string;
    indTot: string;
  };
  imposto: {
    ICMS: any;
    PIS?: any;
    COFINS?: any;
  };
}

export interface Total {
  ICMSTot: {
    vBC: string;
    vICMS: string;
    vICMSDeson?: string;
    vFCP?: string;
    vBCST?: string;
    vST?: string;
    vProd: string;
    vFrete?: string;
    vSeg?: string;
    vDesc?: string;
    vII?: string;
    vIPI?: string;
    vPIS?: string;
    vCOFINS?: string;
    vOutro?: string;
    vNF: string;
  };
}

export interface Transporte {
  modFrete: string;
}

export interface InformacoesAdicionais {
  infCpl: string;
}
