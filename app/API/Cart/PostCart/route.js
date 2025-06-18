import pool from "@/lib/db";
import { numIDGen } from "@/Utils/Utils";

export async function POST(req) {
    const carts_id = numIDGen();
    try {
        const {item_id, _user } = await req.json()
        const verify = ('SELECT * FROM _carts WHERE user_id = $1 AND item_id = $2') 
        const check_vals=[_user,item_id]
        const result = await pool.query(verify,check_vals)
        if(result.rows.length > 0) {
            return new Response(JSON.stringify({message : "Item already added to the cart"}),{status: 200})
        }
        else{
            const query = ('INSERT INTO _carts (carts_id,user_id,item_id) VALUES ($1,$2,$3)')
            const values = [carts_id,_user,item_id];
            await pool.query(query,values);
            return new Response(JSON.stringify({message : "Item added to the cart"}),{status: 200})
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message: "Something went wrong while adding item to cart"}),{status: 400})
    }
}