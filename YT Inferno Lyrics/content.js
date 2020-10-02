var lyricsBox;
var lyricsHeader;
var lyricsText;

function removeFt(input){
  var parameter_Start_index= input.indexOf('ft');     // remove everything after  "ft"
  output = input.substring(0, parameter_Start_index);

  return output;
}

function removeFeat(input){
  var parameter_Start_index= input.indexOf('feat');     // remove everything after  "ft"
  output = input.substring(0, parameter_Start_index);

  return output;
}





chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // listen for messages sent from background.js


    //  console.log("CONTROL MSG CONSOLE LOG");   // Debug console message

      if (lyricsHeader) {
        lyricsBox.removeChild(lyricsBox.childNodes[0])
      }

      if (lyricsText) {
        lyricsBox.removeChild(lyricsBox.childNodes[0])
      }

      setTimeout(mainFunc, 3000);

      function mainFunc() {
        
      lyricsBox = document.getElementById("secondary-inner");

      var title = document.getElementsByTagName("title");   // Tab name

      var titolo = title[0].text.replace(" - YouTube", "");  // Remove   "- YouTube "  from  title
    //  console.log("Title without - youtube: " + titolo);   // Debug console message
    
      var titolo = titolo.replace(/ *\(.*?\)\s*/g, '');   // Remove  () and content inside
      var titolo = titolo.replace(/ *\[[^\]]*]/g, '');
    //  console.log("Title without () and content: " + titolo);   // Debug console message
    
    
      if (titolo.includes("ft"))  titolo = removeFt(titolo);
      
    
      if (titolo.includes("feat"))  titolo = removeFeat(titolo);
    
    
      var titoloNew = titolo.split(" - ");
    //  console.log("TitoloNew :" + titoloNew);   // Debug console message
    
    
    
      var artist = titoloNew[0];

      if (artist.includes("&")) {
        var parameter_Start_index= titolo.indexOf('&');     // remove everything after  "ft"
            artist = artist.substring(0, parameter_Start_index);
          //  console.log("Title without & and after" + titolo);    // Debug console message
        
      }
    //  console.log("Artist: " + artist);   // Debug console message
    
      artist = artist.split(",", 1);
    //  console.log("Artist AFTER split: " + artist);   // Debug console message
    
      var song = titoloNew[1]; 
    //  console.log("Song name: " + song);   // Debug console message
    
    //  console.log(artist + " " + song);   // Debug console message
    
    
      
    
      console.log("Lyrics search link : " + "https://api.lyrics.ovh/v1/"+ artist + "/" + song);   // Debug console message
      fetch("https://api.lyrics.ovh/v1/"+ artist + "/" + song)
           .then(response => response.json())
            .then(data => {    
              
      //        console.log(data.lyrics);   // Debug console message

              if (data.lyrics == "" || data.lyrics == " ") {
                console.log("NO LYRICS AVAIBLE")
              }else{

                lyricsHeader = document.createElement('div');   // Lyrics header div for title
                lyricsHeader.setAttribute("id","lyricsHeader"); // ID of the div
  
                lyricsHeader.innerHTML = titolo;   // Title set inside header
                
                lyricsText = document.createElement('div');   // Lyrics text div 
                lyricsText.setAttribute("id", "lyricsText");  // ID of the div
  
  
                lyricsBox.prepend(lyricsText); // Rendering the Lyrics text div 
                
                lyricsBox.prepend(lyricsHeader);  // Rendering the Lyrics Header div
  

                lyricsText.innerHTML = data.lyrics.replace(/\n/g, "<br />");   // Replace every   "\n"  to  <br/>  inside the lyrics

                  
              }
            });
    

      }

    
});

  
