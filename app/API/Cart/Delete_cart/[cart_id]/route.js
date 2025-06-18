import pool from "@/lib/db";

export async function DELETE(req,{ params }) {
    const { cart_id } = params; 
    try{
        const query = ('DELETE FROM _carts WHERE carts_id = $1')
        const values =[cart_id]
        await pool.query(query,values) 
        return new Response(JSON.stringify({message: "Item deleted from cart"}),{status:201})
    }
    catch(error){
        console.log(error)
        return new Response(JSON.stringify({message : "Somthing went wrong while deleting item"}),{status:401})
    }
}