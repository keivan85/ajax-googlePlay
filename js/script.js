  


 $.ajax({
               url: 'https://play.google.com/store/apps/details?id=com.skgames.trafficracer',
               success: function(data) {
               	
                  $(".screenshot", data).each(function() {

                   		var screenshots = [];
                   		var shots = "http:"+$(this).attr("src");
                   		screenshots.push(shots);
                   		var imageList ='';
                   		screenshots.forEach(function(imgSrc) {
                   			imageList = imageList + '<img src=' + imgSrc + '>';
                   		});

                   		$('#div1').append(imageList);
                   		
                   		
                   });

                    $('img[alt="Cover art"]', data).each(function() {

                   		var icon = "http:"+$(this).attr("src");
                   		iconUrl = '<img src=' + icon + '>';
                   		$('#div2').append(iconUrl);
                   		
                   		
                   });
              		
               }
            }); 

