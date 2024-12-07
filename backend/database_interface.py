
import psycopg2

class DatabaseInterface:
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
      table_schema = ', '.join([f"{col_name} {data_type}" for (col_name, data_type) in schema_json.items()])
      
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

   def get_tables(self):
      """Returns tables

      Returns:
          list: List of tables 
      """      
      try:
         sql_query = f"""
         SELECT table_name
            FROM information_schema.tables
            WHERE table_schema='public'
            AND table_type='BASE TABLE';
         """
         self.cursor.execute(sql_query)
         tables = [row[0] for row in self.cursor.fetchall()]
         return tables
      except Exception as e: 
         print("Getting tables gone wrong")
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
         print("Insertion gone wrong")








  
  