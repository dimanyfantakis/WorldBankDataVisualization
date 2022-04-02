import pandas as pd
import numpy as np
import glob
import re


def main():
    all_files = [file for file in glob.glob("*.csv")]
    indicator_codes_categories = ['BX', 'BN', 'BM']
    df = pd.read_csv(all_files[0], skiprows=3, header=None)
    df.columns = df.iloc[0]
    df = df.iloc[1:]
    df = df.iloc[:, :-1]

    indicator_names_categories = []
    for c in indicator_codes_categories:
        indicator_names_categories.append(df.loc[df['Indicator Code'].str.startswith(c, na=False)]['Indicator Name'].tolist())
    indicator_names = [item for sublist in indicator_names_categories for item in sublist]

    countries = []
    years = []
    for i in range(len(all_files)):
        df = pd.read_csv(all_files[i], skiprows=3, header=None)
        df.columns = df.iloc[0]
        df = df.iloc[1:]
        df = df.iloc[:, :-1]
        countries.append(df['Country Name'].iloc[0])
        for x in df.columns.values:
            if isinstance(x, (np.floating, float)):
                years.append(int(x))

    countries = sorted(set(countries))
    years = sorted(set(years))
    countries_id = np.arange(len(countries))
    years_id = np.arange(len(years))
    lustrum = [x // 5 + 1 for x in years_id]
    decade = [x // 10 + 1 for x in years_id]
    vicennial = [x // 20 + 1 for x in years_id]

    countries = np.array(countries)
    df_countries = pd.DataFrame({'country_id': countries_id, 'country': countries})

    years = np.array(years)
    lustrum = np.array(lustrum)
    decade = np.array(decade)
    vicennial = np.array(vicennial)
    df_years = pd.DataFrame({'year_id': years_id, 'year': years, 'lustrum': lustrum, 'decade': decade,
                             'vicennial': vicennial})

    measurements = []
    for name in indicator_names:
        list_t = []
        for i in range(len(all_files)):
            df = pd.read_csv(all_files[i], skiprows=3, header=None)
            df.columns = df.iloc[0]
            df = df.iloc[1:]
            df = df.iloc[:, :-1]
            temp = df.loc[df['Indicator Name'] == name]
            temp = temp.drop(temp.columns[[0, 1, 2, 3]], axis=1)
            list_t.append(temp)
        new_df = pd.concat(list_t)
        new_df = pd.DataFrame(new_df.values.reshape(-1), columns=['_'.join(re.sub(r"[^\w\s]", '', name).lower().split())])
        measurements.append(new_df)
    df_measurements = pd.concat(measurements, axis=1)

    y = []
    for i in range(len(countries)):
        y.extend([i] * len(years))
    z = []
    for i in range(len(countries)):
        z.extend(years_id)
    countries_id_final = np.array(y)
    years_id_final = np.array(z)
    df_measurements.insert(loc=0, column='year_id', value=years_id_final)
    df_measurements.insert(loc=0, column='country_id', value=countries_id_final)
    df_measurements = df_measurements.fillna(0)

    df_measurements.to_csv('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\measurements.csv', index=False)
    df_countries.to_csv('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\countries.csv', index=False)
    df_years.to_csv('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\years.csv', index=False)


main()
