console.debug("Loading CoyoteUI Blueprints...");
var coyoteUI = (function() {
	this.fAddTabs = function(maps) {
		var ni = document.getElementById('main');
		var divIdName = 'tabs';
		var newdiv = '';
		var tmp = '<ul>';
		var contadorTabs = 1;
		for (i = 0; i < maps.length; i++) {
			tmp = tmp + '<li><a href="#tabs-' + contadorTabs + '">' + maps[i].name + '</a></li>';
			contadorTabs = contadorTabs + 1;
		}
		newdiv = newdiv + tmp;		
		newdiv = newdiv + '</ul><div class="tabs-spacer"></div>';
		tmp = '';
		var contadorTabs = 1;
		for (var i in maps) {
			tmp = tmp + '<div id="tabs-' + contadorTabs + '"><div class="hasmenu" id="includedContent' + contadorTabs + '"></div></div>';
			contadorTabs = contadorTabs + 1;
		}		
		newdiv = newdiv + tmp;
		var element = document.createElement('div');
		element.setAttribute('id',divIdName);
		element.className = "tabs-bottom";
		element.innerHTML = newdiv;
		document.body.appendChild(element);		
		$( "#tabs" ).tabs();
		$( ".tabs-bottom .ui-tabs-nav, .tabs-bottom .ui-tabs-nav > *" )
		  .removeClass( "ui-corner-all ui-corner-top" )
		  .addClass( "ui-corner-bottom" );
		$( ".tabs-bottom .ui-tabs-nav" ).appendTo( ".tabs-bottom" );		
		var contadorTabs = 1;
		for (var i in maps) {
			var toLoad = '#includedContent' + contadorTabs + '';
			$(toLoad).load(maps[i].file);
			contadorTabs = contadorTabs + 1;		
		}
		
		$('#main').dblclick(function(event, ui) {
			coyote.checkS(event, 1);
		});
		$('#main').contextmenu({
			delegate: ".hasmenu",
			preventContextMenuForPopup: true,
			preventSelect: true,
			taphold: true,
			menu: [
				{title: "Set Player", cmd: "setPlayer", uiIcon: "ui-icon-note"},
			],					
			select: function(event, ui) {
				var $target = ui.target;
				switch(ui.cmd){
				case "setPlayer":
					coyote.checkS(event, 1);
					break;
				default:
					//alert("select " + ui.cmd + " on " + $target.text());
				}
			},
			beforeOpen: function(event, ui) {
			},
			close: function(event, ui) {
			}
		});
	}
	//**************************************************************************************
	// Variables, objetos y funciones "públicas"
	return {
		addTabs : fAddTabs
	}
})();
console.debug("Loaded CoyoteUI Blueprints...");
