setTimeout (addName, picture.durationK + picture.durationT - 1000);
setTimeout (addMenu, picture.durationK + picture.durationT);
setTimeout (addArrow, picture.durationK + picture.durationT + 1000);

function addName (){
	$('.string1_1').text('Кость Ткаченко');
	$('.string2_1').text('вільна творча одиниця');
};

function addMenu (){
	$('#aProjects').text('проекти');
	$('#aAbout').text('про себе');
	$('#aWrite').text('написати');
};

function addArrow (){
	$('#aArrow').html('<img src="img/arrow.png" alt="arrow" />');
};