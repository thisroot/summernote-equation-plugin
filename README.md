# summernote-equation-plugin

Allows to include equations into the editable content see [example](example.html)

Installation:
-------------

  1) This plugin uses [MathJax](https://www.mathjax.org/) library. Install and configure it (sample works, but you may optimize parametres)
``` js
<link href="dist/main.css" rel="stylesheet">

<script type="text/javascript" async src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML"></script>
<script type="text/x-mathjax-config">
        MathJax.Hub.Config({
          extensions: ["tex2jax.js"],
          jax: ["input/TeX", "output/HTML-CSS"],
          tex2jax: {
              inlineMath: [["$", "$"], ["\\(", "\\)"]]
              },
          "HTML-CSS": {
              linebreaks: { automatic: true }
              }
        });
  </script>
 ```
 2) Insert HTML
 ```html
 <div class="container">
    <button id="run">edit</button>	
    <div id='text'></div>
 </div>
  ```
 3) Initialize summernote with params
 ``` js
 <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
 <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.1/summernote.css" rel="stylesheet">
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js"></script>
 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.1/summernote.min.js"></script>
 <script src="summernote-ext-equation.js"></script>
 <script>
	$(document).ready(function() {
		$('#run').on('click', function() {              
			$('#texto').summernote({ 
		      		toolbar: [
			  		['insert', ['equation']]
		       		],});
		 });
	});
	</script>
  ```

