const formControls = document.querySelectorAll(".form__control");
const contactForm = document.getElementById("contactForm");

const submitForm = (e) => {
    e.preventDefault();
    let hasError = "";
    for( let i = 0; i < formControls.length; i++) {
        hasError += validate(formControls[i]);
    }
    if(hasError){
        console.log(hasError);
        return;
    }
    sendEmail(e);
}

const sendEmail = async (e) => { 
    var data = new FormData(e.target);
    fetch(e.target.action, {
      method: contactForm.method,
      body: data,
      headers: {
          'Accept': 'application/json',
      }
    }).then(response => {
       // console.log(response)
      if (response.ok) {
        showToaster();
        contactForm.reset();
      }
    }).catch(error => {
      console.log( error, "Oops! There was a problem submitting your form");
    });

}


const validate = (formControl) => {
    let formControlValue = formControl.value.trim();
    let errorMessage = "";
    if(!formControlValue) {
        formControl.classList.add("form__error");
        formControl.nextElementSibling.innerHTML = "This field is required"; 
        errorMessage += formControl.nextElementSibling.innerHTML         
    }
    
  if(formControl.id === "email" && formControlValue){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formControlValue)){
            formControl.classList.remove("form__error");
            formControl.nextElementSibling.innerHTML = "";
            errorMessage += formControl.nextElementSibling.innerHTML
        } else {
            formControl.classList.add("form__error");
            formControl.nextElementSibling.innerHTML = "Please use a valid email address";
            errorMessage += formControl.nextElementSibling.innerHTML
        }     
  }
    
    return errorMessage;
}

const showToaster = () => {
    const toaster = document.getElementById("toaster");
    toaster.style.opacity = "1";
    setTimeout(()=> {toaster.style.opacity = "0";}, 2000)
}

