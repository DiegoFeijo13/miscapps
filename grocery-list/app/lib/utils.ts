//Format date into yyyy-mm-dd string
export const formatDateToEdit = (date: Date) => {
  return (date.toISOString().split('T')[0])
}

export const formatCurrency = (amount: number) => {
  let locale = 'pt-br';
  let options = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }
  let formatter = new Intl.NumberFormat(locale, options);

  return formatter.format(amount);
};

export const formatNumber = (amount: number) => {
  let locale = 'pt-br';
  let options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }
  let formatter = new Intl.NumberFormat(locale, options);

  return formatter.format(amount)
};

export const formatNumberToLocaleString = (amount: number) => {
  return (amount).toLocaleString('pt-br', {
    style: 'amount',
    currency: 'BRL',
  });

};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'pt-br',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};
