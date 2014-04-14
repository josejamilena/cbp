Plantilla de página:

		/* PLANTILLA
		<div id="tabs" class="tabs-bottom">
			<ul>
				<li><a href="#tabs-1">P. 1</a></li>
				<li><a href="#tabs-2">P. 2</a></li>
				<li><a href="#tabs-3">P. 3</a></li>
			</ul>
			<div class="tabs-spacer"></div>
			<div id="tabs-1">
				<div class="hasmenu" id="includedContent1"></div>					
			</div>
			<div id="tabs-2">			
				<div class="hasmenu" id="includedContent2"></div>				
			</div>
			<div id="tabs-3">
				<div class="hasmenu" id="includedContent"></div>				
			</div>
		</div>
		*/




		/* PLANTILLA
		$(function() {
			$( "#tabs" ).tabs();
			// fix the classes
			$( ".tabs-bottom .ui-tabs-nav, .tabs-bottom .ui-tabs-nav > *" )
			  .removeClass( "ui-corner-all ui-corner-top" )
			  .addClass( "ui-corner-bottom" );
			// move the nav to the bottom
			$( ".tabs-bottom .ui-tabs-nav" ).appendTo( ".tabs-bottom" );
		});
		
		$(function(){
			$("#includedContent1").load("a.svg"); 
		});

		$(function(){
			$("#includedContent2").load("b.svg"); 
		});
		*/







-------------------------------------------------------------------------------------------------


Plantilla de menú contextual:

				/*{title: "Delete Player", cmd: "delPlayer", uiIcon: "ui-icon-trash"},
				{title: "----"},
				{title: "Get Info", cmd: "getInfo", uiIcon: "ui-icon-info"},*/
				/*{title: "Paste", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: true },
				{title: "----"},
				{title: "More", children: [
					{title: "Sub 1 (using callback)", action: function(event, ui) { alert("action callback sub1");} },
					{title: "Sub 2", cmd: "sub1"}
					]}*/				


-------------------------------------------------------------------------------------------------


























