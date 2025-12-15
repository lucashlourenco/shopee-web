export interface OrderItem {
  name: string;
  variation: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  buyerName: string;
  status: 'A Enviar' | 'Enviando' | 'Concluído' | 'Cancelado';
  total: number;
  items: OrderItem[];
  date: string;
}

export const ORDERS_DATA: Order[] = [
  {
    id: '230701U8X912',
    buyerName: 'maria_silva123',
    status: 'A Enviar',
    total: 89.90,
    date: '12/12/2025',
    items: [
      {
        name: 'Vestido Longo Floral Verão',
        variation: 'Vermelho, M',
        quantity: 1,
        price: 89.90,
        image: 'https://via.placeholder.com/80'
      }
    ]
  },
  {
    id: '230702P9Y345',
    buyerName: 'joao_souza_br',
    status: 'Enviando',
    total: 159.80,
    date: '10/12/2025',
    items: [
      {
        name: 'Camiseta Básica Algodão',
        variation: 'Preta, G',
        quantity: 2,
        price: 49.90,
        image: 'https://via.placeholder.com/80'
      },
      {
        name: 'Boné Aba Reta',
        variation: 'Preto',
        quantity: 1,
        price: 59.90,
        image: 'https://via.placeholder.com/80'
      }
    ]
  },
  {
    id: '230629A1B234',
    buyerName: 'ana_clara_99',
    status: 'Concluído',
    total: 25.00,
    date: '01/12/2025',
    items: [
      {
        name: 'Capinha de Celular Transparente',
        variation: 'iPhone 13',
        quantity: 1,
        price: 25.00,
        image: 'https://via.placeholder.com/80'
      }
    ]
  }
];