export interface Category {
  id: string;
  name: string;
  subcategories?: Category[];
}

export const CATEGORIES_DATA: Category[] = [
  {
    id: '1',
    name: 'Roupas Femininas',
    subcategories: [
      { id: '1-1', name: 'Vestidos', subcategories: [{ id: '1-1-1', name: 'Vestidos de Festa' }, { id: '1-1-2', name: 'Casual' }] },
      { id: '1-2', name: 'Blusas', subcategories: [{ id: '1-2-1', name: 'Camisetas' }, { id: '1-2-2', name: 'Cropped' }] },
    ]
  },
  {
    id: '2',
    name: 'Eletrodomésticos',
    subcategories: [
      { 
        id: '2-1', 
        name: 'TVs e Acessórios', 
        subcategories: [
          { id: '2-1-1', name: 'TVs' },
          { id: '2-1-2', name: 'Suportes de TV' },
          { id: '2-1-3', name: 'Antenas' }
        ] 
      },
      { id: '2-2', name: 'Cozinha', subcategories: [{ id: '2-2-1', name: 'Liquidificadores' }] },
    ]
  },
  {
    id: '3',
    name: 'Celulares e Dispositivos',
    subcategories: [
      { id: '3-1', name: 'Celulares', subcategories: [{ id: '3-1-1', name: 'Android' }, { id: '3-1-2', name: 'iPhone' }] },
    ]
  }
];