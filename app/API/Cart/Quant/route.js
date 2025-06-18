import pool from "@/lib/db";

export async function PUT(req) {
    try {
        const { cartsid, user_id, operator } = await req.json();
        const values = [cartsid,user_id]
        if(operator === "+"){
            const Query = ('UPDATE _carts SET quantity = (quantity + 1) WHERE carts_id = $1 AND user_id = $2 AND quantity < 100')
            await pool.query(Query,values)
        }
        else if(operator === "-"){
            const Query = ('UPDATE _carts SET quantity = (quantity - 1) WHERE carts_id = $1 AND user_id = $2 AND quantity > 1')
            await pool.query(Query,values)  
        }
        else{
            console.log("Somthing went wrong ! Operator missing")
            return new Response(JSON.stringify({message: "Somthing went wrong ! Operator missing"}),{status:401})
        }
        return new Response(JSON.stringify({message: "Quantity updated"}),{status:201})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message: "Somthing went wrong when updaing quantity"}),{status:401})
    }
}