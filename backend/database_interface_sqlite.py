import sqlite3


class DatabaseInterfaceSqlite:
    def __init__(self, dbname):
        # for some reason you get thread error without it
        self.connection = sqlite3.connect("songs.db", check_same_thread=False)
        self.cursor = self.connection.cursor()

    def create_table(self, table_name, schema_json):
        """Creates a table with specified schema

        Args:
            table_name (string): Name of table
            schema_json (dict): Dict containing schema columns and their types
        """
        table_schema = ', '.join(" ".join((col_name, data_type))
                                 for (col_name, data_type) in schema_json.items())
        try:
            # Dynamically construct the CREATE TABLE SQL query
            sql_query = f"""
                CREATE TABLE IF NOT EXISTS {table_name}
                (
                    {table_schema}
                );
            """
            # Execute the query
            self.cursor.execute(sql_query)
            print(f"Table {table_name} created successfully.")
        except Exception as e:
            print(f"An error occurred: {e}")
    
    def get_all_unique(self, table_name, unique_column_name):
        try:
            # Dynamically construct the CREATE TABLE SQL query
            sql_query = f"""
                SELECT DISTINCT {unique_column_name}
                from {table_name};
            
            """
            # Execute the query
            self.cursor.execute(sql_query)
            items = self.cursor.fetchall()
            no_tuple = [row[0] for row in items]
            return no_tuple
            
        except Exception as e:
            print(f"An error occurred: {e}")
            return []



    def get_items_from_table(self, table_name, dynamic_query=None):
        """Returns items that match a given query from a table namw

        Args:
            table_name (string): Table name to get items from
            dynamic_query (dict, optional): Query with optional filters

        Returns:
            [dict]: A list of items returned from query 
        """

        try:
            self.connection.row_factory = sqlite3.Row
            self.cursor = self.connection.cursor()

            sql_query = f"SELECT * FROM {table_name}"

            dynamic_query_is_not_empty = dynamic_query != None and len(dynamic_query) != 0
            if (dynamic_query_is_not_empty):
                sql_query += " WHERE "
                table_schema = ' AND '.join(f"{json_key} = '{json_value}'" for (
                    json_key, json_value) in dynamic_query.items())
                sql_query += table_schema

            self.cursor.execute(sql_query)
            # conversion to dicitonary
            items = [dict(row) for row in self.cursor.fetchall()]
            return items

        except Exception as e:
            print(f"Error getting items from table {e}", e)
            return []

    def update_table(self, table_name, key_json = None, row_json = None):
        """Updates database at given key with updated row 

        Args:
            table_name (string): Name of table 
            key_json (dict): What databse entries will be updated
            row_json (dict): New  updated values 
        """        

        updated_parameters = ', '.join(" = ".join((key, "'" + str(value) + "'")) 
                              for (key, value) in row_json.items())
        
        update_index = ' AND '.join(" = ".join((key, "'" + str(value) + "'")) 
                              for (key, value) in key_json.items())

        try:
            sql_query = f"""
                        UPDATE {table_name}
                        SET {updated_parameters}

                        WHERE {update_index}
                            
                        """
            self.cursor.execute(sql_query)
            self.connection.commit()  # Make sure changes are saved to the database

        except Exception as e:
            print("update gone wrong {e}", e)
    
    def clear_table(self, table_name):
        try:
            sql_query = f"""
                        DELETE FROM {table_name}
                        """
            self.cursor.execute(sql_query)
            self.connection.commit()  # Make sure changes are saved to the database

        except Exception as e:
            print("Insertion gone wrong {e}", e)

        

    def insert_into_table(self, table_name, row_json):
        """Inserts into table a json item

        Args:
            table_name (string): Name of table
            row_json (dict): A dict containing keys and values of insertion
        """

        # handles multiple artists list
        for key, value in row_json.items():
            if isinstance(value, list):
                row_json[key] = ', '.join(value)
        

        json_keys = list(row_json.keys())
        json_values = list(row_json.values())


        # Generate placeholders %s, %s, %s, %s
        value_placeholders = ', '.join(['?'] * len(json_keys))
        # Join column names into a single string for sql query
        column_names = ', '.join(json_keys)

        try:
            sql_query = f"""
                        INSERT INTO {table_name}
                           ({column_names})
                           VALUES
                           ({value_placeholders})
                        """
            self.cursor.execute(sql_query, json_values)
            self.connection.commit()  # Make sure changes are saved to the database

        except Exception as e:
            print("Insertion gone wrong {e}", e)

#dog = DatabaseInterfaceSqlite("songs")
#print(dog.get_all_unique("songs", "spotify_playlist"))





