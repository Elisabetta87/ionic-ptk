//import { Injectable } from '@angular/core';
import { Component } from '@angular/core';

//   private urlGuest: string = 'http://ptkconnect.co.uk/api/v2/guest/match';

//@Injectable()
export class URLs{
    
    static home: string = 'https://ptkconnect.com/';

    static APIs = {
        tokenAuth: URLs.home + 'api/token-auth/',
        getUserId: URLs.home + 'api/v2/users/',
          getJobs: URLs.home + 'api/v2/jobs/',
      checklistId: URLs.home + 'api/v2/cleaningchecklists/'
    };
    
    //?key=value&key=value
    static  getParams(params?:Object) { 
        let url_string: string = '?';
        if (params == null || undefined) {
            url_string = '';
        }
        for (let index in params) {
            if (Object.keys(params).length == 1) {
                url_string += index + '=' + params[index]
            } else {
                url_string += index + '=' + params[index] + '&';
            }

        }  

      return url_string    

    }

    static getId(id?:number) {
        let url_string: string = id + '/';
        return url_string
    }

}











// class Class{

//     static a = 10;

//     public b;

//     getBA(){ return b+a; }

// }

// Class xx = new Class();
// Class yy = new Class();

// xx.b = 10;
// yy.b = 20;

// xx.getBA();// 20
// yy.getBA();// 30

// xx.b = 3;
// yy.b = 5;

// xx.getBA();// 13
// yy.getBA();// 15

// Class.a = 5;

// xx.getBA();// 
// yy.getBA();// 