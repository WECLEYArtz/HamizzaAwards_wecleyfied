<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Log In</title>
</head>

<body>

    <div class="container py-3">
        <?php 
    if (isset($_POST['connect'])) {
        $user_name=$_POST['user_name'];
        $password = $_POST['password'];
         echo '<pre>';
    print_r($_POST);
    echo '</pre>';
        if (!empty($user_name) && !empty($password)) {
            require_once"./src/php/include/db.php";
            $stmt=$conn->prepare('SELECT * FROM voter
            WHERE user_name = ? AND password= ?');
            $stmt->execute([$user_name,$password]);
            if ($stmt->rowCount() == 0) {
    echo '<div class="alert alert-danger" role="alert">No user found with the provided credentials</div>';
}
            if ($stmt->rowCount()>=1) {
                header('location:index.html');
            }   
    
             else{
                ?>
        <div class="alert alert-danger" role="alert">
            Incorrect login or password
        </div>
        <?php
            } 
        }
        else{
                ?>
        <div class="alert alert-secondary" role="alert">
            Login and password are required
        </div>
        <?php
            } 
        }?>
        <h3>Log in</h3>
        <form method="post">
            <div class="mb-3">
                <label class="form-label">User name</label>
                <input type="text" class="form-control" name="user_name" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" name="password" required>
            </div>
            <!-- <input type="checkbox" name="lol"> By clicking this checkbox you're agreeing to our ... <br> -->
            <button type="submit" class="btn btn-secondary" name="connect">Connect</button>
        </form>

    </div>
    </div>

</body>

</html>