<?php 
	if (isset($_POST['connect'])) 
	{
		$user_name=	$_POST['user_name'];
		$password=	$_POST['password'];
		echo '<pre>'; print_r($_POST); echo '</pre>';
		
		if (!empty($user_name) && !empty($password))
		{
			require_once"./src/php/include/db.php";
			$stmt=$conn->prepare('SELECT * FROM voter WHERE user_name = ? AND password= ?');
			$stmt->execute([$user_name,$password]);
			if ($stmt->rowCount() == 0) {
				echo '	<div class="alert alert-danger" role="alert">
							No user found with the provided credentials
						</div>';
			}
			if ($stmt->rowCount()>=1) {
				header('location:index.html');
			}   
			else{
				echo '	<div class="alert alert-danger" role="alert">
							Incorrect login or password
						</div>';
			}
		}
		else{
			echo '	<div class="alert alert-secondary" role="alert">
						Login and password are required
					</div>';
			}
	}
?>
