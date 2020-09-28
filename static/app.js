const vid = document.getElementById('vid')

Promise.all([

]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => vid.srcObject = stream,
    err => console.error(err)
  )
}

capture_btn = document.querySelector("#capture_button");

capture_btn.onclick = function() {
   console.log("Image capture button pressed")
    document.getElementById("capture_button").disable = true;
    const canvas = document.getElementById('canvas2')
    canvas.width = 480;
    canvas.height = 580;
    document.getElementById("content").innerHTML = "Smile little bit while we capture your face";
    
    var img_array = []
    function image_capture(i){
        setTimeout(function() { 
            console.log(i)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            canvas.getContext('2d').drawImage(vid, 0, 0, canvas.width, canvas.height);
            image_cap = canvas.toDataURL('image/jpeg', 1.0);
            img_array.push(image_cap)
            if(i==14){
                ajax_post()
            }
            
      }, 600 * i);
             
    }
    
    for ( i = 0; i < 15; i++){
        image_capture(i)
    }

    console.log("World!");

    function ajax_post(){
        console.log(img_array)
        $.ajax({
               type: "POST",
               async: true,
               url: 'https://172.23.118.12:9999/image',
               data: JSON.stringify({"image_arr": img_array}) ,
               contentType: "application/json;charset=utf-8",
               processData: false,
               mimeType:"multipart/form-data",
               success: function(response)
               {
                    if(response === "empty"){
                       document.getElementById("content").innerHTML = "Please stand still while we are capturing your face";
                    }
                    else{
                        document.getElementById("content").innerHTML = JSON.parse(response).liveness_flag
                        document.getElementById("img").src = JSON.parse(response).image
                        document.getElementById("img").style.display = 'block'
                    }
                    console.log("IMAGE POST SUCCESSFULL!!!")
               }
         });
    }
}
