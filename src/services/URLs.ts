import { Injectable } from '@angular/core';
import { Component } from '@angular/core';

//@Injectable()
export class URLs{

    static home: string = 'http://ptkconnect.co.uk/';

    static APIs = {
        tokenAuth: URLs.home + 'api/token-auth/',
        getUserId: URLs.home + 'api/v2/users/?username='    
    };

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