$(document).ready(function(){
	$(".worklist-items").click(function(){
    	var filename = $(this).data('name');
    	var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("worklist-items");
		for (i = 0; i < tablinks.length; i++) {
		    tablinks[i].className = tablinks[i].className.replace(" active", "");
		}
		document.getElementById(filename).style.display = "block";
		$(this).addClass("active");
	});
	$(".tabcontent").first().css("display", "block");
});

$(window).on('load', function(){
	jQuery('.count-sub, .count-add, .count-no').mousedown(function(e){ e.preventDefault(); });
    $(".count-sub").click(function(){
    	var counter = parseInt($('.count-no').html());
    	if(counter>1){
	        counter =  counter - 1;
            $('.count-no').html(counter);
            updateConsole(counter);
        } else {
        	alert("Minimum 1 player required")
        }
    });
    $(".count-add").click(function(){
    	var counter = parseInt($('.count-no').html());
    	if(counter<4){
	        counter =  counter + 1;
            $('.count-no').html(counter);
            updateConsole(counter);
        } else {
        	alert("Maximum 4 player required")
        }
    });
});
function updateConsole(count) {
	if (count === 1) {
		$('.console-box').css('flex', '1 100%');
	} else if (count === 2) {
		$('.console-box').css('flex', '1 50%');
	} else if (count === 3) {
		$('.console-box').css('flex', '1 33.33%');
	} else {
		$('.console-box').css('flex', '1 25%');
	}
}


/*
$(document).ready(function(){
    $("#worklist li").click(function(){
    	var filename = $(this).data('file');
    	$( "#content" ).fadeOut( "slow", function() {
	    	$('#content').load(filename).fadeIn( "slow" );
	    });
	});
});
*/

document.getElementById("placeorder").addEventListener("click", function() {
		//this.style.color = "#000"
		var x = this;
		x.classList.add("active");
		x.classList.add("process");
		x.disabled = true;
		setTimeout(function(){
			x.classList.add("completed");
		},2500);
		setTimeout(function(){
			x.classList.remove("completed");
			x.classList.remove("active");
		},4000);
		setTimeout(function(){
			x.classList.remove("process");
			x.disabled = false;
		},5000);

		
	});


function modeChange() {
	setTimeout(function(){
		if(document.getElementById("modeSwitch").checked) {
			document.getElementById('modebody').style.backgroundColor = "#232935";
		} else {
			document.getElementById('modebody').style.backgroundColor = "#fff";
		}
	}, 100);	// used setTimeout for delay for #modeSwitch successfully change 
}



function setFileName(fullPath){
	var label = document.getElementById("filename");
	//label.innerHTML = fname;
	if (fullPath) {
	    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
	    var filename = fullPath.substring(startIndex);
	    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
	        filename = filename.substring(1);
	    }
	    //alert(filename);
	    label.innerHTML = filename;
	    //setFileName(filename)
	} else {
		label.innerHTML = 'Click Here';
	}
}
function getFileName() {
	var fpath = document.getElementById("file").value;
	setFileName(fpath);
}
document.getElementById("file").addEventListener("change", function() {
	var fullPath = this.value;
	setFileName(fullPath)
});
var dropzone = $('#dropzone')
dropzone.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
 });

dropzone.on('dragover dragenter', function() {
    $(this).addClass('is-dragover');
    $('.file-name').html("Drop Here");
    $('.upload').css('background', '#e8e8e8');
 });
dropzone.on('dragleave dragend drop', function() {
    $(this).removeClass('is-dragover');
    if(document.getElementById("file").value==''){
    	$('.file-name').html("Click Here");
    } else {
    	getFileName();
    }
    $('.upload').css('background', '#fff');

 });  
  
dropzone.on('drop',function(e) {
	var files = e.originalEvent.dataTransfer.files;
	$('input[type="file"]').prop('files',files);
	getFileName();
});

document.getElementById("uploadFile").addEventListener("click", function() {
	var uploadPath = document.getElementById("file").value;
	var statusBar = document.getElementById("statusBar");
	var uploadBtn = this;
	if(uploadPath!='') {
		uploadBtn.classList.add("pr-uploading");
		uploadBtn.disabled = true;
		/*
		We can use ajax here for uploading..............
		*/
		setTimeout(function(){
			percen = 0;
			var id = setInterval(frame, 30);
		    function frame() {
		    	console.log(percen);
		      	if (percen >= 100) {
		      		clearInterval(id);
		      		console.log('finish');
		      		statusBar.classList.add("finish");
		      		setTimeout(function(){
		      			uploadBtn.disabled = false;
		      			uploadBtn.classList.remove("pr-uploading");
		      			$('.file-name').html("Click Here");
		      		}, 2000);
		      		setTimeout(function(){
		      			statusBar.classList.remove("finish");
		      			statusBar.style.width = 0;
		      		}, 4500);

		        } else {
		        	percen++;
		        	statusBar.style.width = percen + "%";
		      	}
		    }
		}, 2000);

    	

	} else {
		alert("Please select file")
	}
});





// Table Resercation
jQuery('#tbleAdd, #showNumber, #tbleRem').mousedown(function(e){ e.preventDefault(); });
	var members = 1;
	document.getElementById("tbleAdd").addEventListener("click", function() {
		//this.style.color = "#000"
		var x = this;
		var table = document.getElementById("resTable");
		var showNumber = document.getElementById("showNumber");
			
		if(members==1){
			table.classList.add("member2");
		} else if(members==2) {
			table.classList.add("member3");
		} else if(members==3) {
			table.classList.add("member4");
		} else {
			alert("Limit end");
			return false;
		}
		members++;
		showNumber.innerHTML = members;
	});
	document.getElementById("tbleRem").addEventListener("click", function() {
		//this.style.color = "#000"
		var x = this;
		var table = document.getElementById("resTable")
		if(members==4){
			table.classList.remove("member4");
		} else if(members==3) {
			table.classList.remove("member3");
		} else if(members==2) {
			table.classList.remove("member2");
		} else {
			alert("Limit end");
			return false;
		}
		members = members - 1;
		showNumber.innerHTML = members;
		
	});
	