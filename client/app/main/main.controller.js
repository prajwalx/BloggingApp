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
      this.comments=[];
      this.TextComment="";
      this.cmtCls;
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

      //initialise comment class
      this.cmtCls="media-body input-group form-group has-feedback";

      //Get Posts
      this.$http.get('http://assignment-server.herokuapp.com/posts')
          .then(response =>{
            this.AllPosts=response.data;

            //this.socket.syncUpdates('http://assignment-server.herokuapp.com/posts',this.AllPosts);
            console.log(this.AllPosts);
          });
      //Get Comments
      this.$http.get('http://assignment-server.herokuapp.com/comments')
              .then(response =>{
                this.comments=response.data;

                //this.socket.syncUpdates('http://assignment-server.herokuapp.com/comments',this.comments);
                console.log((this.comments));
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

    topup(){
      document.body.scrollTop=0;
      document.documentElement.scrollTop=0;
    }
    Display(x){
      console.log(x);
      this.alpst=false;
      this.sngpst=true;
      this.SinglePost=x;
      this.topup();
    }
    closeSngpst(){
      this.alpst=true;
      this.sngpst=false;

    }
    AddComment(){
      this.cmtCls="media-body input-group form-group has-feedback";
      console.log(this.TextComment);
      console.log(this.SinglePost.id);
      //If string is not Empty
      if(this.TextComment!==""){

          this.$http.post('http://assignment-server.herokuapp.com/comments',{
            body:this.TextComment,
            postId:this.SinglePost.id
          }).then(response=>{
            this.TextComment="";
            console.log('Comments Added Hopefully Let"s See');
            console.log(response.data);
            this.cmtCls="media-body input-group form-group has-feedback has-success";
            this.comments.push(response.data);
          });
    }
    else{
      this.cmtCls="media-body input-group form-group has-feedback has-error";
      console.log('Empty String');
    }
      //this.cmtCls="media-body input-group form-group has-feedback";
    }

  }

  angular.module('bloggingApplicationApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs:'mainCtrl'
    });
})();
