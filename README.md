
![screenshot](https://github.com/stannesi/astro-panic/blob/master/Screen-Shot-d1.png) 

v1.0 profile/public widget for sharetronix microsocial platform
licensed under the MIT license.

Author:  Stan nesi (stannesi@yahoo.com)
Website: http://twitter.com/stannesi,
         http://facebook.com/stannesi

# for professional use only (javascript)
To configure this widget to work on your sharetronix microsocial website, you have to unzip the file: shr-ypshr-widget.zip

Inside it contains a folder call <widghets> and an HTML file calle <widget-test.html> and this README.txt file

place the unzipped files on your domain host -> e.g. www.domain.com/widgets/

# Configuring the JavaScript File
The open the <widget> folder and locate sub-folder called <js> where all then	javascript (.js) source code is located.

Open the js file: <ypshr-shrtx-pp-widget-1.0.js> with your text editor...so you know i used #Dreamweaver to develop this widget...but any cool widget will do.. but its preferable to use a text-editor that has line-code numberings... so you can easily jump to any line code number..

With your text-editor jump to line #228 where you have a comment ***** EDITABBLE AREA *****

edit then following strings to suit your need.

# SETTING THE DOMAIN HOST 
insert your domain host name here withotut the "http://" and with out and ending slash "/"
yooksv.link.domain = "domain.com";

e.g. if your domain is http://mysocial.com
yooksv.link.domain = mysocial.com";

NOTE: make sure your widgets are directly in the folder you specific for example if this widget is located in < http://mysocial.com/social/widgets"

yooksv.link.domain = mysocial.com/Social";

**************************************************************

# SETTING THE WIDGET LOCATION 
Insert the location director of where you unzipped your widget
the full url link of the widget is required... including the "http//"
e.g.
yooksv.link.widget = "http://mysocial.com/social";
			OR
yooksv.link.widget = http + "mysocial.com/social";

**************************************************************

# FOR YOUR USERS 
All they have to do is embed a little javascript code that links to the widget .js source and a little widget code containing the settings, features and themes for their widget and place it on any of their site and viola!!

a link to the widget engine javascript file called: "ypshr-shrtx-pp-widget-1.0.js"
e.g.
<script src="http://mysocial/com/widgets/js/ypshr-shrtx-pp-widget-1.0.js" type="text/javascript"></script>
and insert the widget code

<script>
    new YPSHR.Widget({
	version: 1,
	type: 'public',				<-- type of widget 'public'or 'profile'
	title: 'stannesi is testing...',	<-- title header
	subject: 'Sharetronix Public',		<-- subject header
	rpp: 20,				<-- 20 posts per call
	interval: 1000,				<-- time interval in miliseconds
	width: 250,				<-- width of widget on page
	height: 350,				<-- height of widget on page

       features: {
	scrollbar: false,			<-- enable scrollbar (true/false)
	fullscreen: false,			<-- enbale fullscreen (true/false)
	loop: true,				<-- loop posts
	live: true,
	hashtags: true,				<-- hastags
	timestamp: true,			<-- show timestamps
	avatars: true,				<-- show users avatars
	dateformat: 'absolute',			<-- date & time format (absolure/relative)
	behavior: 'preloaded',			<-- behavior (default/all/preloaded)
       }
     }).render().start();			<-- render().start() must be inserted
						for profile widget .setUser('username') must be used before 						the start
						e.g. render().setUser('username').start()
</script>

See HTML file: <widget-test.html> for reference.


*******************************************************


I hope you hav fun using my widget.
fell free to send following me on twitter - (@Stannesi), add me on facebook and send me mails if you have any questions and wanna contribute to this project or any future projects....

Thank you. God bless you!!

Twitter    -	http://twitter.com/stannesi
Facebook   - 	http://facebook.com/stannesi
blog       - 	http://stannesi.blogspot.com
