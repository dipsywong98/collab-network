import sqlite3
from sqlite3 import Error


def create_connection(db_file):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print(sqlite3.version)
        return conn
    except Error as e:
        print(e)


def create_table(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)


def create_author_table(conn):
    sql_create_authors_table = """
        CREATE TABLE IF NOT EXISTS authors (
            id text PRIMARY KEY,
            n text NOT NULL,
            a text NOT NULL,
            t text
        );
        """
    create_table(conn, sql_create_authors_table)


def create_author(conn, author):
    sql = """
    INSERT INTO authors (idx,n,a,pc,cn,hi,pi,upi,t) VALUES (?,?,?,?,?,?,?,?,?)
    """
    cur = conn.cursor()
    cur.execute(sql, author)
    return cur.lastrowid
