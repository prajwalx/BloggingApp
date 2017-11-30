'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket,$window) {
      this.$http = $http;
      this.$window = $window;
      this.socket = socket;
      this.AllPosts=[];

      this.sngpst=false;
      this.alpst=true;
      this.SinglePost;
      this.comments=[];
      this.TextComment="";
      this.cmtCls;
      this.blgcls;
      this.date="";
      this.B_title="";
      this.B_name="";
      this.B_blog="";
      this.searchQ;

      this.pageSize=2;
      this.allpostcopy=[];
      this.curpage=0;
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
      //initialise blog modal input class
      this.blgcls="modal-body form-group has-feedback";

      //initialise Date
      this.date=new Date().toDateString();
      //Get Posts
      this.$http.get('http://assignment-server.herokuapp.com/posts')
          .then(response =>{
            this.AllPosts=response.data;
            this.allpostcopy=this.AllPosts.concat();//deep copying data from one array to another

            //this.socket.syncUpdates('http://assignment-server.herokuapp.com/posts',this.AllPosts);
            // console.log(this.AllPosts);
            this.paginate('s');
          });
      //Get Comments
      this.$http.get('http://assignment-server.herokuapp.com/comments')
              .then(response =>{
                this.comments=response.data;

                //this.socket.syncUpdates('http://assignment-server.herokuapp.com/comments',this.comments);
                // console.log((this.comments));
              });



    }

    paginate(dir){
      this.AllPosts.splice(0,this.AllPosts.length);
      var i=0;
      var j=0;
      if(dir==='r')
      this.curpage++;
      if(dir==='l')
      this.curpage--;
      if(dir!=='s')
      j=(this.curpage)*(this.pageSize);
      console.log(j);
      while(i<(this.pageSize)&&j<(this.allpostcopy.length)){
        this.AllPosts[i++]=this.allpostcopy[j++];
      }
      console.log('paginate');
      console.log(this.allpostcopy);
      console.log('AllPost below:');
      console.log(this.AllPosts);

    }
    numOfPages(){
      return Math.ceil(this.allpostcopy.length/this.pageSize);
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
    AddBlog(){
      this.blgcls="modal-body form-group has-feedback";
      console.log(this.B_title);
      console.log(this.B_name);
      console.log(this.B_blog);

      //if non-empty fields
      if(!(this.B_title===""||this.B_name==="")){
        this.blgcls="modal-body form-group has-feedback has-success";

        this.$http.post('http://assignment-server.herokuapp.com/posts',{
          title:this.B_title,
          author:this.B_name,
          date:this.date
        }).then(response=>{
          this.B_title="";
          this.B_name="";
          this.B_blog="";
          console.log(response.data);
          //this.AllPosts.push(response.data);
          this.allpostcopy.push(response.data);
          this.$window.alert("Blog Posted Successfully ");


        });
      }
      else {
        this.blgcls="modal-body form-group has-feedback has-error";
        this.$window.alert("Error! Unable to post Empty Data! ");
      }

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
