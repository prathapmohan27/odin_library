
const addButton=document.querySelector("#addButton");
const formContainer=document.querySelector(".formContainer");
const closeButton=document.querySelector(".closeButton");
const submitButton=document.querySelector("#submit");
const overlay=document.querySelector(".overlay");
const form= document.querySelector("#newForm");
const radio=document.getElementsByName('status')
// console.log(overlay)



let myLibrary = [
  
];

function Book(title,author,pageNumber,status) {
    this.title=title;
    this.author=author;
    this.pageNumber=pageNumber;
    this.status=status;
}



function addBookToLibrary(event) {
    event.preventDefault();
    let title=document.getElementById('title').value;
    let author=document.getElementById('author').value;
    let pageNumber=document.getElementById('pageNumber').value;
    let status;
    if(radio[0].checked){
        status=radio[0].value;
    }
    else{
        status=radio[1].value;
    }
    let newBook=new Book(title,author,pageNumber,status);
    myLibrary.push(newBook);
    form.reset();
    close();
}


function popup(){

    formContainer.classList.add('formActive');
    // overlay.id='overlayActive';
    // console.log(overlay)
    
}

function close(){

    formContainer.classList.remove('formActive');
    // overlay.removeAttribute('id')
    // console.log(overlay)
}


addButton.addEventListener('click',popup);

closeButton.addEventListener('click',close);


submitButton.addEventListener('click',addBookToLibrary)