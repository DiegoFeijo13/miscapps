const users = [
    {
        name: 'diego',
        email: 'diego.feijo13+groceryList@gmail.com',
        password: 'Jonas07abr24)',
    },
];

const categories = [
    { name: 'Dispensa' },
    { name: 'Área de Serviço' },
    { name: 'Banheiro' },
];

let dispensaId = '86199f99-7dbb-49da-83e6-df16b74d1a20'
let areaDeServicoId = 'a71a615e-fb46-44ff-a03e-6b2ad4e42e5a'
let banheiroId = '8add38a9-bf12-4926-9e12-f48e5fcabeb2'

const products = [
    { name: 'Queijo Muçarela', category_id: dispensaId },
    { name: 'Cream Cheese Light', category_id: dispensaId },
    { name: 'Requeijão sem Lactose', category_id: dispensaId },
    { name: 'Macarrão', category_id: dispensaId },
    { name: 'Aveia', category_id: dispensaId },
    { name: 'Frango', category_id: dispensaId },
    { name: 'Cebola', category_id: dispensaId },
    { name: 'Banana', category_id: dispensaId },
    { name: 'Cenoura', category_id: dispensaId },
    { name: 'Parmesão', category_id: dispensaId },
    { name: 'Tomate', category_id: dispensaId },
    { name: 'Ovo', category_id: dispensaId },
    { name: 'Kit para feijão', category_id: dispensaId },
    { name: 'Creme de Leite sem lactose ', category_id: dispensaId },
    { name: 'Leite Condensado', category_id: dispensaId },
    { name: 'Arroz', category_id: dispensaId },
    { name: 'Vinagre', category_id: dispensaId },
    { name: 'Orégano', category_id: dispensaId },
    { name: 'Óleo Girassol', category_id: dispensaId },
    { name: 'Papel toalha', category_id: dispensaId },

    { name: 'Areia gatas', category_id: areaDeServicoId },
    { name: 'Detergente', category_id: areaDeServicoId },
    { name: 'Saco de lixo', category_id: areaDeServicoId },
    { name: 'Esponja', category_id: areaDeServicoId },
    { name: 'Desinfetante', category_id: areaDeServicoId },
    { name: 'Sabão Líquido para Roupas', category_id: areaDeServicoId },
    { name: 'Amaciante', category_id: areaDeServicoId },
    { name: 'Água Sanitária', category_id: areaDeServicoId },
    { name: 'Petisco Gatas', category_id: areaDeServicoId },
    { name: 'Limpa Vidros', category_id: areaDeServicoId },
    { name: 'Lustra Móveis', category_id: areaDeServicoId },

    { name: 'Tenis Pé', category_id: banheiroId },
    { name: 'Sache Baby Dove Hipoalergenico', category_id: banheiroId },
    { name: 'Desodorante Nivea dry impact', category_id: banheiroId },
    { name: 'Shampoo', category_id: banheiroId },
    { name: 'Condicionador', category_id: banheiroId },
    { name: 'Papel Higiênico', category_id: banheiroId },
    { name: 'Lenço Umedecido', category_id: banheiroId },
    { name: 'Sabonete', category_id: banheiroId },
    { name: 'Desodorante Dove', category_id: banheiroId },
    { name: 'Sabão Líquido', category_id: banheiroId },
    { name: 'Creme Dental', category_id: banheiroId },
]

module.exports = {
    users,
    categories,
    products
};
