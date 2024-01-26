//Middleware function to check if the user is authenticated
const withAuth = (req, res, next) => {
   //Check if the user is not logged in 
    if (!req.session.logged_in) {
      //Redirect to the login page if not logged in
      res.redirect('/login');
    } else {
      //Continure to the next middleware or route if logged in
      next();
    }
  };
  
  //Export the wuthAuth middleware for use in other files
  module.exports = withAuth;