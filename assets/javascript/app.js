// create globals
giphy = new Array();//array of active gif urls
still = new Array();//array or gif stills
var topics = ['lego', 'happy', 'funny', 'silly', 'dorky'];//start up list
var gif;
limit = 10;//amount of gifs. may change to user choice
// This function handles events when gif button is clicked



$(document).on("click", "img", function () {
    //TODO: determine what image is on the div. Switch back n forth between active gif and still
    let i = $(this).attr("value")
    if ($(this).attr("src") != giphy[i]) {
        $(this).attr("src", giphy[i])
    }
    else {
        $(this).attr("src", still[i])
    }
});
///////////////////////////////////////////////



//TODO: GIFBTN selections to populate gifs
$(document).on("click", ".gif-btn", function () {
    //RE-Search the gif with button name
    gif = $(this).attr("data-name");
    getGif(gif)

});
////////////////////////////////////////////////////
//TODO: on click of Submit button on form
$("#add-gif").on("click", function (event) {
    //TODO: Prevent auto load of form
    event.preventDefault();

    //TODO: Assign user input to 'gif' variable
    gif = $("#gif-input").val().trim();

    //TODO: If user input is empty or 0, alert user to enter correct items to review.
    if (gif === '' || gif == 0) { //<<==== need to revise. can inject code into the site.
        alert("Need to enter something so we can help find it.");

    }
    //TODO: push gif into gifList and pass gif to getGif function
    else {
        topics.unshift(gif);
        $("#gif-input").val('');

        getGif(gif);
        gifHistory();


    }
});
///////////////////////////////////////////

//TODO:Pass userGif to API request 5x <<==will need to modify later to 9 or 10
function getGif(userGif) {
    var key = config.one;
    //Create variable for section where images will be displayed. will be used for append
    var sectionGif = $('#gif');
    //Empty section to prevent duplicates
    sectionGif.empty();
    //Set to URL for AJAX
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userGif + "&rating=g&api_key="+ key +"&limit=" + limit + "";//<<Need to config the key and set it to secret

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {

        console.log(response);

        //Creat image divs for the gifs and populate empty GIPHY and STILL arrays
        for (let i = 0; i < limit; i++) {//modify count with new api url limit parameter

            giphy[i] = response.data[i].images.fixed_width.url
            still[i] = response.data[i].images.fixed_width_still.url


            var gifRating = response.data[i].rating;
            var gifDiv = $('<div/>', { class: 'gif-holder' });
            var gifURL = response.data[i].images.fixed_width_still.url;
            var image = $('<img>').attr({ 'src': gifURL, 'value': i, 'title':'Click ME!! '+ response.data[i].title.toString()});
            //var image2 = $('<img>').attr({ 'src': 'assets/images/download.png', 'class':'down-load', 'tittle':'Get the GIF!', 'data-name': response.data[i].images.originl_mp4.mp4});
            var ratingPara = $('<p/>', { calss: 'rating' }).text('GIF Rated: ' + gifRating.toString().toUpperCase());
            var titlePara = $('<p/>', { calss: 'title' }).text(response.data[i].title.toString().toUpperCase());

            gifDiv.append(image, titlePara, ratingPara)//, image2);
            sectionGif.append(gifDiv);

        }
    });
}
///////////////////////////////////////////
function gifHistory() {
    var gifHist = $('.history-btn')
    gifHist.empty()
    for (let i = 0; i < topics.length; i++) {
        var btn = $("<button/>", { class: 'gif-btn' });
        btn.attr("data-name", topics[i]);
        btn.text(topics[i].toLocaleLowerCase());
        gifHist.append(btn)
    };
}
///////////////////////////////////////////
gifHistory()

$('.fa-bars').on('click', function () {

    $(".history-btn").slideToggle("slow")
})
////////////////


    $(window).resize(function () {
        if ($(window).width() >= 900) {
            $(".history-btn").show();
        }
        else {
            $(".history-btn").hide();
        }
    });

    
