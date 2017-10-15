<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Marie Claire Jewelry | Contact</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <meta name="fragment" content="!">
        
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.min.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>

    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        <div id="wrap"> <!-- width: 960px  -->
<!-- 
=================
    Header
=================
-->
            <div id="header">
                <div id="searchBar">
                    <form>
                        <input type="text" name="filter" placeholder="Search products" class="searchForm"></input>
                    </form>
                </div>
                <a href="index.html"><img src="img/marieClaireLogo.png" alt="Marie Claire Jewelry" class="centered" /></a>

                <ul>
                    <li><a href="index.html">HOME</a></li>
                    <li><a href="about.html">ABOUT</a></li>
                    <li><a href="#">COLLECTIONS</a>
                        <ul>
                            <li><a href="classique.html">CLASSIQUE</a></li>
                            <li><a href="chic.html">CHIC</a></li>
                        </ul>
                    </li>
                    <li><a href="press.html">IN THE PRESS</a></li>
                    <li><a href="lookbook.html">VIEW LOOK BOOK</a></li>
                    <li><a href="contact.php">CONTACT</a></li>
                </ul>
            </div>
<!-- 
=================
    Content
=================
-->
            <div id="content">
                <img src="img/contactImgStrip.png" />
                <br/><br/><br/><br/>

                <span style="position:absolute; top:58%; left:10em;"> <img src="img/contactUs.png" /> </span>
                
                <div id="formContainer">
                    <form id="contactForm" action="verify.php" method="post">
                        <label for="name">Name:</label> <input id="name" type="text" name="name" required></input> <br /><br />
                        <label for="email">Email:</label> <input id="email" type="email" name="email" required></input> <br />
                        <br/>
                        <label for="subject">Subject</label> <input id="subject" type="text" wrap="physical" name="subject"></input>
                        <br/><br/>
                        <textarea name="message"></textarea>
            
                        <div id="recaptcha" style="position:absolute; bottom:8px; left:-325px; display:none;">
                        <?php
                            require_once('recaptchalib.php');
                            $publickey = "6LcuEtsSAAAAADkZSjGa7o8wGQBQyGGS0c1sCl57";
                            echo recaptcha_get_html($publickey);
                        ?>
                        </div>
                        <input type="reset" value"Reset"></input><input type="submit" value="Submit"></input>
                        <br/><br/>
                    </form>
                </div>
                
            </div>
<!-- 
=================
    Footer
=================
-->            
            <div id="footer">
                <table>
                    <tr><td><a href="index.html">HOME</a></td><td><a href="classique.html">CLASSIQUE</a></td><td><a href="lookbook.html">VIEW LOOK BOOK</a></td><!-- <td><a href="press.html">IN THE PRESS</a></td> --></tr>
                    <tr><td><a href="about.html">ABOUT</a></td><td><a href="chic.html">CHIC</a></td><td><a href="contact.php">CONTACT</a></td></tr>
                </table>
                <span class="socialIcons"><a href="http://www.facebook.com/MarieClaire" target="new"><img src="img/facebookSoc.png"/></a><a href="https://twitter.com/marieclaire" target="new"><img src="img/twitterSoc.png"/></a><a href="http://pinterest.com/source/marieclaire.com/" target="new"><img src="img/pinterestSoc.png"/></a></span>

                <div class="copyright"></div>
            </div>
        </div>
  
        <span id="browserPrompt"></span>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.3.min.js"><\/script>')</script>
        <script src="js/plugins.js"></script>
        <script src="js/vendor/underscore-min.js"></script>
        <script src="js/vendor/backbone-min.js"></script>
        <script src="js/vendor/jquery.zoom.js"></script>
        <script src="js/vendor/jquery.backgroundSize.js"></script>
        <script src="js/productList.js"></script>
        <script src="js/app.min.js"></script>
        <script src="js/main.min.js"></script>

        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-38464588-1', 'marieclairejewelry.com');
          ga('send', 'pageview');

        </script>
    </body>
</html>
