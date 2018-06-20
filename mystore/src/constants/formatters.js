const formatterPrice = new Intl.NumberFormat('pt-PT', {style: 'currency', currency: 'EUR'});
const formatterPercent = new Intl.NumberFormat('pt-PT', {style: 'percent', maximumFractionDigits: 2});

export {
    formatterPrice,
    formatterPercent
}