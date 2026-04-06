import { loadCSV } from "./dataLoader";

export const getTrendingInsights = async () => {

 const items = await loadCSV("/data/olist_order_items_dataset.csv");

 const productCount = {};

 items.forEach(item => {

  const id = item.product_id;

  if(!id) return;

  if(!productCount[id]) productCount[id] = 0;

  productCount[id] += 1;

 });

 const sorted = Object.entries(productCount)
  .sort((a,b)=>b[1]-a[1]);

 const topProduct = sorted[0];

 return {

  totalProducts: Object.keys(productCount).length,
  topProduct: topProduct ? topProduct[0] : "N/A",
  topSales: topProduct ? topProduct[1] : 0

 };

}

export const getForecast = (data) => {

 const forecast = [];

 const last = data[data.length - 1]?.sales || 100;

 for(let i=1;i<=3;i++){

  forecast.push({
   month:"Forecast " + i,
   sales: Math.round(last * (1 + i*0.05))
  })

 }

 return forecast;

}

export const fetchForecast = async () => {

 const response = await fetch("http://localhost:8000/forecast");

 const data = await response.json();

 return data.forecast;

}