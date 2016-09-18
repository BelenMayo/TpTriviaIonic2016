angular.module('app.controllers',  ['ngCordova'])
  
.controller('informaciNDeAutorCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('juegoCtrl', function($scope, $timeout, $cordovaVibration, $state, $interval){

	$scope.muestra = false;



	$scope.preguntas = {};
	$scope.preguntas.preg = [];
	$scope.preguntas.resp = [];
	$scope.preguntas.correcta = [];
	$scope.estado="";

	var indice = 0;
	var conteo = 0;

	$scope.MisPreguntas = [];

	var datosFireBase = new Firebase('https://trivia-fae21.firebaseio.com/preguntas');

	console.log(datosFireBase); 	
	datosFireBase.on('child_added', function (snapshot) {
    $timeout(function(){
      var message = snapshot.val();
      $scope.MisPreguntas.push(message);
      console.log($scope.MisPreguntas[0].respTrue);

      $scope.preguntas.preg = $scope.MisPreguntas[indice]['preg'];
      $scope.preguntas.resp = $scope.MisPreguntas[indice]['resp'];
      $scope.preguntas.correcta = $scope.MisPreguntas[indice].respTrue;
      console.log("indice: " + indice);

    });
  });
	console.log($scope.MisPreguntas['respTrue']);


	$scope.Enviar=function(respuesta){
   console.log(respuesta);
		try{
			$scope.muestra = true;
			
			//console.log("Estoy aca" + $scope.indice)
			if(respuesta == $scope.preguntas.correcta)
			{

				conteo++;

				console.log("Correcto!!");
				$scope.estado ="Correcto!!";

				try{
					// Vibrate 100ms
   					$cordovaVibration.vibrate(100);	
				}
				catch(err)
				{
					alert("Vibro");
				}
				
				$scope.blood_1=100;
				
				var stop;
        		//$scope.fight = function() {
			          // Don't start a new fight if we are already fighting
			          if ( angular.isDefined(stop) ) return;

			          stop = $interval(function() {
			            if ($scope.blood_1 > 0) {
			              $scope.blood_1 = $scope.blood_1 - 3;
			              
			            } else {
			              $scope.stopFight();
			            }
			          }, 100);
			        //};

			        $scope.stopFight = function() {
			          if (angular.isDefined(stop)) {
			            $interval.cancel(stop);
			            stop = undefined;
			            $scope.preguntas.preg = $scope.MisPreguntas[indice]['preg'];
      					$scope.preguntas.resp = $scope.MisPreguntas[indice]['resp'];
      					$scope.preguntas.correcta = $scope.MisPreguntas[indice].respTrue;
      					$scope.estado ="";
      					console.log("Estoy aca");
				        if(indice == 3)
				        {
				        	//location.reload();

				        	$state.go('tabsController.estadSticas', {'conteo':conteo});



				        }
				          }
			        };
			        

					if(indice <= 2)
					{
						console.log(indice);
						indice++;
			
					}
			        	
			
			}
			else
			{
				
				console.log("Incorrecto!!");
				$scope.estado ="Incorrecto!! La respuesta era: "+$scope.preguntas.correcta;
				try{
					
				
					$scope.blood_1=100;
					
					var stop;
	        		//$scope.fight = function() {
			          // Don't start a new fight if we are already fighting
			          if ( angular.isDefined(stop) ) return;

			          stop = $interval(function() {
			            if ($scope.blood_1 > 0) {
			              $scope.blood_1 = $scope.blood_1 - 3;
			              
			            } else {
			              $scope.stopFight();
			            }
			          }, 100);
			        //};

			        $scope.stopFight = function() {
			          if (angular.isDefined(stop)) {
			            $interval.cancel(stop);
			            stop = undefined;
			            $scope.preguntas.preg = $scope.MisPreguntas[indice]['preg'];
      					$scope.preguntas.resp = $scope.MisPreguntas[indice]['resp'];
      					$scope.preguntas.correcta = $scope.MisPreguntas[indice].respTrue;
      					$scope.estado ="";
      					console.log("Estoy aca");
				        if(indice == 3)
				        {
				        	//location.reload();
				        	$state.go('tabsController.estadistica', {'conteo':conteo});
				        }
				          }
			        };

			        if(indice <= 2)
					{
						console.log(indice);
						indice++;		
					}
			       
					// Vibrate 100ms
   					$cordovaVibration.vibrate([100, 100, 100]);	
				}
				catch(err)
				{
					alert("Vibro");
				}
			}
		}
		catch(err)
		{
			console.log(err);
		}
    
		
  }



})

   
.controller('estadSticasCtrl', function($scope, $stateParams){

	$scope.estado="";
	//console.log($stateParams.conteo);
	var conteo = $stateParams.conteo;
	console.log("conteo: " + conteo);
	if(conteo == 1)
	{
		$scope.estado = "Acertaste 1 de 3!!";
	}
	if(conteo == 2)
	{
		$scope.estado = "Acertaste 2 de 3!!";
	}
	if(conteo == 3)
	{
		$scope.estado = "Acertaste 3 de 3!!";
	}
	if(conteo == 0)
	{
		$scope.estado = "No acertaste ninguna!!";
	}

})
      
.controller('loginCtrl', function($scope, $state){
	$scope.enviar = function()
	{
		$state.go("tabsController.juego");
	}
})
 