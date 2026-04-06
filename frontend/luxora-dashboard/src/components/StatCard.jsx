function StatCard({title,value}){

 return(

  <div className="card">

   <h4>{title}</h4>

   <h2>{value}</h2>

   <p style={{color:"green",fontWeight:"bold"}}>
    ↑ 12% growth
   </p>

  </div>

 )

}

export default StatCard;