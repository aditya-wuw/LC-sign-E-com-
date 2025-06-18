import pool from "@/lib/db"

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const user = searchParams.get('_user')
        console.log("the user id : ",user)
        const count = await pool.query(('SELECT COUNT(*) FROM _carts WHERE user_id = $1'),[user])
        return new Response(JSON.stringify({message:count.rows[0].count}),{status:201})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message:'Failed to get item count'}),{status:401})
    }

}