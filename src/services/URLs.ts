//import { Injectable } from '@angular/core';
//import { Component } from '@angular/core';

//@Injectable()
export class URLs{
    
    static home: string = 'https://ptkconnect.com/';

    static APIs = {
           tokenAuth: URLs.home + 'api/token-auth/',
           getUserId: URLs.home + 'api/v2/users/',
             getJobs: URLs.home + 'api/v2/jobs/',
         checklistId: URLs.home + 'api/v2/',     //cleaningchecklists/',
    getGuestJobMatch: URLs.home + 'api/v2/job_match/'
    };
    
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
        if (url_string.substr(url_string.length-1) === '&') {
            url_string = url_string.slice(0,-1);
        }
      return url_string    
    }

    static getId(id?:number) {
        let url_string: string = id + '/';
        return url_string
    }

    static checklistId(service:string, checklistId:number) {
        let url_string: string = service.toLowerCase() + 'checklists' + '/' + checklistId + '/';
        return url_string
    }

}








