import csv
import os
import sqlite3

conn = sqlite3.connect('feats.db')

c = conn.cursor()

c.execute('CREATE TABLE IF NOT EXISTS feats(ID number PRIMARY KEY, NAME text, REQ text, TIER text, DESC text)') 
with open('.\\src\\dbBuilders\\Feats.csv', encoding="utf8") as csvfile:  #SM: TODO not platform independent
    reader= csv.reader(csvfile, delimiter='|')
    for row in reader:
        print(row[0]+" "+ row[1]+ " "+ row[2]+ " "+ row[3])
        c.execute('INSERT or IGNORE INTO feats (ID, NAME,REQ,TIER,DESC) VALUES(?,?,?,?,?)', (row[0],row[1],row[2],row[3],row[4]))


conn.commit()
conn.close()