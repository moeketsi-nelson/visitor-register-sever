### SENDING ERRORS TO TEMPLATES

if you want to send errors down to your template-page then you have to use the `render()` method in
your end-points

```javascript

//if there are any errors then re-render the login screen with the errors included
//the render method takes two parameters, the first being the template
//to render and the second is an object of variables you want ot send down to
//to the template page

exports.register = (req, res){
  if (err){
    res.render('login', {
      errors: err
    })
  }

//if no errors then procede to the dashbord
  res.render('dashbord')
}
```


### VIEW NAMES 

1. guest-register
2. login
3. visitor-register