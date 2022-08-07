require("dotenv").config()
import { AppDataSource } from "./db"
import app from "./app"

async function main() {
    try {
        await AppDataSource.initialize()
        app.listen(8000, () => { 
            console.log('listening to port 8000')
        })
    } catch ( error ) {
        console.error(error)
    }
    
}

main();