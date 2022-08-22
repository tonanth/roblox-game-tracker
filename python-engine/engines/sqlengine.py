import psycopg2
from psycopg2 import sql
import getpass
from typing import List


class SQLEngine:
    """Accesses and modifies a Postgres database using psycopg2 module.

    This class opens and stores a connection to a Postgres database on the local machine. The connection is opened in
    the constructor and will remain active and stored in object memory. After an SQLEngine has been created,
    the database can be read using get_table and updated using update_table The connection is provided by the module
    psycopg2. The connection will be maintained until closed by calling the close function.
    """

    def __init__(self,
                 table_name,
                 database_name: str,
                 database_user: str = None,
                 database_password: str = None):
        """Initializes connection to Postgres and saves connection object.
            Args:
                database_name: The name of the database to use.
                database_user: The name of the user to log into the database as. If None is supplied, it will default to
                    the user calling the program.
                    Default: None
                database_password: The password for the database.
                    Default: None
        """
        database_user = getpass.getuser() if database_user is None else database_user
        conn_query = f'dbname={database_name} user={database_user}'
        conn_query = conn_query if database_password is None else conn_query + f' password={database_password}'
        self.conn = psycopg2.connect(conn_query)
        self.cur = self.conn.cursor()
        self.table_name = table_name

    def read_col(self, col_name: str):
        """Accepts a column name and will return all data from column in a one dimensional list.

        This is equivalent to the SQL command "SELECT col_name FROM table;".

        Args:
            col_name: The name of the column to get data from
        Returns:
            A one dimensional list containing all data from a given col_name.
        """
        query = sql.SQL("select {field} from {table}").format(field=sql.Identifier(col_name),
                                                              table=sql.Identifier(self.table_name))
        self.cur.execute(query)
        rows = self.cur.fetchall()
        rows_squashed = [row[0] for row in rows]
        return rows_squashed

    def update_row(self,
                   col_names: List[str], row, primary_col, primary_value):
        """Updates database using primary_col to target desired row.

        Equivalent to the SQL command "UPDATE table SET col_name[i] = row[i] WHERE primary_col = primary_value" for
        i in len(row).

        Args:
            col_names: A list of column names to update in the database table.
            row: A list of values to update corresponding to each column name in col_names.
            primary_col: The primary column name
            primary_value: The primary value to target the row

        Returns:
            None
        """
        if len(col_names) != len(row):
            raise ValueError("col_names and row must have the same length")
        for col_name, value in zip(col_names, row):
            query = sql.SQL('update {table} set {field} = %s where {target} = %s').format(
                table=sql.Identifier(self.table_name),
                field=sql.Identifier(col_name),
                target=sql.Identifier(primary_col))
            self.cur.execute(query, (value, primary_value))
        self.conn.commit()
        return

    def rollback(self):
        """Rollback transactions when a bad SQL call has been placed

        When a bad SQL query has been issued, no further SQL commands will be accepted until rollback() is called.

        Returns:
            None
        """
        self.conn.rollback()
        return

    def close(self):
        """Closes the connection to the database"""
        self.cur.close()
        self.conn.close()
        return
