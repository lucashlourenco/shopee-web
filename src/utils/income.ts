export interface IncomeTransaction {
  id: string;
  orderId: string;
  date: string;
  amount: number;
  status: 'Pendente' | 'Liberado';
  buyerName: string;
}

export const INCOME_DATA: IncomeTransaction[] = [
  {
    id: 'TRX-987654',
    orderId: '230701U8X912',
    date: '12/12/2025',
    amount: 85.50, // Valor líquido (já descontada a taxa)
    status: 'Pendente',
    buyerName: 'maria_silva123'
  },
  {
    id: 'TRX-987655',
    orderId: '230702P9Y345',
    date: '10/12/2025',
    amount: 145.00,
    status: 'Pendente',
    buyerName: 'joao_souza_br'
  },
  {
    id: 'TRX-123456',
    orderId: '230629A1B234',
    date: '01/12/2025',
    amount: 22.50,
    status: 'Liberado',
    buyerName: 'ana_clara_99'
  },
  {
    id: 'TRX-123457',
    orderId: '230520C3D456',
    date: '28/11/2025',
    amount: 180.00,
    status: 'Liberado',
    buyerName: 'carlos_edu'
  }
];