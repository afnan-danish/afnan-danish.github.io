///////// Canvas Initialisation /////////
var canvasDiv = document.getElementById('particle-canvas');
var options = {
	particleColor: '#888',
  	/*background: 'https://raw.githubusercontent.com/JulianLaval/canvas-particle-network/master/img/demo-bg.jpg',*/
  	background: 'images/banner.jpg',
  	interactive: true,
  	speed: 'medium',
  	density: 'high'
};
var particleCanvas = new ParticleNetwork(canvasDiv, options);

///////// mobile menu toggle /////////
$(document).on('click', '.navbar-toggler', function (event) {
    $(this).toggleClass("menu-clicked");
});
$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
    $(".navbar-toggler").toggleClass("menu-clicked");
});

///////// smooth scroll /////////
$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});


///////// project filter /////////
$(document).ready(function(){
    $(".filter-button").click(function(){
        $('.filter-button').removeClass("btn-dflt");
        var value = $(this).attr('data-filter');
        if(value == "all")
        {
            $('.filter').show('1000');
        }
        else
        {
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }
        if ($(".filter-button").removeClass("active")) {
            $(this).removeClass("active");
        }
        $(this).addClass("active");
    });
});



///////// Skill Bars /////////
var b = 0;
$(window).scroll(function() {
    if($('#skills').length){
        var oTop = $('#skills').offset().top - window.innerHeight;
        if (b == 0 && $(window).scrollTop() > oTop) {
        
            var progressBar = $(".fill-box");
            //$(".fill").css("width", 20 + '%');
            var time = 2000;
            $( ".fill" ).each(function( index ) {
                var per = $(this).data("count");
                $(this).css("width", per + '%');
            });
            b = 1;
        }
    }
});




///////// Text Typewritter /////////
function write (obj, sentence, i, cb) {
    if (i != sentence.length) {
        setTimeout(function () {
            i++
            //console.log('in timeout', i)
            obj.innerHTML = sentence.substr(0, i+1) +' <em aria-hidden="true"></em>';
            write(obj, sentence, i, cb)
        }, 80)
    } else {
        //console.log(i)
        cb()
    }
}
function erase (obj, cb,i) {
    var sentence = obj.innerText
    if (sentence.length != 0) {
        setTimeout(function () {
            sentence = sentence.substr(0,sentence.length-1)
            //console.log('in timeout', i)
            obj.innerText = sentence
            erase(obj, cb)
        }, 80)
    } else {
        obj.innerText = " "
        cb()
    }
}
var typeline = document.querySelector("#typeline")

function writeerase(obj, sentence, time, cb) {
    write(obj, sentence, 0, function () {
        setTimeout(function () {
            erase(obj, cb) 
        }, time) 
    })
}

var sentences = [
    "a Developer. ",
    "a Web Designer. ",
    "an Engineer. ",
]
                    
var counter = 0
function loop () {
    var sentence = sentences[counter % sentences.length]
    writeerase(typeline, sentence, 2000, loop)
    counter++
}
loop();


///////// For modal window /////////
$('#myModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var src = button.data('src')
    var heading = button.data('heading')
    var sr = button.data('sr')
    var desc = $('.long-desc'+sr).html();
  
    var modal = $(this);
    modal.find('.modal-body .modal-img').attr("src", src);
    modal.find('.modal-body .modal-heading').text(heading);
    modal.find('.modal-body .modal-desc').html(desc);

});

///////// Ajax for Save Contact Form data /////////
$('#contactForm').on("submit", function(event){  
    event.preventDefault();  
    if(confirm("Are you sure you want to send this?"))
    {
        $.ajax({  
            url:"http://localhost:8080/test/save.php",  
            method:"POST",  
            data:$('#contactForm').serialize(),  
            beforeSend:function(){  
                $('#submit').text("Sending");  
            },  
            success:function(data){  
                $('#insert_form_new')[0].reset();  
                alert('Successfull');
                $('#submit').text("Submit"); 
                //window.location.reload();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                $('#submit').text("Submit"); 
                $('#alertmessage').text("Failed!!! Please try again..."); 
                //alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            } 
        }); 
    }
});


window.scrollTo(0,1);