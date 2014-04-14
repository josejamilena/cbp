//coyote.js
console.debug("Loading Coyote Blueprints...");
var coyote = (function() {
	this.CLIPBOARD = null,
	this.CLIPBOARD_ID = null,
	this.fInit = function() {
		$.ajax({
			url: "../backend/lib/coyoteService.php",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			data: "action=getMaps",
			/*dataType: "json",*/
			success: function (data) {
				coyote.CLIPBOARD = JSON.parse(data).CLIPBOARD;
				coyote.CLIPBOARD_ID = new Array();
				for (i = 0; i < coyote.CLIPBOARD.length; i++) {
					coyote.CLIPBOARD_ID[i] = new Array();
					var max = 0;
					for (j = 0; j < coyote.CLIPBOARD[i].points.length; j++) {
						if (coyote.CLIPBOARD[i].points[j].id > max) {
							max = coyote.CLIPBOARD[i].points[j].id;
						}
					}
					coyote.CLIPBOARD_ID[i] = max + 1;
				}
				coyoteUI.addTabs(JSON.parse(data).maps);
				fLoadSaved();
				return 1;
			},
			error: function (error) {
				console.error(JSON.stringify(error));
				return -1;
			}
		});
	},
	this.fGetID = function() {
		var activeTabIdx = $('#tabs').tabs('option','active');
		var res = 0;
		res = coyote.CLIPBOARD_ID[activeTabIdx]
		coyote.CLIPBOARD_ID[activeTabIdx] = coyote.CLIPBOARD_ID[activeTabIdx] + 1;
		return res;
	},
	this.fCheckS = function(e, action){
		if (action==1) {
			fAddElement(fGetPos(event.pageX), fGetPos(event.pageY));
		} else if ((action==0) || (action==2)) {
		} else {
			console.error("No na");
		}
	},
	this.fReplacePosition = function(id, x, y) {
		var activeTabIdx = $('#tabs').tabs('option','active');
		for (i = 0; i < coyote.CLIPBOARD[activeTabIdx].points.length; i++) {
			if(coyote.CLIPBOARD[activeTabIdx].points[i].id == id) {
				coyote.CLIPBOARD[activeTabIdx].points[i].posX = x;
				coyote.CLIPBOARD[activeTabIdx].points[i].posY = y;
				break;
			}
		}
	},
	this.fReplacePositionByName = function(name, x, y) {
		var id = name.replace("theImg","");
		fReplacePosition(id, x, y);
	},	
	this.fRepaintAllIcons = function() {
		for (i = 0; i < coyote.CLIPBOARD.length; i++) {
			for (j = 0; j < coyote.CLIPBOARD[i].points.length; j++) {
				fPaintElement(coyote.CLIPBOARD[i].points[j].posX, coyote.CLIPBOARD[i].points[j].posY, coyote.CLIPBOARD[i].points[j].id);
			}
		}
	},
	this.fRemoveAllIcons = function() {
		for (i = 0; i < coyote.CLIPBOARD.length; i++) {
			for (j = 0; j < coyote.CLIPBOARD[i].points.length; j++) {				
				fRemoveElement(coyote.CLIPBOARD[i].points[j].id);
			}
		}
	},		
	this.fAddElement = function(x, y) {
		var activeTabIdx = $('#tabs').tabs('option','active');
		var i = coyote.CLIPBOARD[activeTabIdx].points.length;
		var io = new Object();
		io.posX = x;
		io.posY = y;
		io.id = fGetID();
		coyote.CLIPBOARD[activeTabIdx].points[i]= io;
		fPaintElement(x, y, io.id);
	},			
	this.fPaintElement = function(x, y, id) {
		var activeTabIdx = $('#tabs').tabs('option','active');
		var selector = '#tabs [id=tabs-' + (activeTabIdx + 1) + ']';
		$(selector).prepend('<img id="theImg' + id +'" src="lib/images/icon-player.png" style="position: absolute; left: ' + x + 'px; top: ' + y + 'px; "/>')
		$(selector + " #theImg" + id).mouseup(function(event) {
			switch (event.which) {
				case 1:
					//console.debug('IMG: Left Mouse button pressed.');
					fReplacePositionByName(this.id, fGetPos(event.pageX), fGetPos(event.pageY));
					break;
				case 2:
					//console.debug('IMG: Middle Mouse button pressed.');
					break;
				case 3:
					//console.debug('IMG: Right Mouse button pressed.');
					break;
				default:
					//alert('You have a strange Mouse!');
			}
		});
		$(selector + " #theImg" + id).contextmenu({
			/*delegate: ".hasmenu",*/
			preventContextMenuForPopup: true,
			preventSelect: true,
			taphold: true,
			menu: [				
				{title: "Delete Player", cmd: "delPlayer", uiIcon: "ui-icon-trash"},
				{title: "----"},
				{title: "Get Info", cmd: "getInfo", uiIcon: "ui-icon-info"},
			],					
			select: function(event, ui) {
                var $target;
                $target = ui.target;
				switch(ui.cmd){
				case "delPlayer":
					fRemoveElementByName(this.id);
					break;
				case "getInfo":
					fShowInfo(this.id);
					break;
				default:
					//alert("select " + ui.cmd + " on " + $target.text());
				}
			},
			blur: function(event, ui) {
			},
			unbind: function(event, ui) {
			},			
			beforeOpen: function(event, ui) {
			}
		});
		$(selector + " #theImg" + id).draggable();
	},
	this.fRemoveElement = function(id) {
		var activeTabIdx = $('#tabs').tabs('option','active');
		var selector = '#tabs [id=tabs-' + (activeTabIdx + 1) + ']';
		$(selector + " #theImg" + id ).remove();
		fRemoveById(coyote.CLIPBOARD[activeTabIdx].points, id);
	},
	this.fRemoveElementByName = function(name) {		
		var id = name.replace("theImg","");
		fRemoveElement(id);
	},	
	this.fShowInfo = function(id) {	
		$( "#dialog-message" ).show();
		$( "#dialog-message" ).dialog({
			modal: true,
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
				}
			}
		});
	},
	this.fRemoveById = function(arr, id) {
		for(var i=0; i<arr.length; i++) {
			if(arr[i].id == id) {
				arr.splice(i, 1);
				break;
			}
		}
	},
	this.fLoadSaved = function() {
		try {
			fRepaintAllIcons();
		} catch (ex) {
			;
		}	
	},
    this.fGetPos = function(x) {
        return x - 8;
    }
	//**************************************************************************************
	// Variables, objetos y funciones "públicas"
	return {
		checkS: fCheckS,
		init: fInit
	}
})();
coyote.init();
console.debug("Loaded Coyote Blueprints...");
//******************************************************************************************
