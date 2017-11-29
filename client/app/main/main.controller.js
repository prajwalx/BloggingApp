'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.AllPosts=[];

      this.sngpst=false;
      this.alpst=true;
      this.SinglePost;
      // this.awesomeThings = [];
      //
      // $scope.$on('$destroy', function() {
      //   socket.unsyncUpdates('thing');
      // });
    }

    $onInit() {
      // this.$http.get('/api/things')
      //   .then(response => {
      //     this.awesomeThings = response.data;
      //     this.socket.syncUpdates('thing', this.awesomeThings);
      //   });

      this.$http.get('http://assignment-server.herokuapp.com/posts')
          .then(response =>{
            this.AllPosts=response.data;

            this.socket.syncUpdates('http://assignment-server.herokuapp.com/posts',this.AllPosts);
            console.log(this.AllPosts);
          });
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }


    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }

    Display(x){
      console.log(x);
      this.alpst=false;
      this.sngpst=true;
      this.SinglePost=x;

    }
    closeSngpst(){
      this.alpst=true;
      this.sngpst=false;

    }
  }

  angular.module('bloggingApplicationApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs:'mainCtrl'
    });
})();
