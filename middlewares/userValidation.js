exports.registration = function (req, res, next) {
  const data = req.body;
  if (
    !data.firstname.strip() ||
    !data.lastname.strip() ||
    !data.email.strip() || 
    !data.password.strip()
  ) {
    return res.status(400).send({
      message: "Please fill up all required fields."
    })
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if(!passwordRegex.test(password)){
    
  }
} 