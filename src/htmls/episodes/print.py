import os
import re

folder_path = r'C:\Users\Administrator\Desktop\hamizza\HAMIZZAAWARDSV2\HamizzaAwards_2.0\src\docs\episodes\ep7'
files = os.listdir(folder_path)

def extract_number(file_name):
    match = re.search(r'\((\d+)\)', file_name)
    if match:
        return int(match.group(1))
    return float('inf')  

files = sorted(files, key=extract_number)
result = "\n"

for index, file in enumerate(files, start=1):
    file_path = os.path.join(folder_path, file)
    if os.path.isfile(file_path):
        file_name, file_extension = os.path.splitext(file)
        if file_extension == '.mp4':
            result += f'<video src="../../docs/episodes/ep7/{file}" class="manga-page" controls></video>\n'
        elif file_extension == '.jpg':
            result += f'<img src="../../docs/episodes/ep7/{file}" alt="Page {index}" class="manga-page">\n'

print(result)
