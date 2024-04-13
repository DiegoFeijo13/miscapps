const users = [
    {
        name: 'diego',
        email: 'diego.feijo13+groceryList@gmail.com',
        password: 'Jonas07abr24)',
    },
];

const products = [
    { name: 'Queijo Muçarela', category: 'Dispensa' },
    { name: 'Cream Cheese Light', category: 'Dispensa' },
    { name: 'Requeijão sem Lactose', category: 'Dispensa' },
    { name: 'Macarrão', category: 'Dispensa' },
    { name: 'Aveia', category: 'Dispensa' },
    { name: 'Frango', category: 'Dispensa' },
    { name: 'Cebola', category: 'Dispensa' },
    { name: 'Banana', category: 'Dispensa' },
    { name: 'Cenoura', category: 'Dispensa' },
    { name: 'Parmesão', category: 'Dispensa' },
    { name: 'Tomate', category: 'Dispensa' },
    { name: 'Ovo', category: 'Dispensa' },
    { name: 'Kit para feijão', category: 'Dispensa' },
    { name: 'Creme de Leite sem lactose ', category: 'Dispensa' },
    { name: 'Leite Condensado', category: 'Dispensa' },
    { name: 'Arroz', category: 'Dispensa' },
    { name: 'Vinagre', category: 'Dispensa' },
    { name: 'Orégano', category: 'Dispensa' },
    { name: 'Óleo Girassol', category: 'Dispensa' },
    { name: 'Papel toalha', category: 'Dispensa' },

    { name: 'Areia gatas', category: 'Área de Serviço' },
    { name: 'Detergente', category: 'Área de Serviço' },
    { name: 'Saco de lixo', category: 'Área de Serviço' },
    { name: 'Esponja', category: 'Área de Serviço' },
    { name: 'Desinfetante', category: 'Área de Serviço' },
    { name: 'Sabão Líquido para Roupas', category: 'Área de Serviço' },
    { name: 'Amaciante', category: 'Área de Serviço' },
    { name: 'Água Sanitária', category: 'Área de Serviço' },
    { name: 'Petisco Gatas', category: 'Área de Serviço' },
    { name: 'Limpa Vidros', category: 'Área de Serviço' },
    { name: 'Lustra Móveis', category: 'Área de Serviço' },

    { name: 'Tenis Pé', category: 'Banheiro' },
    { name: 'Sache Baby Dove Hipoalergenico', category: 'Banheiro' },
    { name: 'Desodorante Nivea dry impact', category: 'Banheiro' },
    { name: 'Shampoo', category: 'Banheiro' },
    { name: 'Condicionador', category: 'Banheiro' },
    { name: 'Papel Higiênico', category: 'Banheiro' },
    { name: 'Lenço Umedecido', category: 'Banheiro' },
    { name: 'Sabonete', category: 'Banheiro' },
    { name: 'Desodorante Dove', category: 'Banheiro' },
    { name: 'Sabão Líquido', category: 'Banheiro' },
    { name: 'Creme Dental', category: 'Banheiro' },
];

const getMoqList = function (page) {
    let lists = [];
    let index = (page-1) * 6    

    for(let i = 1; i<=6; i++){
        let date = new Date();
        date.setDate(date.getDate() + index + i);
        let dateStr = date.toLocaleDateString("pt-br")                
        lists.push(
            { id: `${index + i}`, name: `Mercado ${index + i}`, date: dateStr },
        )
    }
    return lists;
}

module.exports = {
    users,
    products,
    getMoqList
};
