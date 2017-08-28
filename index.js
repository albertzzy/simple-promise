const symbolResolve = Symbol('Promise#resolve');
const symbolReject = Symbol('Promise#reject');


class SimplePromise{
    constructor(fn){
        this.state = 'pending';

        this.promiseVal = null;

        this.handlers = [];
    }

    [symbolResolve](result){
        this.state = 'fullfilled';

        this.promiseVal = result;

    }

    [symbolReject](error){
        this.state = 'rejected';

        this.promiseVal = error;
    }


    thenCatch(){


    }   

    then(resolve,reject){


    }

    catch(reject){


    }


}


new Promise((resolve,reject)=>{
    foo();
}).then(()=>{
    
})