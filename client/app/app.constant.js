(function(angular, undefined) {
  angular.module("bloggingApplicationApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	]
})

;
})(angular);