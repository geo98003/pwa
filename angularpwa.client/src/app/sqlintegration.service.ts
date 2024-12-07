import { Component } from "@angular/core";
import { ConnectionPool, connect } from 'mssql';


@Component({
  standalone: true,
  selector: 'sqlintegrationService',
  template: ''
})
export class SqlIntegrationService {
  constructor() {
  }

  private config = {
    user: 'bg',
    password: 'Pantry123',
    server: 'pantry-inventory.database.windows.net',
    port: 1433,
    database: 'PantryInventory',
    options: {
      trustServerCertificate: true,
      encrypt: true,
    }
  };

  public async WriteSubscription(sub: string) {
    let pool: ConnectionPool | null = null;

    try {
      pool = await connect(this.config);
      console.log('Connected to the database');

      let sqlQuery = "insert into subscription set sub = " + sub;
      await pool.request().query(sqlQuery);

    } catch (error) {
      console.error('Error connecting to the database:', error);
    } finally {
      if (pool != null) {
        try {
          await pool.close(); 
          console.log('Connection closed');
        } catch (closeError) {
          console.error('Error closing the database connection:', closeError);
        }
      }
    }
  }

  public async SendNotification(note: string) {
  //  let pool: sql.ConnectionPool | null = null;

  //  try {
  //    pool = await sql.connect(this.config);
  //    console.log('Connected to the database');

  //    const sqlQuery = "SELECT * FROM subscription";
  //    const result = await pool.request().query(sqlQuery);

  //    if (result.recordset.length > 0) {
  //      for (const row of result.recordset) {
  //        console.log(row);
  //      }
  //    } else {
  //      console.log('No records');
  //    }

  //  } catch (error) {
  //    console.error('Error connecting to the database:', error);
  //  } finally {
  //    if (pool != null) {
  //      try {
  //        await pool.close();
  //        console.log('Connection closed');
  //      } catch (closeError) {
  //        console.error('Error closing the database connection:', closeError);
  //      }
  //    }
  //  }
  }
}

