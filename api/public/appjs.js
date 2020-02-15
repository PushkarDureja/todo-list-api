$.get("https://abc-gqpmg.run.goorm.io/api").done(function(data){
	add(data);
}).fail(function(err){
	console.log(err);
})
$("input").keypress(function(event){
	if(event.which === 13){
		$.post("https://abc-gqpmg.run.goorm.io/api", {
			name:$("input").val()
		}
		).done(function(result){
			
			var newtodo = $("<li>" + result.name +  "<span class = 'float-right'> X </span>" + "</li>");
			newtodo.data("id",result._id);
			newtodo.data("completed",result.completed);
			$("ul").append(newtodo);
			$("input").val(" ")
		}).fail(function(err){
			console.log(err);
		})
	}
	
})
$("ul").on("click","span",function(event){
	event.stopPropagation();
	var abc = $(this).parent().data("id");
	
	$.ajax({
		method:"delete",
		url:"/api/" + abc})
	.done(function(){
		
	})
	.fail(function(err){
		console.log(err);
	})
	$(this).parent().remove();
	
	
})
$("ul").on("click","li",function(event){
	var url = "/api/" + $(this).data("id");
	var abc = $(this).data("completed");
	$.ajax({
		method:"put",
		url:url,
		data:{completed:!abc}
	}).done(function(){
		console.log("done");
	}).catch(function(err){
		console.log("not done")
	})
	$(this).toggleClass("line")
})

function add (newItem){
		newItem.forEach(function(res){
		var newtodo = $("<li>"+res.name+ "<span class = 'float-right'> X </span>"+"</li>");
		newtodo.data("id",res._id);
		newtodo.data("completed",res.completed);
		if(res.completed)
			newtodo.addClass("line");	
	
		$("ul").append(newtodo);
	})
}