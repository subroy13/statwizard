import subprocess
import os
from pathlib import Path
import pandas as pd
import numpy as np

def run_check_storage_command(dirpath):
    print(f"Checking file details at {dirpath}")
    command = "sudo du -s --exclude=\".*\" .??* * | sort -hr | head -10"
    out = subprocess.run(command, cwd=dirpath, shell=True, capture_output=True)
    if out.stderr.decode('utf-8') != '':
        raise Exception(out.stderr)
    else:
        stdout = out.stdout.decode('utf-8')
        rows = stdout.split("\n")
        data = {
            'Storage': [],
            'Item': []
        }
        for row in rows:
            cols = row.split('\t')
            if len(cols) == 2:
                data['Storage'].append(int(cols[0]))
                data['Item'].append(cols[1])        
        df = pd.DataFrame(data)
        return df 


def sizeof_fmt(num, suffix="B"):
    for unit in ("", "Ki", "Mi", "Gi", "Ti", "Pi", "Ei", "Zi"):
        if abs(num) < 1024.0:
            return f"{num:3.1f}{unit}{suffix}"
        num /= 1024.0
    return f"{num:.1f}Yi{suffix}"

# now do this recursively
def fetch_recursive_storage(rootpath, tolerance = 0.1, depth = 1):
    # this function gets called if rootpath is a directory
    curdf = run_check_storage_command(rootpath)
    curdf['Depth'] = depth
    curdf['ItemPath'] = curdf['Item'].map(lambda x: os.path.join(rootpath, x))
    curdf['isDirectory'] = curdf['ItemPath'].map(lambda x: os.path.isdir(x) )

    if curdf.shape[0] > 0:
        # check the elbow
        curdf['Diff Storage'] = curdf['Storage'].diff().abs().fillna(0)
        threshold = curdf['Diff Storage'].median()
        index = np.where(curdf['Diff Storage'] > (threshold * (1 + tolerance)))[0]
        if index.shape[0] > 0:
            # there is a positive index, only check those entries in nested way
            curdf = curdf.iloc[:(index[0] + 1)]
        
        dflist = []
        filecount = []
        nested_filecount = []
        for index, row in curdf.iterrows():
            if row['isDirectory']:
                subdf = fetch_recursive_storage(row['ItemPath'], tolerance, depth + 1)
                dflist.append(subdf)
                filecount.append((subdf['isDirectory'] == False).sum())
                nested_filecount.append((subdf['Nested File Count']).sum())
            else:
                filecount.append(0)
                nested_filecount.append(1)

        # all the child folders are properly checked
        curdf['File Count'] = np.array(filecount)
        curdf['Nested File Count'] = np.array(nested_filecount)        
    return pd.concat([curdf] + dflist)



df = fetch_recursive_storage(Path.home())

print(f"Compiling results...\n" + "=" * 25 + '\n REPORT \n' + "=" * 25 + "\n")
df = df.drop_duplicates()
df['Storage (Human)'] = df['Storage'].map(lambda x: sizeof_fmt(x * 1024))

flagged = (df['isDirectory'] == False) | (df['Nested File Count'] > 100)
df = df.loc[flagged]   # only look for the files

df = df.sort_values(['Storage', 'Depth'], ascending=[False, False])
df = df[['ItemPath', 'Item', 'isDirectory', 'Storage (Human)', 'File Count', 'Nested File Count', 'Depth']]
df = df.reset_index(drop = True)

print(df.head(25))
