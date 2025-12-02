export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    imagemUrl: string;
}

export interface ItemCarrinho extends Produto {
    quantidadeCarrinho: number;
}
