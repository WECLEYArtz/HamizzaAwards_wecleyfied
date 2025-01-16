import subprocess
import json

def fetch_files_from_gdrive():
    # Define the rclone command to list the files in the directory
    command = ['rclone', 'lsjson', 'gdrive:Hamizza Archive/episodes', '--recursive', '--files-only']

    try:
        # Execute the rclone command and capture the output
        result = subprocess.run(command, capture_output=True, text=True, check=True)

        # Parse the JSON output from rclone
        files = json.loads(result.stdout)
        
        if files:
            print("Files and their URLs:")
            for file in files:
                # Construct the URL for each file based on the file ID
                file_url = f"https://drive.google.com/file/d/{file['ID']}/view"
                
                # Print the file name, path, and the constructed URL
                print(f"{file['Path']} url = {file_url}")
        else:
            print("No files found in the specified directory.")
    
    except subprocess.CalledProcessError as e:
        # Handle any errors that occur during the rclone command execution
        print(f"Error executing rclone command: {e.stderr}")
    except json.JSONDecodeError as e:
        # Handle errors related to JSON parsing
        print(f"Error decoding JSON output: {e}")

if __name__ == "__main__":
    fetch_files_from_gdrive()
