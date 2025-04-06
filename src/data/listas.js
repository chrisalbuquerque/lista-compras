export const listas = [
    {
      id: 1,
      nome: 'Compras do mês',
      dataAtualizacao: new Date().toISOString().split('T')[0],
      produtos: [
        { nome: 'Arroz', preco: 20.0, comprado: false, quantidade: 1 },
        { nome: 'Feijão', preco: 7.5, comprado: true, quantidade: 2 },
        { nome: 'Macarrão', preco: 5.0, comprado: false, quantidade: 3 },
      ],
    },
    {
      id: 2,
      nome: 'Churrasco de sábado',
      dataAtualizacao: new Date().toISOString().split('T')[0],
      produtos: [
        { nome: 'Carne', preco: 50.0, comprado: true, quantidade: 1 },
        { nome: 'Refrigerante', preco: 8.0, comprado: false, quantidade: 2 },
        { nome: 'Carvão', preco: 15.0, comprado: false, quantidade: 1 },
      ],
    },
  ]
  
  export function atualizarDataLista(id) {
    const lista = listas.find((l) => l.id === id)
    if (lista) {
      lista.dataAtualizacao = new Date().toISOString().split('T')[0]
    }
  }