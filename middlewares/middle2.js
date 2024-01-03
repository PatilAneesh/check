function myMiddleware2(req,res, next){
    console.log('I am second middleware')
next() //to pass controls from one middle ware to another and execute further request methods 
}

module.exports = myMiddleware2
