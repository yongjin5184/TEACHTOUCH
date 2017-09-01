function handleFileSelect(evt) {
    var f = evt.target.files[0]; // FileList object

    // Loop through the FileList and render image files as thumbnails.
   
      // Only process image files.
      if (!f.type.match('image.*')) {
        return;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }


  document.getElementById('files').addEventListener('change', handleFileSelect, false);
  