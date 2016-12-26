# summernote-equation-plugin

Allows to include equations into the editable content see [example](example.html) or try it online [summernote-equation-pligin](https://nebesa.me/public/modules/students/summernote-plugin/example.html)

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
 <link href="dist/main.css" rel="stylesheet">
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
4) Remember to include  css and js libraries (jQuery, Bootstrap, Summernote) <br>
5) You can see it [here](https://nebesa.me/public/modules/students/summernote-plugin/example2.html)

P.S: This plug-in works but it have some problems. (stable in Mozilla in Crome some functions dose not work, need to rewrite it) If you want to use it in professional projects, you must improve it. Please write me if you want to make stable version.
