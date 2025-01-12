# ordered by alphabets

import os

folder_path = r'C:\Users\Administrator\Desktop\hamizza\HAMIZZAAWARDSV2\HamizzaAwards_2.0\src\docs\episodes\ep3'
files = sorted(os.listdir(folder_path))

for index, file in enumerate(files, start=1):
    file_extension = os.path.splitext(file)[1]
    new_name = f"ep3 ({index}){file_extension}"
    os.rename(os.path.join(folder_path, file), os.path.join(folder_path, new_name))
