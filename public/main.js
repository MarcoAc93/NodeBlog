angular.module("ModuloPrincipal", []);

function mainController($scope, $http){
	$scope.formInfo = {};
	
	$http.get("/api/blog")
	.success(function(data){
		$scope.posts = data;
		// console.log(data);
	})
	.error(function(data){
		console.log("Error: " + data);
	});
	

	$scope.readPost = function(post){
		$scope.post = post;
		$http.get("/api/blog/show/" + post.idPost)
		.success(function(data){
			$scope.singlePost = data;
			// console.log(data);
		})
		.error(function(data){
			console.error(data);
		});
	}

	$scope.createPost = function(){
		if($scope.formInfo.titulo == null || $scope.formInfo.descripcion == null || $scope.formInfo.contenido == null){
			console.log("Algo esta vacio");
		}else {
			$http.post("/api/blog", $scope.formInfo)
			.success(function(data){
				$scope.formInfo = {};
				$scope.posts = data;
				console.log(data);
			})
			.error(function(data){
				console.log("Error: " + data);
			});
		}
	}

	$scope.updatePost = function(post){
		$http.put("/api/blog/edit/"+post.idPost, $scope.post)
		.success(function(data){
			$scope.formInfo = {};
			$scope.posts = data;
			// console.log(data);
		})
		.error(function(data){
			console.log("Error: " + data);
		});
	}

	$scope.deletePost = function(post){
		$http.delete("/api/blog/delete/"+post.idPost)
		.success(function(data){
			$scope.formInfo = {};
			$scope.posts = data;
			console.log(data);
		})
		.error(function(data){
			console.error("Error: " + data);
		});
	}
}

function singupController($scope, $http, $location){
	$scope.formRegistro = {};
	$scope.errorMensage = '';

	$scope.submitForm = function(){
		$http.post("/signup", $scope.formRegistro)
		.success(function(data){
			$scope.formRegistro = {};
			console.log(data);
			$location.path('/');
		})
		.error(function(error){
			$scope.errorMensage = error;
		});
	}
}

function singinController($scope, $http){
	$scope.formSesion = {};

	$scope.sigin = function(){
		$http.get("/signin", $scope.formSesion)
		.success(function(data){
			$scope.formSesion = {};
			console.log(data);
		})
		.error(function(error){
			console.error(error);
		});
	}
}













