
	window.onload = function setDataSource() {
		if (!!window.EventSource) {
			var source = new EventSource("./OfficeWidgets.php");

			source.addEventListener("message", function(e) {
				updateWidgets(e.data);
				setMood(e.data);
			}, false);
			
			source.addEventListener("open", function(e) {}, false);

			source.addEventListener("error", function(e) {
				if (e.readyState == EventSource.CLOSED) {}}, false);
		} else {
			document.getElementById("notSupported").style.display = "block";
		}
	}


	function updateWidgets(data) {
		var ar = data.split(":");
		var widget = ar[0];
		var content = ar[1];

		var contentWidget = document.getElementById("w_" + widget).getElementsByClassName("content")[0];
		var oldContent = contentWidget.innerHTML;
		contentWidget.innerHTML = content;
		if (parseFloat(oldContent) < parseFloat(content)) {
			contentWidget.style.backgroundColor = "mediumaquamarine";
		} else {
			contentWidget.style.backgroundColor = "orangered";
		}
		window.setTimeout(function clearBackground() {
			contentWidget.style.backgroundColor = "white";
		}, 500);
	}


	function setMood(data) {
		var ar = data.split(":");
		var widget = ar[0];
		var content = ar[1];

		var titleWidgetFridge = document.getElementById("w_fridge").getElementsByClassName("title")[0];
		var contentWidgetFridge = document.getElementById("w_fridge").getElementsByClassName("content")[0];
		var valueFridge = parseFloat(contentWidgetFridge.innerHTML);
		if(valueFridge==0){
			titleWidgetFridge.style.background="orangered";
		}else{
			titleWidgetFridge.style.background="gold";
		}

		var titleWidgetCoffee = document.getElementById("w_coffee").getElementsByClassName("title")[0];
		var contentWidgetCoffee = document.getElementById("w_coffee").getElementsByClassName("content")[0];
		var valueCoffee = parseFloat(contentWidgetCoffee.innerHTML);
		if(valueCoffee<=5){
			titleWidgetCoffee.style.background="orangered";
		}else{
			titleWidgetCoffee.style.background="gold";
		}

		var titleWidgetTemp = document.getElementById("w_temp").getElementsByClassName("title")[0];
		var contentWidgetTemp = document.getElementById("w_temp").getElementsByClassName("content")[0];
		var valueTemp = parseFloat(contentWidgetTemp.innerHTML);
		if(valueTemp<=15){
			titleWidgetTemp.style.background="orangered";
		}else{
			titleWidgetTemp.style.background="gold";
		}

		var titleWidgetMood = document.getElementById("w_mood").getElementsByClassName("title")[0];
		var contentWidgetMood = document.getElementById("w_mood").getElementsByClassName("content")[0];
		//If there isn't anything on the fridge and the weather is lower than 15
		if (valueFridge == 0  || valueTemp<=15) {
			titleWidgetMood.style.backgroundColor = "orangered";
			contentWidgetMood.innerHTML = "Not happy";
		} 
		else if ((valueFridge == 0 && valueCoffee<= 5 && valueTemp>15) 
			  || (valueFridge == 0 && valueCoffee > 5 && valueTemp<=15)
			  || (valueFridge == 1 && valueCoffee<= 5 && valueTemp<=15)){
			titleWidgetMood.style.backgroundColor = "gray";
			contentWidgetMood.innerHTML = "Ok";

		}
		else
		{
			titleWidgetMood.style.backgroundColor = "gold";
			contentWidgetMood.innerHTML = "Happy";
		}
		
	}



function Widget(type, title, content, imageUrl)
{
	this.type = type;
	this.title = title;
	this.content = content;
	this.imageUrl = imageUrl;
}










