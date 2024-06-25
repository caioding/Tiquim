interface ResumoCarrinhoProps {
  quantItens: number;
  precoTotal: number;
}

export default function ResumoCarrinho({ quantItens, precoTotal }: ResumoCarrinhoProps) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-4 fw-light">Resumo do Carrinho</h5>
        <p className="card-text fw-medium">Quantidade total: {quantItens}</p>
        <p className="card-text fw-medium">Valor total: R${precoTotal}</p>
      </div>
    </div>
  );
}
