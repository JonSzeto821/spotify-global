var audioObject=new Audio;let play=!1,playingSong=null;var geocoder,map,marker;$("body").on("click",".album",function(e){if(!play&&(audioObject.pause(),playingSong==$(this).data("album-id")))return;playingSong=$(this).data("album-id");let t=$(this).data("album-id"),a=$(this).data("artist-name"),o=($(this).data(""),this),r={album:t,artist:a};$.post("/tracks",r,(e,t,a)=>{for(let t=0;t<e.data.length;t++)if(null!==e.data[t].preview_url)return audioObject.pause(),void(audioObject=new Audio(e.data[t].preview_url)).play();play=!1,$(o).find("button").remove(),window.t=o})}),$(".results").on("click",".js-play-toggle",()=>{play=!play}),$(()=>{const e=[];$("form").submit(t=>{t.preventDefault(),codeAddress();const a=$(".searchBox").val().toUpperCase();let o=$(".searchBox").val().toLowerCase(),r="",n="";$(".searchBox").val(""),n+=`<h2>Top Artists for <span class="capitalize">${o}</span></h2>`,$("#countryRender").html(n),e.push(a);for(let t=0;t<e.length;t++)r+=`<div class="js-recentCountry recentCountry">${e[t]}</div>`;$("#previouslySearched").html(r)}),$("#previouslySearched").on("click",".js-recentCountry",function(){codeAddress($(this).text()).toUpperCase()})}),$(document).ready(function(){$(".results").on("click",".button",function(){$(this).toggleClass("paused")})});var codeAddress=(e="Spain")=>{geocoder=new google.maps.Geocoder;let t=document.getElementById("city_country").value||e;geocoder.geocode({address:t},(e,t)=>{t==google.maps.GeocoderStatus.OK?((map=new google.maps.Map(document.getElementById("mapCanvas"),{zoom:6,streetViewControl:!1,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.HORIZONTAL_BAR,mapTypeIds:[google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.ROADMAP]},center:e[0].geometry.location,mapTypeId:google.maps.MapTypeId.ROADMAP})).setCenter(e[0].geometry.location),marker=new google.maps.Marker({map:map,position:e[0].geometry.location,draggable:!0,title:"My Title"}),updateMarkerPosition(e[0].geometry.location),geocodePosition(e[0].geometry.location),google.maps.event.addListener(marker,"dragstart",()=>{updateMarkerAddress("Dragging...")}),google.maps.event.addListener(marker,"drag",()=>{updateMarkerStatus("Dragging..."),updateMarkerPosition(marker.getPosition())}),google.maps.event.addListener(marker,"dragend",()=>{updateMarkerStatus("Drag ended"),geocodePosition(marker.getPosition()),map.panTo(marker.getPosition())}),google.maps.event.addListener(map,"click",e=>{$("form").submit(),updateMarkerPosition(e.latLng),marker.setPosition(e.latLng),geocodePosition(marker.getPosition()),map.panTo(marker.getPosition())})):alert("Geocode was not successful for the following reason: "+t)})};function geocodePosition(e){geocoder.geocode({latLng:e},e=>{if(e&&e.length>0)for(let t=0;t<e[0].address_components.length;t+=1){let a=e[0].address_components[t];for(let e=0;e<a.types.length;e+=1)"country"===a.types[e]&&updateMarkerAddress(a.short_name)}else updateMarkerAddress("Cannot determine address at this location.")})}function updateMarkerStatus(e){document.getElementById("markerStatus").innerHTML=e}function updateMarkerPosition(e){document.getElementById("info").innerHTML=[e.lat(),e.lng()].join(", ")}function updateMarkerAddress(e){$.post("/location",{countryCode:e},t=>{document.getElementById("address").innerHTML=e,loopThroughPlaylist(t.featurePlaylist.albums.items)})}function loopThroughPlaylist(e){let t="";for(let a=0;a<e.length;a++)t+=`<div class="song-detail">\n        <img src="${e[a].images[0].url}" alt="Album Artwork" class="albumArt"></img><br>\n        <span class="bold">Artist:</span> ${e[a].artists[0].name}<br>\n        <span class="bold">Top Album:</span> ${e[a].name} <br>\n        <div data-artist-name='${e[a].artists[0].name}' data-album-id='${e[a].id}' class='album js-play-toggle'><button class="play-toggle button"></button></div>\n      </div>`;$(".results").html(t)}