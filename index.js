const symbolResolve = Symbol('Promise#resolve');
const symbolReject = Symbol('Promise#reject');


class SimplePromise{
    constructor(fn){
        if(typeof fn !== 'function'){
            throw new Error('arg error');
        }

        this.state = 'pending';
        this.promiseVal = null;
        this.handlers = [];

        let resolve  = val => this[symbolResolve](val);
        let reject = error => this[symbolReject](error);

        fn(resolve,reject);
    }

    execute(type){
        setTimeout(()=>{
            this.handlers.forEach(handle => {
                if(type === 'fullfilled'){
                    handle.onFullfilled(this.promiseVal);

                }else if(type === 'rejected'){
                    handle.onRejected(this.promiseVal);

                }
            })
        },0)
    }

    [symbolResolve](val){
        this.state = 'fullfilled';
        this.promiseVal = val;

        this.execute(this.state);
    }

    [symbolReject](error){
        this.state = 'rejected';
        this.promiseVal = error;

        this.execute(this.state);
    }

    // then(promise) / then(onresolve,onreject)
    then(onFullfilled,onRejected){
        return new SimplePromise((resolve,reject) => {

            if(onFullfilled instanceof SimplePromise){
                let th = onFullfilled.then;
                th.call(this,resolve,reject);
                return;
            }

            if(this.state === 'pending'){
                this.handlers.push({
                    onFullfilled,
                    onRejected
                });
                return;
            }

            let fn = this.state === 'fullfilled'? onFullfilled : onRejected;
            let oldValue = this.promiseVal;

            try{
                let newVal = fn(oldValue);
                resolve(newVal);
            }catch(e){
                reject(oldValue);
            }   

        
        })
    }

    catch(onRejected){
        this.then(null,onRejected);
    }


}