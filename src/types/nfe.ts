export interface NFeInput {
  NFe: {
    $?: {
      xmlns?: string;
    };
    infNFe: InfNFe;
  };
}

interface InfNFe {
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

interface Ide {
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

interface Emitente {
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

interface Destinatario {
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

interface DetalheProduto {
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

interface Total {
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

interface Transporte {
  modFrete: string;
}

interface InformacoesAdicionais {
  infCpl: string;
}
