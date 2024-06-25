const valorTotalProduto = (precoUnitario: number, quantidade: number): number =>
  precoUnitario * quantidade;

interface ItemCarrinhoProps {
  item: ItemCarrinho;
  removerItemDoCarrinho: (id: string) => void;
}

export default function ItemCarrinho({ item, removerItemDoCarrinho }: ItemCarrinhoProps) {
  return (
    <tr key="1">
      <td>{item.nome}</td>
      <td>R$ {item.preco.toString()}</td>
      <td>{item.quantidade.toString()}</td>
      <td>R$ {valorTotalProduto(item.preco, item.quantidade).toFixed(2)}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => removerItemDoCarrinho(item.id)}>
          Remover
        </button>
      </td>
    </tr>
  );
}
