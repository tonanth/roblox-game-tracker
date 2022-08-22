import { Pool } from 'pg'

class SQLEngine {
    pool: Pool


    constructor() {
        this.pool = new Pool({
            database: 'roblox-game-tracker', //TODO: Migrate to a separate config file
            password: 'password'
        })
    }

    async entryIsInField(field: string, entry: string) : Promise<boolean> {
        const client = this.pool.connect;
        const res = await this.pool.query('SELECT $2 FROM ')

        return false;
    }
}

export default SQLEngine;