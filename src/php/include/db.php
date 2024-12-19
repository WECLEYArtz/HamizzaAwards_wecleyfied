<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hamid";

try {
    // Create a PDO instance
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    // Set PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Debugging message (optional, remove in production)
    // echo "Connected successfully";
} catch (PDOException $e) {
    // Display an error message and log the details
    echo "Connection failed: " . $e->getMessage();
    error_log("Database Connection Error: " . $e->getMessage(), 0);
}
?>
