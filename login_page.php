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
		<!-- php logic -->
		<div class="container py-3">
		<?php include 'login.php'?>

	<!-- display logic -->
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

			<button type="submit" class="btn btn-secondary" name="connect">Connect</button>
		</form>
		</div>

	</body>

</html>
