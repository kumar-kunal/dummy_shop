const currencyFormater = (number, countryType = "usa") => {
   let currencies = {
      canada: {
         lg: "en-CA",
         currency: "CAD",
      },
      usa: {
         lg: "en-US",
         currency: "USD",
      },
   };

   if (isNaN(parseInt(number) || parseFloat(number))) {
      return null;
   }

   const isDecimal = parseFloat(number) % 2 !== 0;

   return new Intl.NumberFormat(currencies[countryType].lg, {
      style: "currency",
      currency: currencies[countryType].currency,
      minimumFractionDigits: isDecimal ? 2 : 0,
   }).format(number);
};

module.exports = currencyFormater;
