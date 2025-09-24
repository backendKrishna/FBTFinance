const axios = require("axios");

const getExchangeRates = async (base = "INR") => {
  try {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`;
    const { data } = await axios.get(url);

    if (data.result !== "success") {
      throw new Error("Failed to fetch exchange rates");
    }

    return data.conversion_rates; // object like { USD: 0.012, INR: 1, AED: 0.044 ... }
  } catch (err) {
    console.error("❌ Error fetching exchange rates:", err.message);
    // fallback if API fails
    return { INR: 1, USD: 83, AED: 22, CAD: 61, AUD: 54 };
  }
};

module.exports = { getExchangeRates };
