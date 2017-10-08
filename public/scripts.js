// Fetch Current Date
const date = new Date();
const fetchDate = date.toDateString();
document.getElementById('todays-date').innerHTML = fetchDate;


// Green 

let fillArea = document.querySelector('.fill-area');


const tookMedBtn = document.querySelector('button.tookmed-test');



tookMedBtn.addEventListener( 'click', () => {

				// Button Guts
				let parent = document.querySelector('.fill-area');
				let child = document.createElement('span');
				child.innerHTML = '<i class="fa fa-check-square"></i>';
				parent.appendChild(child);


	fillArea.style.backgroundColor = 'rgba(56,202,219,0.9)';

}, false );



// Red

const tookNoMedBtn = document.querySelector('button.nomed-test');



tookNoMedBtn.addEventListener( 'click', () => {

				// Button Guts
				let parent = document.querySelector('.fill-area');
				let child = document.createElement('span');
				child.innerHTML = '<i class="fa fa-times-square"></i>';
				parent.appendChild(child);


	fillArea.style.backgroundColor = 'rgba(240,78,78,0.9)';

}, false );



// Yellow 

const notYetBtn = document.querySelector('button.notyet-test');



notYetBtn.addEventListener( 'click', () => {

	fillArea.style.backgroundColor = '#FFF3BF';

}, false );















