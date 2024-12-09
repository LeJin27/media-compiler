
from dotenv import load_dotenv
import pprint
import os
import psycopg2

class DatabaseInterfacePg:
   def __init__(self, host, dbname, user, password, port):
      self.dbname = dbname
      self.user = user
      self.password = password
      self.host = host
      self.port = port
   
      try:
         self.connection = psycopg2.connect(host=self.host, dbname = self.dbname, user=self.user, password=self.password, port = self.port)
         self.cursor = self.connection.cursor()
         print(f"Database '{self.dbname}' found and connected.")
      except Exception as e:
         if "does not exist" in str(e):
             self._create_database()
             self.connection.close()
             self.connection = psycopg2.connect(host=self.host, dbname = self.dbname, user=self.user, password=self.password, port = self.port)
             self.cursor = self.connection.cursor()
         else: 
            print("Something really went wrong")


   def _create_database(self):
     """Initialize database. Used in initializer if a database cannot be found
     """
     # Connect default postgres database to create the new database
     self.connection = psycopg2.connect(dbname="postgres", user=self.user, password=self.password, host=self.host)
     self.connection.autocommit = True  
     self.cursor = self.connection.cursor()

     try:
         self.cursor.execute('CREATE DATABASE ' + self.dbname)
         print(f"Database '{self.dbname}' created successfully.")

     except Exception as e:
         print(f"Error creating database: {e}")
      

   def create_table(self, table_name, schema_json):
      """Creates a table with specified schema

      Args:
          table_name (string): Name of table
          schema_json (dict): Dict containing schema columns and their types
      """      

      self.connection.autocommit = True 
      table_schema = ', '.join(" ".join((col_name, data_type)) for (col_name, data_type) in schema_json.items())

      
      try:
         # Dynamically construct the CREATE TABLE SQL query
         sql_query = f"""
             CREATE TABLE IF NOT EXISTS {table_name} (
                 {table_schema}
             );
         """
         # Execute the query
         self.cursor.execute(sql_query)
         print(f"Table {table_name} created successfully.")
      except Exception as e:
        print(f"An error occurred: {e}")
   
   def get_items_from_table(self, table_name, dynamic_query = None):
      """Returns items that match a given query from a table namw

      Args:
          table_name (string): Table name to get items from
          dynamic_query (dict, optional): Query with optional filters

      Returns:
          [dict]: A list of items returned from query 
      """      

      try: 

         sql_query = f"SELECT * FROM {table_name}"

         if (dynamic_query != None):
            sql_query += " WHERE "
            table_schema = ' AND '.join(f"{json_key} = '{json_value}'" for (json_key, json_value) in dynamic_query.items())
            sql_query += table_schema

         self.cursor.execute(sql_query)
         items = self.cursor.fetchall()
         return items

      except Exception as e:
         print("Error getting items from table")
         return []
   
   def insert_into_table(self, table_name, row_json):
      """Inserts into table a json item

      Args:
          table_name (string): Name of table
          row_json (dict): A dict containing keys and values of insertion
      """

      json_keys = list(row_json.keys())
      json_values = list(row_json.values())

      value_placeholders = ', '.join(['%s'] * len(json_keys))  # Generate placeholders %s, %s, %s, %s
      column_names = ', '.join(json_keys)  # Join column names into a single string for sql query

      try:
         sql_query = f"""
                     INSERT INTO {table_name} 
                        ({column_names}) 
                        VALUES 
                        ({value_placeholders})
                     """
         self.cursor.execute(sql_query, json_values)
                           
      except Exception as e:
         print("Insertion gone wrong {e}", e)








#pg_db = DatabaseInterface(host="localhost", dbname="songs", user="postgres", password="dog", port=os.environ.get("PG_PORT"))
  
  