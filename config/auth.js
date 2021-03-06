module.exports = {
    protect: function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg','Please Login in to view this resource')
        res.redirect('/user/login')
    }
}