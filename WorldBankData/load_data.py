import mysql.connector
import csv


def main():

    try:
        connection = mysql.connector.connect(
            host="127.0.0.1",
            user="root",
            passwd="mysqlpassword",
            database="worldbankdb"
            )
        cursor = connection.cursor()
        '''cursor.execute('CREATE DATABASE worldbankdb;')
        cursor.execute('USE worldbankdb;')'''

        with open('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\measurements.csv') as measurements_file:
            measurements_reader = csv.reader(measurements_file, delimiter=',', quotechar='"')
            measurements = [row for row in measurements_reader]
            columns = measurements[0]
            datatype = 'DECIMAL(30, 15)'
            create_table_measurements = 'CREATE TABLE measurements (country_id TINYINT NOT NULL,' \
                                        ' year_id TINYINT NOT NULL, '
            for x in columns[2:]:
                create_table_measurements += x[:63] + ' ' + datatype + ', '
            create_table_measurements += 'PRIMARY KEY(country_id, year_id), FOREIGN KEY (country_id) ' \
                                         'REFERENCES countries(country_id) ON DELETE CASCADE ON UPDATE CASCADE, ' \
                                         'FOREIGN KEY (year_id) REFERENCES years(year_id) ON DELETE CASCADE ' \
                                         'ON UPDATE CASCADE ) ENGINE=INNODB;'

        create_table_countries = 'CREATE TABLE countries (country_id TINYINT PRIMARY KEY,' \
                                 ' country_name VARCHAR(55)) ENGINE=INNODB;)'

        create_table_years = 'CREATE TABLE years (year_id TINYINT PRIMARY KEY, year SMALLINT,' \
                             ' lustrum TINYINT, decade TINYINT, vicennial TINYINT) ENGINE=INNODB;'

        # cursor.execute(create_table_countries)
        '''cursor.execute(create_table_years)
        cursor.execute(create_table_measurements)
        connection.commit()'''

        load_countries_table = """LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/countries.csv' 
        INTO TABLE countries
        FIELDS TERMINATED BY ','
        LINES TERMINATED BY '\n'
        IGNORE 1 ROWS
        (country_id, country_name);
        """
        load_years_table = """LOAD DATA  INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/years.csv' 
        INTO TABLE years
        FIELDS TERMINATED BY ','
        LINES TERMINATED BY '\n'
        IGNORE 1 ROWS
        (year_id, year, lustrum, decade, vicennial);
        """
        load_measurements_table = """LOAD DATA  INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/measurements.csv' 
        INTO TABLE measurements
        FIELDS TERMINATED BY ','
        LINES TERMINATED BY '\n'
        IGNORE 1 ROWS 
        ( country_id, year_id"""
        for c in columns[2:]:
            load_measurements_table += """, """ + c[:63]
        load_measurements_table += """);"""

        '''cursor.execute(load_countries_table)
        cursor.execute(load_years_table)
        cursor.execute(load_measurements_table)
        connection.commit()'''

        countries_backup = """SELECT *
        INTO OUTFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/countries_backup.csv'
        FIELDS TERMINATED BY ","
        OPTIONALLY ENCLOSED BY '"'
        ESCAPED BY '\'
        LINES TERMINATED BY '\n'
        FROM countries"""
        years_backup = """SELECT *
        INTO OUTFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/years_backup.csv'
        FIELDS TERMINATED BY ","
        OPTIONALLY ENCLOSED BY '"'
        ESCAPED BY '\'
        LINES TERMINATED BY '\n'
        FROM years"""
        measurements_backup = """SELECT *
        INTO OUTFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/measurements_backup.csv'
        FIELDS TERMINATED BY ","
        OPTIONALLY ENCLOSED BY '"'
        ESCAPED BY '\'
        LINES TERMINATED BY '\n'
        FROM measurements"""

        cursor.execute(countries_backup)
        cursor.execute(years_backup)
        cursor.execute(measurements_backup)
        connection.commit()

    except Exception as e:
        print(e)


main()
