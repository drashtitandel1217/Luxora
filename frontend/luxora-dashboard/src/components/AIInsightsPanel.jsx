import { useEffect, useState } from "react";
import { getTrendingInsights } from "../services/analytics";

export default function AIInsightsPanel(){

 const [insights,setInsights] = useState(null);

 useEffect(()=>{

  const loadInsights = async ()=>{

   const data = await getTrendingInsights();

   setInsights(data);

  }

  loadInsights();

 },[])

 if(!insights) return <div className="ai-panel">Loading insights...</div>

 return(

  <div className="ai-panel">

    <h3>AI Business Insights</h3>

    <ul>

        <li>🔥 Top Selling Product: {insights.topProduct}</li>
        <li>📈 Total Products Sold: {insights.topSales}</li>
        <li>📦 Unique Products: {insights.totalProducts}</li>
        <li>📊 Dataset Analysis Active</li>

    </ul>

  </div>

 )

}